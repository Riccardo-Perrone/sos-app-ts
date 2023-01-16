import { StyleSheet, Dimensions } from "react-native";

import commonStyle from "../../common-Style";

export default StyleSheet.create({
  contain: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    position: "absolute",
    zIndex: 5,
  },
  containOpacity: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    position: "absolute",
    backgroundColor: "black",
    opacity: 0.5,
  },
  containStart: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    opacity: 2,
    borderRadius: 20,
    padding: 10,
    backgroundColor: "#ADA4A1",
    fontFamily: commonStyle.font.fontFamily,
    fontSize: 20,
    width: 150,
  },
  containAddContacts: {
    alignItems: "center",
  },
  containContacts: {
    justifyContent: "flex-end",
  },
  textContacts: {
    marginBottom: 100,
    marginLeft: 150,
  },
  textAddContacts: {
    marginTop: 50,
    marginLeft: 100,
  },
});
