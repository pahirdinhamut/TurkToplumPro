import SQLite from "react-native-sqlite-storage";

class DatabaseManager {
  static instance = null;
  db = null;
  #KeyValTable = "KeyValtable"; // like aysnc storage get item provide key set item provide key and val
  #HistoryTable = "HistoryTable"; // for search history,likes,settings ,"select * from table where type="searh history""
  #LocationTable = "LocationTable";
  #LikeTable = "LikeTable";
  #CacheTable = "CacheTable";
  #ChatRoomTable = "ChatRoomTable"; // holder (post nk, and chatroom id) determines if this is firstmessage or not
  #MaxCacheSize = 500;
  #CurrentCacheSize = 0;
  #emptyTableSize = 0;

  constructor() {
    SQLite.enablePromise(true);
    this.createTable();
  }

  static getInstance() {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  async openDatabase() {
    /**
     * SQLite.openDatabase({name : "testDB", createFromLocation : 1}, okCallback,errorCallback);
     */
    return new Promise((resolve, reject) => {
      if (this.db) {
        resolve(this.db);
        //console.log("database already opened");
      } else {
        SQLite.openDatabase(
          {
            name: "turktoplum.db",
            location: "default"
          },
          (db) => {
            this.db = db;
            //console.log("database now opened");
            resolve(this.db);
          },
          (error) => {
            console.log("database rejected", error);
            reject(error);
          }
        );
      }
    });
  }

  createTable = async () => {
    try {
      await this.openDatabase();
      await this.db.executeSql(
        `CREATE TABLE IF NOT EXISTS ${
          this.#KeyValTable
        } (key TEXT PRIMARY KEY, value TEXT, initDate DATETIME DEFAULT CURRENT_TIMESTAMP)`
      );
      await this.db.executeSql(
        `CREATE TABLE IF NOT EXISTS ${this.#HistoryTable} (value TEXT, id INTEGER PRIMARY KEY AUTOINCREMENT)`
      );
      await this.db.executeSql(
        `CREATE TABLE IF NOT EXISTS ${
          this.#LocationTable
        } (flag TEXT, id TEXT,lang TEXT, name TEXT,categories TEXT, currency TEXT)`
      );
      await this.db.executeSql(
        `CREATE TABLE IF NOT EXISTS ${
          this.#LikeTable
        } (key TEXT PRIMARY KEY, value TEXT, initDate DATETIME DEFAULT CURRENT_TIMESTAMP)`
      );
      await this.db.executeSql(
        `CREATE TABLE IF NOT EXISTS ${
          this.#CacheTable
        } (key TEXT PRIMARY KEY, value TEXT, initDate DATETIME DEFAULT CURRENT_TIMESTAMP)`
      );
      await this.db.executeSql(`CREATE TABLE IF NOT EXISTS ${this.#ChatRoomTable} (postkey TEXT PRIMARY KEY, roomid TEXT)`);
      await this.getCurrentSize();
    } catch (error) {
      throw error;
    }
  };

  /*************************************key value table**************************************/

  getString = async (key) => {
    try {
      await this.openDatabase();
      const resultSet = await this.db.executeSql(`SELECT value FROM ${this.#KeyValTable} WHERE key = ?`, [key]);
      if (resultSet && resultSet.length > 0) {
        let result = resultSet[0];
        if (result.rows.length > 0) {
          return result.rows.item(0).value;
        }
      }
      return "";
    } catch (error) {
      console.log("data base geString error: ", error);
      return "";
    }
  };

  setString = async (key, value) => {
    try {
      await this.openDatabase();
      await this.db.executeSql(`INSERT OR REPLACE INTO ${this.#KeyValTable} (key, value) VALUES (?, ?)`, [key, value]);
      return;
    } catch (error) {
      throw error;
    }
  };

  deleteRecord = async (key) => {
    try {
      await this.openDatabase();
      await this.db.executeSql(`DELETE FROM ${this.#KeyValTable} where key = ?`, [key]);
      return;
    } catch (error) {
      throw error;
    }
  };

  /***************************************************************************************************/

  //*************************************Location table********************************************* */
  setLocations = async (locations) => {
    if (!locations) {
      console.log("empty locations");
      return;
    }
    try {
      // i could have do the confrontation between locations and loations that
      //set the api locations but i did not do that, i think it is waste of time.
      await this.openDatabase();

      await this.db.transaction((tx) => {
        // Delete existing locations
        tx.executeSql(`DELETE FROM ${this.#LocationTable}`);

        // Insert new locations
        //console.log("locations to set are: ", locations);
        const insertPromises = locations.map((location) => {
          return new Promise((resolve, reject) => {
            tx.executeSql(
              `INSERT INTO ${this.#LocationTable} (flag, name, id, lang,categories,currency) VALUES (?, ?, ?, ?, ?, ?)`,
              [location.flag, location.name, location.id, location.lang_code, location.categories, location.currency],
              (_, resultSet) => {
                resolve(resultSet);
              },
              (_, error) => {
                reject(error);
              }
            );
          });
        });

        return Promise.all(insertPromises);
      });
      console.log("location has been written to database");
      return;
    } catch (error) {
      console.log("set location storage error: ", error);
    }
  };

  getLocations = async () => {
    try {
      //console.log("get locationssssssssssssssssssss");
      await this.openDatabase();
      let results = await this.db.executeSql(`SELECT * FROM ${this.#LocationTable}`);
      const locations = [];
      if (results && results.length > 0) {
        results = results[0];
        if (results.rows.length > 0) {
          for (let i = 0; i < results.rows.length; i++) {
            locations.push(results.rows.item(i));
          }
        }
      }
      return locations;
    } catch (error) {
      throw error;
    }
  };

  getLocationByName = async (name) => {
    try {
      await this.openDatabase();
      let resultSet = await this.db.executeSql(`SELECT * FROM ${this.#LocationTable} WHERE name = ?`, [name]);
      if (resultSet && resultSet.length > 0) {
        resultSet = resultSet[0];
        const results = [];
        if (resultSet.rows.length > 0) {
          for (let i = 0; i < resultSet.rows.length; i++) {
            results.push(resultSet.rows.item(i));
          }
        }
        return results;
      } else {
        return [];
      }
    } catch (error) {
      console.log("database get locationbyname error: ", error);
      return [];
    }
  };

  //************************************************************************************************************** */

  //**************************************************History table********************************************** */

  setHistory = async (value) => {
    try {
      await this.openDatabase();

      // Delete existing history values
      await this.db.executeSql(`DELETE FROM ${this.#HistoryTable} WHERE value = ?`, [value]);

      // Insert the new value
      await this.db.executeSql(`INSERT INTO ${this.#HistoryTable} (value) VALUES (?)`, [value]);

      return;
    } catch (error) {
      throw error;
    }
  };

  getAllHistory = async () => {
    //console.log(inputUserId);
    const result_list = [];
    try {
      await this.openDatabase();
      let results = await this.db.executeSql(`SELECT value FROM ${this.#HistoryTable} ORDER BY id DESC LIMIT 30`, []);
      if (results && results.length > 0) {
        results = results[0];
        if (results.rows.length > 0) {
          for (let i = 0; i < results.rows.length; i++) {
            result_list.push(results.rows.item(i));
          }
        }
      }
      //console.log("returng all the results:", result_list);
      return result_list;
    } catch (error) {
      console.log("data base get error: ", error);
      return result_list;
    }
    /**
    await db.transaction((tx) => {
      tx.executeSql("SELECT * FROM TypeTable where type = ?", [type], (tx, results) => {
        var len = results.rows.length;
        if (len > 0) {
          for (let i = 0; i < results.rows.length; i++) {
            result_list.push(results.rows.item(i));
          }
        }
      });
    });
     */
  };

  seachFromHistory = async (value) => {
    const result_list = [];
    try {
      await this.openDatabase();
      let results = await this.db.executeSql(
        `SELECT id, value FROM ${this.#HistoryTable} WHERE value LIKE '%' || ? || '%' COLLATE NOCASE LIMIT 30`,
        [value]
      );
      //let results = await this.db.executeSql(`SELECT id,value FROM ${this.#HistoryTable} WHERE value LIKE '%?%' LIMIT 30`, [value]);
      if (results && results.length > 0) {
        results = results[0];
        if (results.rows.length > 0) {
          for (let i = 0; i < results.rows.length; i++) {
            result_list.push(results.rows.item(i));
          }
        }
      }
      //console.log("returng all the results:", result_list);
      return result_list;
    } catch (error) {
      console.log("data base get error: ", error);
      return result_list;
    }
  };

  deleteHistory = async (value) => {
    try {
      await this.openDatabase();
      await this.db.executeSql(`DELETE FROM ${this.#HistoryTable} WHERE value = ?`, [value]);
      return;
    } catch (error) {
      throw error;
    }
  };

  //*************************************************************************************************** */

  /**************************************like table******************************************************/

  getAllLikes = async () => {
    try {
      await this.openDatabase();
      const result_list = [];
      const resultSet = await this.db.executeSql(`SELECT key,value FROM ${this.#LikeTable}`);
      if (resultSet && resultSet.length > 0) {
        let result = resultSet[0];
        //console.log(result.rows);
        if (result.rows.length > 0) {
          for (let i = 0; i < result.rows.length; i++) {
            result_list.push(result.rows.item(i));
          }
        }
      }
      return result_list;
    } catch (error) {
      console.log("data base getAllLikes error: ", error);
      return "";
    }
  };

  getLike = async (key) => {
    try {
      await this.openDatabase();
      const resultSet = await this.db.executeSql(`SELECT value FROM ${this.#LikeTable} WHERE key = ?`, [key]);
      //console.log(resultSet); //[{"insertId": undefined, "rows": {"item": [Function item], "length": 1, "raw": [Function raw]}, "rowsAffected": 0}]
      if (resultSet && resultSet.length > 0) {
        let result = resultSet[0];
        if (result.rows.length > 0) {
          let vall = result.rows.item(0).value;
          console.log(vall, " from like storage");
          return vall;
        }
      }
      return "0";
    } catch (error) {
      console.log("data base getLike error: ", error);
      return "0";
    }
  };

  setLike = async (key, value) => {
    try {
      await this.openDatabase();
      await this.db.executeSql(`INSERT OR REPLACE INTO ${this.#LikeTable} (key, value) VALUES (?, ?)`, [key, value]);
      return;
    } catch (error) {
      throw error;
    }
  };

  deleteLike = async (key) => {
    try {
      await this.openDatabase();
      await this.db.executeSql(`DELETE FROM ${this.#LikeTable} WHERE key = ?`, [key]);
    } catch (err) {
      console.log("delete from like table error: ", err);
    }
  };

  deleteAllLikes = async () => {
    try {
      await this.openDatabase();
      await this.db.executeSql(`DELETE FROM ${this.#LikeTable}`);
    } catch (err) {
      console.log("delete all likes error: ", err);
    }
  };

  /*************************************************************************************** */

  /***************************************cache table************************************* */
  getCache = async (key) => {
    try {
      console.log("cahce size                                     :", this.#CurrentCacheSize);
      await this.openDatabase();
      const resultSet = await this.db.executeSql(`SELECT value,initDate FROM ${this.#CacheTable} WHERE key = ?`, [key]);
      if (resultSet && resultSet.length > 0) {
        let result = resultSet[0];
        if (result.rows.length > 0) {
          //console.log("date............................", result.rows.item(0).value);
          return result.rows.item(0).value;
        }
      }
      return "";
    } catch (error) {
      console.log("data base geString error: ", error);
      return "";
    }
  };

  setCache = async (key, value) => {
    try {
      if (this.#CurrentCacheSize > this.#MaxCacheSize) {
        //console.log("cahce size                                     :", this.#CurrentCacheSize);
        //let result = await this.db.executeSql(`SELECT MIN(initDate) FROM ${this.#CacheTable} LIMIT 1`);
        //console.log("min date result: ", result[0].rows.length);
        //console.log("min date result: ", result[0].rows.item(0));
        await this.db.executeSql(
          `DELETE FROM ${this.#CacheTable} WHERE initDate = (SELECT MIN(initDate) FROM ${this.#CacheTable} LIMIT 1)`
        );
        this.#CurrentCacheSize -= 1;
      }
      await this.openDatabase();
      await this.db.executeSql(`INSERT OR REPLACE INTO ${this.#CacheTable} (key, value) VALUES (?, ?)`, [key, value]);
      this.#CurrentCacheSize += 1;
      return;
    } catch (error) {
      throw error;
    }
  };

  delCache = async (key) => {
    try {
      await this.openDatabase();
      await this.db.executeSql(`DELETE FROM ${this.#CacheTable} WHERE key = ?`, [key]);
      this.#CurrentCacheSize -= 1;
      return;
    } catch (error) {
      throw error;
    }
  };

  getCurrentSize = async () => {
    try {
      await this.openDatabase();
      const resultSet = await this.db.executeSql(`SELECT count(key) as total FROM ${this.#CacheTable}`);
      if (resultSet && resultSet.length > 0) {
        this.#CurrentCacheSize = resultSet[0].rows.item(0).total;
        return;
      }
      this.#CurrentCacheSize = 0;
      return;
    } catch (error) {
      console.log("data base get cache size error: ", error);
      this.#CurrentCacheSize = 0;
    }
  };

  /*************************************************************************************** */

  /*****************************************chatroom table**********************************/
  getRoomId = async (post_key) => {
    try {
      await this.openDatabase();
      const resultSet = await this.db.executeSql(`SELECT roomid FROM ${this.#ChatRoomTable} WHERE postkey = ?`, [post_key]);
      if (resultSet && resultSet.length > 0) {
        let result = resultSet[0];
        if (result.rows.length > 0) {
          return result.rows.item(0).roomid;
        }
      }
      return "";
    } catch (error) {
      console.log("data base geString error: ", error);
      return "";
    }
  };

  setRoomId = async (post_key, room_id) => {
    try {
      await this.openDatabase();
      await this.db.executeSql(`INSERT OR REPLACE INTO ${this.#ChatRoomTable} (postkey, roomid) VALUES (?, ?)`, [
        post_key,
        room_id
      ]);
      return;
    } catch (error) {
      throw error;
    }
  };

  deleteRoomId = async (room_id) => {
    try {
      await this.openDatabase();
      await this.db.executeSql(`DELETE FROM ${this.#ChatRoomTable} where roomid = ?`, [room_id]);
      return;
    } catch (error) {
      throw error;
    }
  };

  /*************************************************************************************** */
  _calculateDefaultDataSize = async () => {
    try {
      await this.openDatabase();
      const result1 = await this.db.executeSql("PRAGMA page_count;");
      const pageCount = result1[0].rows.item(0).page_count;
      const result2 = await this.db.executeSql("PRAGMA page_size;");
      const pageSize = result2[0].rows.item(0).page_size;

      const databaseSizeBytes = pageCount * pageSize;
      return Number(databaseSizeBytes / 1024).toFixed(2); // Convert to kilobytes
    } catch (err) {
      console.log("database calculate total size error: ", err);
      return "";
    }
  };
  calculateSize = async () => {
    try {
      await this.openDatabase();
      const result1 = await this.db.executeSql("PRAGMA page_count;");
      const pageCount = result1[0].rows.item(0).page_count;
      const result2 = await this.db.executeSql("PRAGMA page_size;");
      const pageSize = result2[0].rows.item(0).page_size;

      const databaseSizeBytes = pageCount * pageSize;
      const databaseSizeKB = Number(databaseSizeBytes / 1024).toFixed(2); // Convert to kilobytes
      const databaseSizeMB = Number(databaseSizeKB / 1024).toFixed(2);
      console.log("db size:", databaseSizeKB, databaseSizeMB, this.#emptyTableSize);
      if (databaseSizeMB > 1) {
        return databaseSizeMB + " MB";
      } else {
        if (databaseSizeKB <= this.#emptyTableSize) {
          return "0KB";
        }
        return databaseSizeKB + " KB";
      }
    } catch (err) {
      console.log("database calculate total size error: ", err);
      return "";
    }
  };

  clearTables = async () => {
    try {
      await this.openDatabase();
      await this.db.executeSql(`DELETE FROM ${this.#KeyValTable}`);
      await this.db.executeSql(`DELETE FROM ${this.#HistoryTable}`);
      //await this.db.executeSql(`DELETE FROM ${this.#LocationTable}`);
      await this.db.executeSql(`DELETE FROM ${this.#LikeTable}`);
      await this.db.executeSql(`DELETE FROM ${this.#CacheTable}`);
      await this.db.executeSql(`DELETE FROM ${this.#ChatRoomTable}`);
      //await this.db.executeSql(`drop table ${this.#ChatRoomTable}`);
      this.#CurrentCacheSize = 0;
      this.#emptyTableSize = await this._calculateDefaultDataSize();
    } catch (err) {
      console.log("clear table error: ", err);
    }
  };
}

export default DatabaseManager.getInstance();
