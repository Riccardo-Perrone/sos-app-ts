import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ContactsScreen from "./screens/contacts/Contacts";
import Map from "./screens/map/Map";
import { useFonts, Signika_400Regular } from "@expo-google-fonts/signika";

const Stack = createNativeStackNavigator();
export default function App() {
  let [fontsLoaded] = useFonts({
    Signika_400Regular,
  });

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Map"
      >
        <Stack.Screen name="Contacts" component={ContactsScreen} />
        <Stack.Screen name="Map" component={Map} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
