import { StyleSheet, Text, View, Platform } from "react-native";

import Home from "./src/screens/Home";
import DetailsScreen from "./src/screens/DetailsScreen";

import { Provider as PaperProvider } from "react-native-paper";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import { Ionicons } from "@expo/vector-icons";

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="HomeTab"
            component={HomeStack}
            options={{
              tabBarIcon: () => {
                return <Ionicons name="home-outline" size={24} color="black" />;
              },
              headerShown: false,
              title: "Acceuil",
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: "#fff",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   paddingTop: Constants.statusBarHeight,
  // },
});
