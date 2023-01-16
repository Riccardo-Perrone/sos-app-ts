import { StyleSheet, Dimensions } from "react-native";

import commonStyle from "../../common-Style";

export default StyleSheet.create({
  contain: {
    margin: -3,

    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    position: "absolute",
    zIndex: 5,
  },
  containOpacity: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height + 100,
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
  containMap: {
    justifyContent: "center",
  },
  containAddContacts: {
    justifyContent: "center",
  },
  textMap: {
    marginTop: 250,
    marginLeft: 80,
  },
  containContacts: {
    justifyContent: "flex-end",
  },
  textContacts: {
    marginBottom: 100,
    marginLeft: 150,
  },
  containSos: {
    justifyContent: "flex-end",
  },
  textSos: {
    marginTop: 100,
    width: "100%",
  },
});
