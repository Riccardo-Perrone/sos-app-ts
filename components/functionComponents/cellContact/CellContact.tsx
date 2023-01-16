import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import { AntDesign } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import * as Contacts from "expo-contacts";

import style from "./cellContscr-Styles";

interface CellContactProps {
  callbackOnPress: Function;
  position: number;
  contact: User;
}

type User = {
  name: string;
  picture?: any;
  numberPhone: Array<Contacts.PhoneNumber>;
  selected: boolean;
  validPhone: boolean;
};

const CellContact: FC<CellContactProps> = (props): JSX.Element => {
  const onPress = (): void => {
    props.callbackOnPress(props.position, props.contact);
  };

  return (
    <TouchableOpacity
      style={
        props.contact.validPhone ? style.containerCell : style.contactNotValid
      }
      onPress={onPress}
    >
      <View style={style.contact}>
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
        <Text style={style.font}>{props.contact.name}</Text>
      </View>
      <Checkbox
        onValueChange={onPress}
        style={style.checkbox}
        value={props.contact.selected}
        color={props.contact.selected ? "#4630EB" : undefined}
      />
    </TouchableOpacity>
  );
};

export default CellContact;
