import { View, Text, Button } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

import Style from "./header-Styles";

type Props = {
  title: string;
  buttonBack: boolean;
  buttonSelected: boolean;
  callbackSelected?: any;
  callbackNavBack?: any;
};

const Header = (props: Props): JSX.Element => {
  function callbackSelected(): void {
    props.callbackSelected();
  }

  function callbackNavBack(): void {
    props.callbackNavBack();
  }

  return (
    <View style={Style.containerHeader}>
      <View style={Style.backTitle}>
        {props.buttonBack && (
          <Ionicons
            onPress={callbackNavBack}
            name="arrow-back"
            size={24}
            color="black"
          />
        )}

        <Text
          style={[
            Style.title,
            Style.font,
            !props.buttonBack && Style.colorTitle,
          ]}
        >
          {props.title}
        </Text>
      </View>
      {!!props.callbackSelected && (
        <View>
          <Button title="OK" onPress={callbackSelected} />
        </View>
      )}
    </View>
  );
};

export default Header;
