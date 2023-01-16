import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
  inputText: {
    marginTop: 20,
    padding: 3,
    width: 200,
    height: 40,
    marginLeft: Dimensions.get("window").width / 2 - 100,
    backgroundColor: "#ADA4A1",
    borderRadius: 20,
  },
});
