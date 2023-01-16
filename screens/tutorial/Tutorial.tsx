import { View, Text, Dimensions } from "react-native";
import React, { useState } from "react";
import Style from "./tutorial-styles";
import i18n from "../../localization/confingLanguages";

type Props = {
  map: boolean;
  callbackEndTutorial: Function;
};
interface State {
  start: boolean;
  map: boolean;
  addContacts: boolean;
  contacts: boolean;
  sos: boolean;
}
const initialState = {
  start: true,
  map: false,
  addContacts: false,
  contacts: false,
  sos: false,
};

const Tutorial = (props: Props) => {
  const [state, setState] = useState<State>(initialState);
  function start(): void {
    setState({
      ...state,
      start: false,
      map: true,
    });
  }
  function map(): void {
    setState({
      ...state,
      addContacts: true,
      map: false,
    });
  }
  function addContacts(): void {
    setState({
      ...state,
      addContacts: false,
      contacts: true,
    });
  }
  function contacts(): void {
    setState({
      ...state,
      sos: true,
      contacts: false,
    });
  }
  function sos(): void {
    props.callbackEndTutorial();
  }
  return (
    <View
      style={[
        Style.contain,
        state.start && Style.containStart,
        state.map && Style.containMap,
        state.addContacts && Style.containAddContacts,
        state.contacts && Style.containContacts,
        state.sos && Style.containSos,
      ]}
    >
      <View
        style={[Style.containOpacity, state.start && Style.containStart]}
      ></View>
      <View>
        {state.start && (
          <Text onPress={start} style={Style.text}>
            {i18n.t("tutorialMap.start")}
          </Text>
        )}
        {state.map && (
          <Text onPress={map} style={Style.text}>
            {i18n.t("tutorialMap.map")}
          </Text>
        )}
        {state.addContacts && (
          <Text onPress={addContacts} style={[Style.text, Style.textMap]}>
            {i18n.t("tutorialMap.addContacts")}
          </Text>
        )}
        {state.contacts && (
          <Text onPress={contacts} style={[Style.text, Style.textContacts]}>
            {i18n.t("tutorialMap.contacts")}
          </Text>
        )}
        {state.sos && (
          <Text onPress={sos} style={[Style.text, Style.textSos]}>
            {i18n.t("tutorialMap.sos")}
          </Text>
        )}
      </View>
    </View>
  );
};

export default Tutorial;
