import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  LocationGeocodedAddress,
  LocationObject,
  LocationPermissionResponse,
} from "expo-location";
import * as SplashScreen from "expo-splash-screen";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";
import * as SMS from "expo-sms";

//compontens function
import Header from "../../components/functionComponents/header/Header";
import CardContactSelected from "../../components/functionComponents/cardContactSelected/CardContactSelected";
import i18n from "../../localization/confingLanguages";
import Tutorial from "../tutorial/Tutorial";

import Style from "./map-Styles";

SplashScreen.preventAutoHideAsync();

interface State {
  location: any | null;
  region: initialRegion;
  contacts: Array<ContactProps>;
  tutorial: boolean;
}
type ContactProps = {
  name: string;
  picture?: any;
  numberPhone: any | undefined;
  selected: boolean;
  validPhone: boolean;
};
type initialRegion = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

const initialState: State = {
  location: null,
  region: {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  },
  contacts: [],
  tutorial: true,
};

const Item = ({ contact }: any): JSX.Element => (
  <CardContactSelected contact={contact} />
);

const Map = ({ navigation, route }: any) => {
  const [state, setState] = useState<State>(initialState);

  useEffect(() => {
    setData();
  }, [route.params]);

  useEffect(() => {
    initPage();
  }, []);

  async function setData(): Promise<void> {
    const jsonData: string = JSON.stringify(route.params);
    await AsyncStorage.setItem("contacts", jsonData);

    setState({
      ...state,
      contacts: route.params,
    });
  }

  async function initPage(): Promise<void> {
    let objValue: any = [];
    let tutorialMap: boolean = false;

    const jsonValue: string | null = await AsyncStorage.getItem("contacts");
    const tutorial: string | null = await AsyncStorage.getItem("tutorialMap");
    if (jsonValue != null) {
      objValue = JSON.parse(jsonValue);
    }
    if (tutorial != null) {
      tutorialMap = JSON.parse(tutorial);
      console.log(tutorialMap);
    }
    let { status }: LocationPermissionResponse =
      await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }

    let location: LocationObject = await Location.getCurrentPositionAsync({});
    console.log(location.coords);

    setState({
      ...state,
      location: location,
      region: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0015,
        longitudeDelta: 0.0015,
      },
      contacts: objValue,
      tutorial: tutorialMap,
    });
  }

  async function handleSos() {
    if (!state?.contacts[0].numberPhone[0].number) {
      return;
    }

    let numberSoS: Array<string> = [];
    for (let i = 0; i < state.contacts.length; i++) {
      numberSoS.push(state?.contacts[i].numberPhone[0].number);
    }

    let geoCode: LocationGeocodedAddress[] = await Location.reverseGeocodeAsync(
      state.location.coords
    );
    let location: string = `${geoCode[0].region} ${geoCode[0].subregion} ${geoCode[0].city} ${geoCode[0].street} ${geoCode[0].streetNumber}`;
    SMS.sendSMSAsync(numberSoS, i18n.t("emergency.message") + location);
  }

  function handleAddContact() {
    navigation.navigate("Contacts", state.contacts);
  }

  const renderItem: ListRenderItem<ContactProps> = ({ item }) => {
    return <Item contact={item} />;
  };

  async function endTutorial(): Promise<void> {
    await AsyncStorage.setItem("tutorialMap", "false");
    setState({
      ...state,
      tutorial: false,
    });
  }

  const onLayoutRootView = useCallback(async () => {
    if (state.location != null) {
      await SplashScreen.hideAsync();
    }
  }, [state.location]);

  if (state.location === null) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={Style.container}>
      {state.tutorial && (
        <Tutorial map={true} callbackEndTutorial={endTutorial} />
      )}

      <Header
        buttonBack={false}
        buttonSelected={false}
        title={i18n.t("emergency.title")}
      />
      <Text style={[Style.font]}>{i18n.t("emergency.position")}</Text>
      {state.location != null && (
        <MapView style={Style.container} region={state.region}>
          <Marker coordinate={state?.location?.coords} />
        </MapView>
      )}

      <View style={[Style.container, Style.containerBottom]}>
        <Text style={Style.font}>{i18n.t("emergency.contacts")}</Text>
        <View style={Style.contactsSos}>
          <CardContactSelected callbackOnPress={handleAddContact} />

          <FlatList
            horizontal={true}
            data={state.contacts}
            renderItem={renderItem}
          ></FlatList>
        </View>
        <Text style={Style.font}>{i18n.t("emergency.contactsText")}</Text>
        <View style={Style.sosSection}>
          <TouchableOpacity style={Style.btSos} onPress={handleSos}>
            <Text style={Style.font}>{i18n.t("emergency.send")}</Text>
          </TouchableOpacity>
          <Text style={Style.font}>{i18n.t("emergency.sendText")}</Text>
        </View>
      </View>
    </View>
  );
};

export default Map;
