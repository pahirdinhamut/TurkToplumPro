import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { App } from "./Strings";
import { getBaseHeaders, getGuestHeadrs, getRandomPayloadHeader, simpleHeader } from "./utils";

const api_list = {
  BASHBET: "/contents/homepageposts/",
  KIRISH: "/reg/login/",
  CHIQISH: "/reg/logout/",
  TIZIMLASH: "/registration/",
  KAYTA_EMAIL_YOLLASH: "/registration/resend-email/",
  ABONT_UCHURI: "/settings/user/info/",
  BASHBET_RASIM: "/contents/sliders/",
  BASH_RESIM: "/contents/startscreen/",
  ILAN_TURLER: "/contents/category/",
  ILAN_BERISH: "/contents/upload/",
  ILAN_BASH_RESIM: "/contents/header/image/",
  ILAN_RASIMLIRI: "/contents/images/",
  MEZMUN_TIZIMLIKE: "/contents/listposts/",
  MEZMUN: "/contents/details/",
  BAZAR_MEHSULAT: "/contents/product/",
  TERTIP_SUZGUCH: "/contents/filters/orders/",
  EMAIL_ENIHLASH: "/reg/checkemail/verification/",
  APP_UCHURI: "/settings/app/string/",
  SHIFIR_UNTUSH: "/reg/password/reset/",
  PROFIL_RESIM_YEGILASH: "/settings/change/logo/",
  PROFIL_ISIM_YEGILASH: "/settings/change/username/",
  SHIFIR_YEGILSH: "/reg/password/change/",
  DOLETLER: "/settings/countries/",
  IZDESH: "/contents/lookup/",
  INKASLAR: "/contents/comments/",
  INKASLAR2: "/contents/comments/anno/",
  INKAS_OCHURUSH: "/contents/comments/delete/",
  SAHLANGHANLAR: "/settings/favorites/",
  POST_TIMIZLIK: "/contents/list/userposts/",
  POST_TEHRIRLESH: "/contents/update/",
  MELUMQILISH: "/settings/report/",
  GOOGLE_LOGIN: "/social/google/",
  UQURLAR: "/chat/messages/",
  PARAG_OY: "/chat/create/room/",
  PARAG_OYLIRI: "/chat/list/rooms/",
  PARAG_OY_OCHURUSH: "/chat/delete/room/",
  UPDATE_COUNTRY: "/settings/update/country/",
  UPDATE_NF_TOKEN: "/settings/update/token/",
  HEWER_UQUR: "/settings/update/newsnotification/",
  KORULGEN_UCHURLAR: "/chat/update/seen/",
  UHTURUSHLAR: "/notification/list/",
  UHTURUSH_OCHURUSH: "/notification/delete/"
};

const TIMEOUT = 9000; // network request timeout 5s

export default async (
  link,
  method,
  params = {},
  post_data = {},
  guestHeader = false,
  imageUpload = false,
  paramPayload = false,
  pagination = { state: false, url: "" }
) => {
  let request_url;
  if (pagination.state) {
    request_url = pagination.url;
  } else {
    request_url = App.base_url + api_list[link];
  }
  let token = await AsyncStorage.getItem("token");
  let base_header = guestHeader ? getGuestHeadrs() : getBaseHeaders(token, api_list[link], imageUpload);

  //console.log(base_header);
  try {
    let result = null;

    if (typeof params === "string") {
      request_url = request_url + params;
      if (paramPayload) {
        base_header = getBaseHeaders(token, api_list[link] + params, imageUpload);
      }
      params = null;
    }
    console.log("link : ", request_url, params);
    //** on iOS13, it is not allowed to add a body in GET request */
    if (method.toLowerCase() === "get") {
      result = await axios({ url: request_url, method: method, headers: base_header, params: params, timeout: TIMEOUT });
    } else {
      result = await axios({
        url: request_url,
        method: method,
        headers: base_header,
        params: params,
        data: post_data,
        timeout: TIMEOUT
      });
    }
    //console.log(result.data);
    return result.data;
  } catch (error) {
    return ErrorHandler(error);
  }
};

export const PostDataImageUpload = async (link, params = {}, form_data = {}) => {
  let url = App.base_url + api_list[link];
  let token = await AsyncStorage.getItem("token");
  let base_header = getBaseHeaders(token, api_list[link], true);
  try {
    const response = await axios.post(url, form_data, { headers: base_header, params: params });
    return response.data;
  } catch (error) {
    return ErrorHandler(error);
  }
};

// -------------  Logout  ----------------

export const LogoutApi = async () => {
  let request_url = App.base_url + api_list.CHIQISH;
  let token = await AsyncStorage.getItem("token");
  let base_header = getBaseHeaders(token, api_list.CHIQISH);
  try {
    //let csrfToken = await AsyncStorage.getItem("csrfToken");
    //axios.defaults.headers.common["X-CSRFToken"] = csrfToken;
    let result = await axios({ url: request_url, method: "post", headers: base_header, timeout: TIMEOUT });
    return result.data;
  } catch (error) {
    return ErrorHandler(error);
  }
};

// -------------  Login  ----------------

export const LoginApi = async (post_data) => {
  let request_url = App.base_url + api_list.KIRISH;
  try {
    let result = await axios({ url: request_url, method: "post", data: post_data, timeout: TIMEOUT, headers: simpleHeader() });
    //let csrfToken = result.headers["set-cookie"]["0"].split("=")[1].split(";")[0];
    //axios.defaults.headers.common["X-CSRFToken"] = csrfToken;
    let token = result.data.key;
    return { code: "1", msg: token };
  } catch (error) {
    return ErrorHandler(error);
  }
};

export const UserRegistration = async (post_data) => {
  let request_url = App.base_url + api_list.TIZIMLASH;
  //let base_header = getBaseHeaders("", api_list.KIRISH);
  try {
    let result = await axios({ url: request_url, method: "post", data: post_data, timeout: TIMEOUT, headers: simpleHeader() });
    result = result.data;
    if (result.detail) {
      return { code: "1", msg: result.detail };
    }
    return result;
  } catch (error) {
    return ErrorHandler(error);
  }
};

export const getPassengerData = async (guestname, uuid) => {
  let request_url = App.base_url + "/passenger/";
  let guest_header = getGuestHeadrs();
  //console.log(guest_header);
  try {
    let result = await axios({
      url: request_url,
      method: "POST",
      headers: guest_header,
      data: { name: guestname, uuid: uuid },
      timeout: TIMEOUT
    });
    //console.log(result.data);
    return result.data;
  } catch (error) {
    return ErrorHandler(error);
  }
};
/**
 * used in upload and map screen to search the given input from the map return city name country...
 */
let times = 0;
export const LocationSuggesions = async (queryType = "q", searchData, country = "") => {
  if (searchData === null || searchData === undefined || searchData === "") {
    return [];
  }
  times++;
  console.log("requested so far: " + times);
  console.log(queryType + " | " + searchData + " | " + country);
  //queryType q=full search,postalcode=postcode ...https://nominatim.org/release-docs/3.6/api/Search/
  let params = { city: searchData, format: "json", addressdetails: 1, country: country }; //{ q: searchData, format: "json", addressdetails: 1 };
  if (queryType == "p") {
    //post code search
    params = { postalcode: searchData, format: "json", addressdetails: 1, country: country };
  }
  try {
    let response = await axios({
      url: "https://nominatim.openstreetmap.org/search",
      method: "GET",
      headers: { "Accept-Language": App.lang },
      params: params
    });
    response = response.data;
    let data = [];
    //console.log(response, params);
    if (response.length > 0) {
      for (let i = 0; i < response.length; i++) {
        if (i === 10) return;
        const obj = response[i].address;
        let boundingBox = response[i].boundingbox;
        let latitude = response[i].lat;
        let longitude = response[i].lon;
        let postcode = obj.postcode || "";
        let cityname =
          obj.city ||
          obj.town ||
          obj.village ||
          obj.suburb ||
          obj.neighborhood ||
          obj.county ||
          obj.region ||
          obj.municipality ||
          "";
        let country = obj.country || "";
        let result = postcode + " " + cityname + ", " + country;
        //console.log(result);
        if (result !== "") {
          //value is what is written in the combox
          //label is suggession list options
          //cityname is used only in uploadpost to auto complete city name field
          if (queryType === "p") {
            data.push({
              value: postcode,
              label: result,
              cityname: cityname,
              lat: latitude,
              lon: longitude,
              boundingBox: boundingBox
            });
          } else {
            data.push({ value: cityname, label: result, lat: latitude, lon: longitude, boundingBox: boundingBox });
          }
        }
      }
      //console.log(data);
      return data;
    }
  } catch (error) {
    console.log("find location error", error);
  }
  return [];
};

/**
 * used in market and map screens get the cordinates of the given city, country or post code
 */

export const LocationRequest = async (city, country, postcode = false) => {
  let params = { city: city, country: country, format: "json", addressdetails: 1 };
  if (postcode) {
    params = { postalcode: city, country: country, format: "json", addressdetails: 1 };
  }
  try {
    let response = await axios({
      url: "https://nominatim.openstreetmap.org/search",
      method: "GET",
      params: params
    });
    response = response.data;
    //console.log(response);
    if (response.length > 0) {
      const obj = response[0];
      const boundingBox = [
        [parseFloat(obj.boundingbox[0]), parseFloat(obj.boundingbox[2])], // Bottom-left corner [lat, lon]
        [parseFloat(obj.boundingbox[1]), parseFloat(obj.boundingbox[3])] // Top-right corner [lat, lon]
      ];
      const center = [parseFloat(obj.lat), parseFloat(obj.lon)];
      return {
        lat: center[0],
        lon: center[1],
        radius: haversineDistance(center, boundingBox[0])
      };
    }
    console.log("network api location:", response);
  } catch (error) {
    console.log("find location error", error);
  }
  return null;
};

/**
 * used only for determining user postion, from latitude and longitude
 * guess the country for select the first country
 */
export const GetCountryFromCoordinate = async (lat, lon) => {
  try {
    let response = await axios({
      url: "https://nominatim.openstreetmap.org/search",
      method: "GET",
      params: { q: lat + "," + lon, format: "json", addressdetails: 1 },
      headers: { "Accept-Language": App.lang }
    });
    response = response.data;
    //console.log(response);
    if (response.length > 0) {
      const obj = response[0];
      let code = obj.address.country_code;
      let country = obj.address.country;
      return { code: code, country: country };
    }
  } catch (error) {
    console.log("find location error", error);
  }
  return null;
};

function haversineDistance(coord1, coord2) {
  const [lat1, lon1] = coord1;
  const [lat2, lon2] = coord2;

  const toRadians = (angle) => (Math.PI / 180) * angle;
  const R = 6371; // Earth's radius in kilometers

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // The distance in kilometers

  return distance;
}
export const SeenCounter = async (nk, time) => {
  try {
    let token = await AsyncStorage.getItem("token");
    let header = getRandomPayloadHeader(token, JSON.stringify({ time: String(time), nk: String(nk) }));
    //console.log("header: ", header);
    let response = await axios({
      url: App.base_url + "/analyze/views/",
      method: "GET",
      params: { nk: nk, time: time },
      headers: header,
      timeout: TIMEOUT
    });
    //response = response.data;
    console.log("seen counter response: ", response.data);
  } catch (error) {
    //console.log("seen counter error: ", error);
  }
};

const ErrorHandler = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return error.response.data;
    //console.log(error.response.status);
    //console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    //console.log(error.request);
    if (error.request.timeout == TIMEOUT && error.request["_timedOut"]) {
      return { code: 0, msg: "request timed out" };
    } else if (error.request["_response"]) {
      return { code: 0, msg: error.request["_response"] };
    }
    return { code: "0", msg: "url error" };
  }
  // Something happened in setting up the request that triggered an Error
  console.log("other error");
  return { code: "0", msg: error.message };
};
