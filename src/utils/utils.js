import { Translation } from "./Strings";
import { sha256 } from "./sha.js";
import { App } from "./Strings.js";

/**
 * take the string convert to hex decimal and save the
 * max hexString length in malen and create one dimentional
 * array pass it to the shuffle method
 * @param {String text to encrypt} value
 * @returns list of shuffled hex string
 */
export function Encrypt(value) {
  return value;
  /***
  try {
    let hashed = [];
    let maxLen = 0;
    for (let i = 0; i < value.length; i++) {
      let h = value.charAt(i).charCodeAt(0).toString(16);
      hashed.push(h);
      if (h.length > maxLen) {
        maxLen = h.length;
      }
    }
    let len = hashed.length;
    if (len % 2 != 0) {
      len++;
      hashed.push("");
    }
    let shuf = [hashed.slice(len / 2, len).reverse(), hashed.slice(0, len / 2).reverse()];
    let finalString = "";
    for (let row of shuf) {
      for (let cell of row) {
        if (cell.length < maxLen) {
          cell = cell + Array(maxLen - cell.length + 1).join(" ");
        }
        finalString += cell;
      }
    }
    return finalString.trim() + "$" + maxLen;
  } catch (err) {
    return value;
  }
   */
}

export function Decrypt(str) {
  return str;
  /**
  try {
    let dollarIndex = str.indexOf("$");
    let maxLen = parseInt(str.substring(dollarIndex + 1, str.length));
    let newStr = str.substring(0, dollarIndex);
    let reg = `.{1,${maxLen}}`;
    let word = newStr.match(new RegExp(reg, "g"));
    let len = word.length;
    let slices = [word.slice(len / 2, len).reverse(), word.slice(0, len / 2).reverse()];
    let result = "";
    for (let x of slices) {
      for (let y of x) {
        y = parseInt(y.trim(), 16);
        if (y != 0 && !Number.isNaN(y)) {
          result = result + String.fromCharCode(y);
        }
      }
    }
    return result.trim();
  } catch (error) {
    return str;
  }
   */
}

export function vid() {
  let name = "TurkToplum";
  let result = "";
  for (let i = 0; i < name.length; i++) {
    result += name.charAt(i).charCodeAt(0).toString();
  }
  return secure(result);
}

/**
 *
 * @returns first part 7th is z,last part 7th is v
 */
export function uuidCreate() {
  var n = new Date().getTime();
  return "xxxxxxnx-xxxx-xxxx-yxxx-xxxxxixxxxxx".replace(/[xy]/g, function (t) {
    var e = (n + 16 * Math.random()) % 16 | 0;
    return (n = Math.floor(n / 16)), ("x" == t ? e : (7 & e) | 8).toString(16);
  });
}

const lang = App.lang;
export function getBaseHeaders(token, payload, image = false) {
  let time = new Date().getTime();
  let timestamp = time.toString().substring(0, 10);
  let uuid = uuidCreate();
  suffix = payload.endsWith("/") ? "" : "/";
  prefix = payload.startsWith("/") ? "" : "/";
  payload = App.base_url + prefix + payload + suffix;
  console.log("payload is : ", payload);

  sign =
    "token=" +
    token +
    "&uuid" +
    uuid +
    "&appid=" +
    App.app_id +
    "&timestamp=" +
    timestamp +
    "&version=" +
    App.version +
    "&payload=" +
    payload;
  return {
    Authorization: "Token " + token,
    "tt-appid": App.app_id,
    "tt-timestamp": timestamp,
    "tt-version": App.version,
    "TT-UUID": uuid,
    "tt-signature": sha256(sign),
    "Content-Type": image ? "multipart/form-data" : "application/json",
    accept: "application/json",
    "Accept-Language": lang //"en-US"
  };
}

export const getGuestHeadrs = () => {
  let time = new Date().getTime();
  let timestamp = time.toString().substring(0, 10);
  let uuid = uuidCreate();
  sign = "&uuid" + uuid + "&appid=" + App.app_id + "&timestamp=" + timestamp + "&version=" + App.version;
  return {
    "tt-appid": App.app_id,
    "tt-timestamp": timestamp,
    "tt-version": App.version,
    "TT-UUID": uuid,
    "tt-signature": sha256(sign),
    "Content-Type": "application/json",
    "Accept-Language": lang //"en-US"
  };
};

export const simpleHeader = () => {
  return {
    "Content-Type": "application/json",
    "Accept-Language": lang //"en-US"
  };
};

export function getRandomPayloadHeader(token, payload, image = false) {
  let time = new Date().getTime();
  let timestamp = time.toString().substring(0, 10);
  let uuid = uuidCreate();

  sign =
    "token=" +
    token +
    "&uuid" +
    uuid +
    "&appid=" +
    App.app_id +
    "&timestamp=" +
    timestamp +
    "&version=" +
    App.version +
    "&payload=" +
    payload;
  //console.log(payload, sign);
  return {
    Authorization: "Token " + token,
    "tt-appid": App.app_id,
    "tt-timestamp": timestamp,
    "tt-version": App.version,
    "TT-UUID": uuid,
    "tt-signature": sha256(sign),
    "Content-Type": image ? "multipart/form-data" : "application/json",
    accept: "application/json",
    "Accept-Language": lang //"en-US"
  };
}

export function timeStampHandler(timestamp = "") {
  let now = new Date();
  if (timestamp) now = new Date(timestamp);

  const providedYear = now.getFullYear();
  const providedMonth = now.getMonth() + 1; // Months are 0-based
  const providedDay = now.getDate();

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentDay = new Date().getDate();

  const yesterday = new Date();
  yesterday.setDate(currentDay - 1); // Calculate yesterday's date

  if (providedYear === currentYear && providedMonth === currentMonth && providedDay === currentDay) {
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const timeString = `${hours}:${minutes}`;
    return timeString;
  } else if (
    providedYear === yesterday.getFullYear() &&
    providedMonth === yesterday.getMonth() + 1 &&
    providedDay === yesterday.getDate()
  ) {
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const timeString = Translation("yesterday") + ` ${hours}:${minutes}`;
    return timeString;
  }

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  const dateTimeString = `${year}-${month}-${day} ${hours}:${minutes}`;

  return dateTimeString;
}
/**
 * converts servers utc time to users local time
 * @param {*} utcDateTime to convert to local time
 * @returns local time
 */
export function formatDateTime(utcDateTime) {
  const serverDate = new Date(utcDateTime);
  const now = new Date();

  const isToday =
    serverDate.getDate() === now.getDate() &&
    serverDate.getMonth() === now.getMonth() &&
    serverDate.getFullYear() === now.getFullYear();

  const isYesterday =
    serverDate.getDate() === now.getDate() - 1 &&
    serverDate.getMonth() === now.getMonth() &&
    serverDate.getFullYear() === now.getFullYear();

  if (isToday || isYesterday) {
    const time = serverDate.toLocaleTimeString("default", { hour: "numeric", minute: "numeric" });
    return isToday ? Translation("today") + ` ${time}` : Translation("yesterday") + ` ${time}`;
  } else {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return serverDate.toLocaleDateString("en-CA", options);
  }
}

export function ExtractFromLink(url) {
  const regex = /\/([^/]+)\/([^/]+)\/([^/]+)\/$/;
  const match = url.match(regex);

  if (match) {
    const thirdSubDir = match[3];
    const secondSubDir = match[2];
    const firstSubDir = match[1];
    return { type: firstSubDir, id: secondSubDir, newslike: thirdSubDir === "true" };
  } else {
    return null;
  }
}
