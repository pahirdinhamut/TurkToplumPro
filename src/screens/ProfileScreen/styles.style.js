import { StyleSheet } from "react-native";
import { verticalScale } from "../../utils/Spacing";
import { Color, Fonts } from "../../utils/Strings";

const styles = StyleSheet.create({
  // header View
  HeaderView: {
    flex: 0.8,
    marginVertical: verticalScale(5)
  },
  UserProfileView: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 26,
    marginVertical: verticalScale(10)
  },
  UserImage: {
    height: 98,
    width: 98,
    borderRadius: 50,
    shadowColor: Color.blue,
    shadowOffset: {
      width: 8,
      height: 8
    },
    shadowOpacity: 0.39,
    shadowRadius: 13,

    elevation: 13
  },
  Photo: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
    position: "relative"
  },
  Edit: {
    position: "absolute",
    bottom: 0,
    right: -10,
    backgroundColor: "#fff",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center"
  },
  UserName: {
    marginLeft: 25
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 5
  },
  subName: {
    fontSize: 15,
    color: Color.grey,
    fontWeight: "400"
  },
  // USER STATUS View
  UserStatus: {
    flex: 1.2,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  HStackView: {
    height: 80,
    justifyContent: "space-between",
    alignItems: "center"
  },

  Line: {
    height: 25,
    width: 1,
    backgroundColor: Color.darkgrey
  },

  UserStatusText: {
    fontSize: 15,
    color: Color.blue,
    fontWeight: "500"
  },
  UserStatusCount: {
    fontSize: 18,
    fontWeight: "600"
  },

  AddIcons: {
    height: 20,
    width: 20,
    borderRadius: 5,
    backgroundColor: Color.secondaryBcColor,
    borderWidth: 1,
    borderColor: Color.blue,
    justifyContent: "center",
    alignItems: "center"
  },

  // SETTINGS View
  SettingView: {
    flex: 1.1,
    paddingHorizontal: verticalScale(22),
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: "#000"
  },

  darkSettingView: {
    flex: 1.2,
    paddingHorizontal: verticalScale(22),
    backgroundColor: Color.black,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: "#FFF",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6
  },
  SettingTitle: {
    fontSize: 17,
    marginVertical: 15,
    fontWeight: "500",
    textAlign: "center"
  },
  // modal style
  ButtonTitleView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  ButtonTitle: {
    fonsSize: 20,
    fontWeight: "900",
    lineHeight: 25,
    color: Color.PremiumTextColor,
    textAlign: "center"
  },
  ButtonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 30
  },
  Button: {
    width: 100,
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  ButtonText: {
    fontSize: 15,
    fontWeight: "500",
    color: Color.white
  },
  darkColor: {
    color: Color.bcColor
  },
  lightColor: {
    color: "black"
  },
  darkBackground: {
    backgroundColor: Color.black
  },
  lightBackground: {
    backgroundColor: Color.bcColor
  },
  modalViewTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    fontFamily: Fonts.semibold,
    lineHeight: 20,
    letterSpacing: 0.5,
    marginTop: verticalScale(15)
  }
});

export default styles;
