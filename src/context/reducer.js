import {
  UPDATE_USER_PROFILE,
  UPDATE_UPLOADEDPOST_COUNT,
  UPDATE_LIKEDPOST_COUNT,
  USER_GET_TOKEN,
  USER_SET_TOKEN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,
  SET_LOCATION,
  CLEAR_ALERT,
  GET_HOME_PAGE_POST_SUCCESS,
  GET_HOME_PAGE_POST_BEGIN,
  SET_IS_FIRST_LAUNCH,
  GET_IS_FIRST_LAUNCH,
  CHANGE_APP_THEME,
  UPDATE_BADGE_COUNT,
  CHANGE_NOTIFICATION_SETTINGS,
  UPDATE_TOT_UNREAD_MSG
} from "./actions";

const reducer = (state, action) => {
  if (action.type === SET_LOCATION) {
    return {
      ...state,
      location: action.payload.location,
      locationCode: action.payload.locationCode,
      locationFlag: action.payload.locationFlag,
      categories: action.payload.categories,
      currency: action.payload.currency
    };
  }

  if (action.type === CHANGE_APP_THEME) {
    return {
      ...state,
      themeOption: action.payload.themeOption
    };
  }
  if (action.type === CLEAR_ALERT) {
    // clear Alert

    return {
      ...state,
      loginUserErrorText: ""
    };
  }

  if (action.type === USER_SET_TOKEN) {
    return {
      ...state,
      token: action.payload.token
    };
  }

  if (action.type === USER_GET_TOKEN) {
    return {
      ...state,
      token: action.payload.token,
      user: action.payload.user
    };
  }

  if (action.type === LOGIN_USER_BEGIN) {
    return {
      ...state,
      loginUserErrorText: ""
    };
  }

  if (action.type === UPDATE_TOT_UNREAD_MSG) {
    return {
      ...state,
      msgCount: action.payload.unseen
    };
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      token: action.payload.token,
      user: action.payload.user,
      loginUserErrorText: action.payload.msg,
      likedCount: action.payload.user.likes,
      postCount: action.payload.user.posts
    };
  }

  if (action.type === UPDATE_USER_PROFILE) {
    return {
      ...state,
      user: action.payload.user,
      likedCount: action.payload.user.likes,
      postCount: action.payload.user.posts
    };
  }

  if (action.type === UPDATE_UPLOADEDPOST_COUNT) {
    return {
      ...state,
      postCount: action.payload.posts
    };
  }

  if (action.type === UPDATE_LIKEDPOST_COUNT) {
    return {
      ...state,
      likedCount: action.payload.likes
    };
  }

  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      loginUserErrorText: action.payload.msg
    };
  }

  if (action.type === UPDATE_BADGE_COUNT) {
    return {
      ...state,
      msgCount: action.payload.count
    };
  }

  if (action.type === CHANGE_NOTIFICATION_SETTINGS) {
    if (action.payload.type === "news") {
      return {
        ...state,
        newsNotification: action.payload.value
      };
    }
  }

  if (action.type === "LOGOUT_USER_BEGIN") {
  }

  if (action.type === "LOGOUT_USER_SUCCESS") {
    return {
      ...state,
      token: null
    };
  }

  if (action.type === "LOGOUT_USER_ERROR") {
    //     something error happened
  }

  // global posts

  if (action.type === GET_HOME_PAGE_POST_BEGIN) {
  }
  if (action.type === GET_HOME_PAGE_POST_SUCCESS) {
    return {
      ...state,
      homePagePosts: action.payload.posts
    };
  }

  if (action.type === SET_IS_FIRST_LAUNCH) {
    return {
      ...state,
      isFirstLaunch: action.payload.isFirstLaunch
    };
  }
  if (action.type === GET_IS_FIRST_LAUNCH) {
    return {
      ...state,
      isFirstLaunch: action.payload.FirstLaunch
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default reducer;
