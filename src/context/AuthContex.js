import reducer from "./reducer";
import { createContext, useContext, useEffect, useReducer } from "react";

import {
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  UPDATE_USER_PROFILE,
  UPDATE_LIKEDPOST_COUNT,
  UPDATE_UPLOADEDPOST_COUNT,
  USER_GET_TOKEN,
  LOGIN_USER_BEGIN,
  SET_LOCATION,
  CLEAR_ALERT,
  SET_IS_FIRST_LAUNCH,
  GET_IS_FIRST_LAUNCH,
  CHANGE_APP_THEME,
  UPDATE_TOT_UNREAD_MSG,
  UPDATE_BADGE_COUNT,
  CHANGE_NOTIFICATION_SETTINGS,
  CLEAR_LOGIN_ERROR
} from "./actions";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import DatabaseManager from "../utils/Storage";
import Network, { getPassengerData, LoginApi, LogoutApi, GetCountryFromCoordinate } from "../utils/Network";
import { App } from "../utils/Strings";
import DeviceInfo from "react-native-device-info";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import Geolocation from "@react-native-community/geolocation";

const initialState = {
  loginUserErrorText: "",
  token: null,
  //0 default user, 1 normal user,2 guest
  user: { username: "", email: "@", posts: 0, likes: 0, shares: 0, usertype: 0 },
  likedCount: 0,
  postCount: 0,
  //userProfilePicture: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  // App state
  location: "Hollanda", // default location
  locationCode: "nl", // default location code
  locationFlag: "https://turktoplum.net/media/icons/flags/Netherlands.png", // default location flag
  categories: "community,market,work,house,promote,news",
  currency: "",
  //   global settings
  isIos: Platform.OS === "ios",
  isFirstLaunch: "",
  themeOption: "", //0 is auto ,1 is dark, 2 is light
  msgCount: "",
  newsNotification: "1" //0 false 1 true
};

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState); // auth state reducer

  // -----   Helper functions   ----- //

  // setStorage function
  const setStorage = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  };
  /**
   *  @param {string} key
   * */

  const getStorage = async (key) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  };

  const getStorageData = async () => {
    try {
      const user = await getStorage("user");
      const token = await getStorage("token");
      const FirstLaunch = await getStorage("FirstTimeLaunch");
      let option = await DatabaseManager.getString(App.theme_options);
      let news_nf = await DatabaseManager.getString(App.news_nf);

      if (!news_nf) {
        news_nf = "1";
      }

      if (!option) {
        option = "0"; //auto change theme
      }

      dispatch({
        type: CHANGE_NOTIFICATION_SETTINGS,
        payload: {
          type: "news",
          value: news_nf
        }
      });

      dispatch({
        type: CHANGE_APP_THEME,
        payload: {
          themeOption: option
        }
      });

      dispatch({
        type: GET_IS_FIRST_LAUNCH,
        payload: {
          FirstLaunch: FirstLaunch === null ? "1" : FirstLaunch
        }
      });

      if (token != null || user != null) {
        dispatch({
          type: USER_GET_TOKEN,
          payload: {
            token: token,
            user: JSON.parse(user)
          }
        });
      }
      if (user != null) {
        dispatch({
          type: UPDATE_USER_PROFILE,
          payload: {
            msg: "success",
            user: JSON.parse(user)
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getStorageData();
  }, []);

  const changeAppTheme = async (value) => {
    try {
      await DatabaseManager.setString(App.theme_options, value);
      dispatch({
        type: CHANGE_APP_THEME,
        payload: {
          themeOption: value
        }
      });
    } catch (error) {
      console.log("change theme error:", error);
    }
  };

  const setNewsNotificationSwitch = async (value) => {
    try {
      await DatabaseManager.setString(App.news_nf, value);
      if (value === "1") {
        Network("HEWER_UQUR", "GET", { receive: "True" });
      } else {
        Network("HEWER_UQUR", "GET", { receive: "False" });
      }
      dispatch({
        type: CHANGE_NOTIFICATION_SETTINGS,
        payload: {
          type: "news",
          value: value
        }
      });
    } catch (error) {
      console.log("change news nf error:", error);
    }
  };

  /**
   * check if datatabse has user selected location if this is first
   * install there is no location selected so, function get the location
   * from location list that is been setted by getlocationapi function
   * and make the selected location as first location in the list.if there is no selected location
   * then geopositioning activated choose users current location(if app granted geopositioning)
   */
  const getSelectedLocation = async () => {
    try {
      let countryName = await DatabaseManager.getString(App.selected_country);
      if (!countryName) {
        Geolocation.getCurrentPosition((info) => {
          console.log("location info from geo: ", info);
          GetCountryFromCoordinate(info.coords.latitude, info.coords.longitude)
            .then((result) => {
              console.log("result from network: ", result);
              if (result.country) {
                DatabaseManager.getLocationByName(result.country)
                  .then((nfl) => {
                    console.log("result geo from database: ", nfl);
                    if (nfl.length) {
                      nfl = nfl[0];
                      dispatch({
                        type: SET_LOCATION,
                        payload: {
                          location: nfl.name,
                          locationCode: nfl.lang,
                          locationFlag: nfl.flag,
                          categories: nfl.categories,
                          currency: nfl.currency
                        }
                      });
                    }
                  })
                  .catch((err) => {
                    console.error("get location from database error: ", err);
                  });
              } else {
                console.log("there is no country", info);
              }
            })
            .catch((error) => console.error("get location from geo error: ", error));
        });
      } else {
        let locations = await DatabaseManager.getLocationByName(countryName);
        console.log("get selected location", locations[0]);
        const { name, flag, lang, categories, currency } = locations[0];
        dispatch({
          type: SET_LOCATION,
          payload: {
            location: name,
            locationCode: lang,
            locationFlag: flag,
            categories: categories,
            currency: currency
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getLocationApi = async () => {
    let response = await Network("DOLETLER", "GET");
    console.log("api countries: ", response);
    if (response.results) {
      await DatabaseManager.setLocations(response.results);
    }
  };

  //  ---- change location function ---- //
  /**
   * @param {string} currentLocation - location name // Netherlands,
   */
  const changeLocation = async (currentLocation, alreadyHas = false) => {
    try {
      if (alreadyHas) {
        return;
      }
      let locations = await DatabaseManager.getLocationByName(currentLocation);
      await DatabaseManager.setString(App.selected_country, currentLocation);
      const { name, flag, lang, id, categories, currency } = locations[0];
      dispatch({
        type: SET_LOCATION,
        payload: {
          location: name,
          locationCode: lang,
          locationFlag: flag,
          categories: categories,
          currency: currency
        }
      });
      //const res = await Network("UPDATE_COUNTRY", "POST", {}, { ct_id: id });
      const res = await Network("UPDATE_COUNTRY", "GET", { ct_id: id }, {});
      console.log(res, "change location");
      //   save location in storage
    } catch (err) {
      console.log(err);
    }
  };

  // ------- clear error text loginUserErrorText ------- //
  const clearAlert = () => {
    try {
      dispatch({
        type: CLEAR_ALERT
      });
    } catch (err) {
      console.log(err);
    }
  };

  //login as guest
  const loginAsGuest = async () => {
    let guest_name = await getStorage("guest_name");
    let uuid = await DeviceInfo.getUniqueId();
    //console.log(uuid, "uuid from authcontext");
    let response = await getPassengerData(guest_name, uuid);

    // DeviceInfo.getBuildId().then((buildId) => console.log("build id: ", buildId));
    //DeviceInfo.getUniqueId().then((buildId) => console.log("unique id: ", buildId));

    if (response.code === "1") {
      let token = response.msg.token;
      let username = response.msg.username;
      let likes = response.msg.favorite;
      let posts = response.msg.posts;
      let shares = response.msg.forward;
      let logo = response.msg.logo;
      let user = { email: "", username: username, posts: posts, likes: likes, shares: shares, usertype: 2, logo: logo };
      await setStorage("user", JSON.stringify(user));
      await setStorage("guest_name", username);
      await setStorage("token", token);
      console.log("guest info:", response.msg);
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: {
          token: token,
          msg: "success",
          user: user
        }
      });
      return;
    }
    //if get guest use fails
    await setStorage("token", "");
    console.log("get guest fail : ", response);
    dispatch({
      type: LOGIN_USER_ERROR,
      payload: {
        msg: response.msg
      }
    });
  };

  // login user function
  /**
   * @param {object} values
   * @param {string} values.email
   * @param {string} values.password
   * @param {string} values.username
   * @param values
   * @returns {Promise<void>}
   */
  const loginUser = async (values) => {
    let result = await LoginApi({ email: values.email, password: values.password });
    dispatch({ type: LOGIN_USER_BEGIN });
    console.log("login result: ", result);
    let token = ""; // normal token
    if (result.code === "1") {
      token = result.msg;
      await setStorage("token", token);

      response = await Network("POST_TIMIZLIK", "GET", { type: "1" }); //get the like list from the  server
      //console.log("liked post from server:", response);
      if (response.code && response.code == "1") {
        //console.log("liked post server side:", response.msg);
        for (let i = 0; i < response.msg.length; i++) {
          let li = response.msg[i];
          //console.log(li);
          await DatabaseManager.setLike(li.key, "1");
        }
      }

      // get user profile info
      result = await Network("ABONT_UCHURI", "get");
      console.log("profile info result: ", result);
      if (result.code === "1") {
        let username = result.msg.username;
        let likes = result.msg.favorite;
        let posts = result.msg.posts;
        let shares = result.msg.forward;
        let logo = result.msg.logo;
        let user = {
          email: values.email,
          username: username,
          posts: posts,
          likes: likes,
          shares: shares,
          usertype: 1,
          logo: logo
        };
        await setStorage("user", JSON.stringify(user));
        console.log("profice info:", result.msg);
        dispatch({
          type: LOGIN_USER_SUCCESS,
          payload: {
            token: token,
            msg: "success",
            user: user
          }
        });
        return;
      }
    }
    //login user fail or get prfile info failed
    if (state.user.usertype !== 2) {
      //to prevent clear passenger token
      //if the user is passenger and has passenger token, we do not need to clear it out
      await setStorage("token", "");
    }
    console.log("login result and user type: ", result, state.user.usertype);
    dispatch({
      type: LOGIN_USER_ERROR,
      payload: {
        msg: result.non_field_errors ? result.non_field_errors : result.msg
      }
    });
  };

  // google signin
  /**
   * @param token
   * @returns {Promise<void>}
   */
  const updateToken = async (token, email) => {
    //console.log("update token", token);
    await setStorage("token", token);

    response = await Network("POST_TIMIZLIK", "GET", { type: "1" }); //get the like list from the  server
    //console.log("liked post from server:", response);
    if (response.code && response.code == "1") {
      //console.log("liked post server side:", response.msg);
      for (let i = 0; i < response.msg.length; i++) {
        let li = response.msg[i];
        //console.log(li);
        await DatabaseManager.setLike(li.key, "1");
      }
    }

    // get user profile info
    result = await Network("ABONT_UCHURI", "GET");
    console.log("profile info result: ", result);
    if (result.code === "1") {
      let username = result.msg.username;
      let likes = result.msg.favorite;
      let posts = result.msg.posts;
      let shares = result.msg.forward;
      let logo = result.msg.logo;
      let user = { email: email, username: username, posts: posts, likes: likes, shares: shares, usertype: 1, logo: logo };
      await setStorage("user", JSON.stringify(user));
      console.log("profile info:", result.msg);
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: {
          token: token,
          msg: "success_google_login",
          user: user
        }
      });
      return;
    }
  };

  /**
   *
   * @param {0 all, 1 user_uploadedPost_count,2 user_likedPost_count} update_type
   * @returns null
   */
  const updateUserProfile = async (update_type = 0) => {
    let result = await Network("ABONT_UCHURI", "GET");
    console.log("updateUserProfile: ", result);
    if (result.code === "1") {
      let username = result.msg.username;
      let likes = result.msg.favorite;
      let posts = result.msg.posts;
      //let shares = result.msg.forward;
      let logo = result.msg.logo;

      let current_user = await getStorage("user");
      let user = JSON.parse(current_user);
      const old_like = user.likes;
      const old_post = user.posts;

      let new_user = { ...user, username: username, posts: posts, likes: likes, usertype: 1, logo: logo };
      await setStorage("user", JSON.stringify(new_user));
      console.log("updated profice info:", old_post, old_like, new_user.posts, new_user.likes, update_type);
      if (update_type === 1 && old_post != new_user.posts) {
        dispatch({
          type: UPDATE_UPLOADEDPOST_COUNT,
          payload: {
            msg: "success",
            posts: new_user.posts
          }
        });
      } else if (update_type === 2 && old_like != new_user.likes) {
        dispatch({
          type: UPDATE_LIKEDPOST_COUNT,
          payload: {
            msg: "success",
            likes: new_user.likes
          }
        });
      } else if (update_type === 0) {
        dispatch({
          type: UPDATE_USER_PROFILE,
          payload: {
            msg: "success",
            user: new_user
          }
        });
      }
      return;
    }
  };

  // logout user function
  const logoutUser = async (force = false) => {
    try {
      let likeList = await DatabaseManager.getAllLikes();
      if (likeList && likeList.length > 0) {
        //console.log("local liked list", likeList);
        response = await Network("SAHLANGHANLAR", "POST", {}, { nk_list: likeList, type: "0" });
        //console.log("save like response: ", response);
        await DatabaseManager.deleteAllLikes();
      }
      //tokens deleted by another device of the user skip making requests
      if (!force) {
        let result = await LogoutApi();
        //console.log("logout api result is: ", result, result.code, result.code == 0);
        if (result.code == 0) {
          console.log("logout failed", result.msg);
          return;
        }
      }

      GoogleSignin.configure({
        webClientId: App.webClientId,
        iosClientId: App.iosClientId
      });

      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) {
        GoogleSignin.signOut()
          .then(() => {
            console.log("logout success!!!");
          })
          .catch((err) => {
            console.log("error logging out", err);
          });
      } else {
        console.log("not signin with google!!!");
      }
    } catch (err) {
      console.log("error from auth context", err);
    }
    await DatabaseManager.clearTables();
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    await loginAsGuest();
  };

  const changeIsFirstLaunch = async (string) => {
    console.log("changeIsFirstLaunch string's ->", string);
    try {
      dispatch({
        type: SET_IS_FIRST_LAUNCH,
        payload: { isFirstLaunch: string }
      });
      // save to storage
      await setStorage("FirstTimeLaunch", string);
    } catch (e) {
      console.log("error in changeIsFirstLaunch", e);
    }
  };

  const clearLoginErrorText = async () => {
    try {
      dispatch({
        type: CLEAR_LOGIN_ERROR,
        payload: ""
      });
    } catch (e) {
      console.log("clearing login error", e);
    }
  };

  const updateBadgeCount = async (string) => {
    try {
      dispatch({
        type: UPDATE_BADGE_COUNT,
        payload: { count: string }
      });
    } catch (err) {
      console.log("updateBadgeCount error string's ->", string);
    }
  };

  const updateNotificationToken = async (token, dev_typ = "android") => {
    try {
      //const localNFToken = await DatabaseManager.getString(App.nf_token);
      //console.log("local notification token is :", localNFToken);
      console.log("fcm token is :", token);
      //if (localNFToken != token) {
      let response = await Network("UPDATE_NF_TOKEN", "GET", { nf_token: token, device_type: dev_typ }, {});
      if (response.code == "1") {
        await DatabaseManager.setString(App.nf_token, token);
      } else {
        console.log("update notification token fail, retry next time", response);
      }
      //}
    } catch (err) {
      console.log("update notification error string's ->", string);
    }
  };
  /**
   *
   * @param {decice whether get msg from server or make msgcount zero} is_check
   * when is_check is false change the value of msgCount get the data from server
   * check if there is any unseen messages.when is_check is true that means user already
   * clicked the message tabbar icon so make the message count gone from tabbar icon
   * is no_request true caller knows there is a new message so directly set msgcount to 1
   */
  const checkUnseenMessages = async (is_check = false, no_request = false) => {
    if (is_check) {
      dispatch({ type: UPDATE_TOT_UNREAD_MSG, payload: { unseen: 0 } });
      return;
    }

    if (no_request) {
      dispatch({ type: UPDATE_TOT_UNREAD_MSG, payload: { unseen: 1 } });
      return;
    }
    const response = await Network("PARAG_OYLIRI", "GET");
    //console.log(response, " unseen messages");
    let unread_count = 0;
    if (response.code == "1") {
      await DatabaseManager.setCache(App.chatrooms, JSON.stringify(response));
      for (let i = 0; i < response.msg.length; i++) {
        let msg_obj = response.msg[i];
        if (Number(msg_obj.unread_count)) {
          unread_count++;
        } //= Number(msg_obj.unread_count);
      }
    }
    if (unread_count > 0) {
      dispatch({ type: UPDATE_TOT_UNREAD_MSG, payload: { unseen: unread_count } });
    }
  };

  // END OF AUTH CONTEXT

  const exportedValue = {
    ...state,
    logoutUser,
    loginUser,
    changeLocation,
    clearAlert,
    changeIsFirstLaunch,
    loginAsGuest,
    updateUserProfile,
    getLocationApi,
    getSelectedLocation,
    changeAppTheme,
    updateToken,
    updateBadgeCount,
    updateNotificationToken,
    setNewsNotificationSwitch,
    checkUnseenMessages
  };

  return <AuthContext.Provider value={exportedValue}>{children}</AuthContext.Provider>;
};
export const useAuth = () => useContext(AuthContext);

export default AuthContextProvider;
