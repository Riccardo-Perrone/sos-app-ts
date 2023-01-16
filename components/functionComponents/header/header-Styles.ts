import { StyleSheet, Platform, StatusBar } from "react-native";
import commonStyle from "../../../common-Style";

export default StyleSheet.create({
  containerHeader: {
    height: 80,
    paddingRight: 20,
    paddingLeft: 20,
    margin: -3,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: commonStyle.color.color,
  },
  title: {
    fontSize: 30,
    marginLeft: 10,
  },
  backTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  font: {
    fontFamily: commonStyle.font.fontFamily,
  },
  colorTitle: {
    color: "red",
  },
});
