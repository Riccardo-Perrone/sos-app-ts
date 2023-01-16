import { View, TextInput, ListRenderItem, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import * as Contacts from "expo-contacts";
import CellContact from "../../components/functionComponents/cellContact/CellContact";
import Header from "../../components/functionComponents/header/Header";
import Style from "./contacts-Styles";
import i18n from "../../localization/confingLanguages";
import TutorialContacts from "../tutorial/TutorialContacts";

import AsyncStorage from "@react-native-async-storage/async-storage";

interface State {
  contacts: Array<CellContactProps>;
  tutorial: boolean;
}

const initialState: State = {
  contacts: [],
  tutorial: true,
};

type CellContactProps = {
  name: string;
  picture?: any;
  numberPhone: Array<Contacts.PhoneNumber> | undefined;
  selected: boolean;
  validPhone: boolean;
};

const Item = ({ contact, position, callbackOnPress }: any): JSX.Element => (
  <CellContact
    position={position}
    callbackOnPress={callbackOnPress}
    contact={contact}
  />
);

let contactselected: number = 0;
let contactRow: Array<CellContactProps> = [];

const ContactsScreen = ({ navigation, route }: any) => {
  const [state, setState] = useState<State>(initialState);

  const _renderItem: ListRenderItem<CellContactProps> = ({
    item,
    index,
  }: any): JSX.Element => {
    return (
      <Item contact={item} position={index} callbackOnPress={handleOnPress} />
    );
  };

  useEffect(() => {
    requestPermision();
  }, []);

  const requestPermision = async (): Promise<void> => {
    const { status }: Contacts.PermissionResponse =
      await Contacts.requestPermissionsAsync();

    if (status === "granted") {
      const { data }: Contacts.ContactResponse =
        await Contacts.getContactsAsync();

      let contacts: Array<CellContactProps> = [];

      for (let i = 0; i < data.length; i++) {
        let selected: boolean = false;

        if (typeof data[i].phoneNumbers != "undefined") {
          let validPhone: boolean =
            data[i].phoneNumbers[0].number.includes("+39");

          for (let j = 0; j < route.params.length; j++) {
            if (data[i].name === route.params[j].name) {
              selected = true;
            }
          }

          let user: CellContactProps = {
            name: data[i].name,
            numberPhone: data[i].phoneNumbers,
            selected: selected,
            validPhone: validPhone,
            picture: data[i]?.image?.uri,
          };
          contacts.push(user);
        }
      }
      console.log(contacts);

      contactselected = route.params.length;
      contactRow = contacts;

      let tutorialContacts: boolean = false;
      const tutorial: string | null = await AsyncStorage.getItem(
        "tutorialContacts"
      );
      if (tutorial != null) {
        tutorialContacts = JSON.parse(tutorial);
        console.log(tutorialContacts);
      }
      setState({
        ...state,
        contacts: contacts,
        tutorial: tutorialContacts,
      });
    }
  };

  //da ottimizzare
  const handleOnPress = (position: number, contact: CellContactProps): void => {
    if ((contactselected === 5 && !contact.selected) || !contact.validPhone) {
      return;
    }
    contactselected = Math.min(
      contactselected + (contact.selected ? -1 : 1),
      5
    );
    let data: Array<CellContactProps> = state.contacts;
    let newCell: CellContactProps = {
      name: contact.name,
      picture: contact.picture,
      numberPhone: contact.numberPhone,
      selected: !contact.selected,
      validPhone: contact.validPhone,
    };
    data.splice(position, 1, newCell);
    changeData(data);
  };

  function changeData(data: Array<CellContactProps>) {
    contactRow = data;
    setState({
      ...state,
      contacts: data,
    });
  }

  function handleBack(): void {
    navigation.goBack();
  }

  function handleSelected(): void {
    let contactSelected: Array<CellContactProps> = state.contacts.filter(
      (contact) => {
        return contact.selected;
      }
    );
    console.log(contactSelected, state.contacts);

    navigation.navigate("Map", contactSelected);
  }

  function onChange(e: string): void {
    let contactFilter: Array<CellContactProps> = contactRow.filter(
      (contact) => {
        return contact.name.toLowerCase().includes(e.toLowerCase());
      }
    );
    setState({
      ...state,
      contacts: contactFilter,
    });
  }
  async function endTutorial(): Promise<void> {
    await AsyncStorage.setItem("tutorialContacts", "false");
    setState({
      ...state,
      tutorial: false,
    });
  }

  return (
    <View style={{ flex: 1 }}>
      {state.tutorial && <TutorialContacts callbackEndTutorial={endTutorial} />}

      <Header
        callbackSelected={handleSelected}
        callbackNavBack={handleBack}
        buttonBack={true}
        buttonSelected={true}
        title={i18n.t("contacts.title")}
      />

      <TextInput
        style={Style.inputText}
        onChangeText={onChange}
        placeholder={i18n.t("contacts.serch")}
      />
      <FlatList data={state.contacts} renderItem={_renderItem}></FlatList>
    </View>
  );
};

export default ContactsScreen;
