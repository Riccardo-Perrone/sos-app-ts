import { StyleSheet } from "react-native";
import commonStyle from "../../../common-Style";

export default StyleSheet.create({
  containerCell: {
    height: 40,
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  contact: {
    flexDirection: "row",
  },
  contactNotValid: {
    height: 40,
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    opacity: 0.1,
  },
  checkbox: {
    marginRight: 15,
  },
  font: {
    fontFamily: commonStyle.font.fontFamily,
  },
});
