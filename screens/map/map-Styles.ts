import { StyleSheet } from "react-native";
import commonStyle from "../../common-Style";

export default StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    margin: 3,
  },
  containerBottom: {
    marginTop: 20,
  },
  btSos: {
    backgroundColor: "yellow",
    height: 50,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  btAddUsers: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 50,
    margin: 5,
    backgroundColor: "#d1d1d1",
    borderRadius: 50,
  },
  contactsSos: {
    flexDirection: "row",
    marginBottom: 20,
  },
  font: {
    fontFamily: commonStyle.font.fontFamily,
  },
  sosSection: {
    backgroundColor: commonStyle.color.color,
    paddingBottom: 100,
    marginTop: 70,
    margin: -5,
    justifyContent: "center",
    alignItems: "center",
  },
});
