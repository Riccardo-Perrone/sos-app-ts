import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import * as Contacts from "expo-contacts";
import { AntDesign } from "@expo/vector-icons";

import Style from "./cardContactSelected-Styles";

type Props = {
  callbackOnPress?: any;
  contact?: CellContactProps;
};

type CellContactProps = {
  name: string;
  picture?: any;
  numberPhone: Array<Contacts.PhoneNumber>;
  selected: boolean;
  validPhone: boolean;
};

const CardContactSelected = (props: Props) => {
  function onPress(): void {
    props.callbackOnPress();
  }
  return (
    <>
      {!!props.contact ? (
        <View style={Style.card}>
          <View style={{ width: 30, height: 30 }}>
            {!!props.contact.picture ? (
              <Image
                source={props.contact.picture}
                style={{ width: 30, height: 30 }}
              />
            ) : (
              <AntDesign name="user" size={24} color="black" />
            )}
          </View>
          <Text>{props.contact.name}</Text>
        </View>
      ) : (
        <TouchableOpacity style={Style.btAddUsers} onPress={onPress}>
          <AntDesign name="adduser" size={40} color="black" />
        </TouchableOpacity>
      )}
    </>
  );
};

export default CardContactSelected;
