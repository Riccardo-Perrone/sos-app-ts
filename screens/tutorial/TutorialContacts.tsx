import { View, Text } from "react-native";
import React, { useState } from "react";

import Style from "./tutorialContacts-styles";
import i18n from "../../localization/confingLanguages";

type Props = {
  callbackEndTutorial: Function;
};
interface State {
  start: boolean;
  contacts: boolean;
  addContacts: boolean;
}
const initialState = {
  start: true,
  addContacts: false,
  contacts: false,
};

const TutorialContacts = (props: Props) => {
  const [state, setState] = useState<State>(initialState);
  function start(): void {
    setState({
      ...state,
      start: false,
      contacts: true,
    });
  }
  function contacts(): void {
    setState({
      ...state,
      addContacts: true,
      contacts: false,
    });
  }
  function addContacts(): void {
    props.callbackEndTutorial();
  }
  return (
    <View
      style={[
        Style.contain,
        state.start && Style.containStart,
        state.addContacts && Style.containAddContacts,
        state.contacts && Style.containContacts,
      ]}
    >
      <View
        style={[Style.containOpacity, state.start && Style.containStart]}
      ></View>
      <View>
        {state.start && (
          <Text onPress={start} style={Style.text}>
            {i18n.t("tutorialContacts.start")}
          </Text>
        )}
        {state.addContacts && (
          <Text
            onPress={addContacts}
            style={[Style.text, Style.textAddContacts]}
          >
            {i18n.t("tutorialContacts.addContacts")}
          </Text>
        )}
        {state.contacts && (
          <Text onPress={contacts} style={[Style.text, Style.textContacts]}>
            {i18n.t("tutorialContacts.contacts")}
          </Text>
        )}
      </View>
    </View>
  );
};

export default TutorialContacts;
