import { StyleSheet, Text, View, Platform } from "react-native";

// HOMETAB
import Home from "./src/screens/HomeTab/Home";
import DetailsScreen from "./src/screens/HomeTab/DetailsScreen";

// CONSOTAB
import ConsoScreen from "./src/screens/ConsoTab/ConsoScreen";

// REACT NATIVE PAPER
import { MD3Colors, Provider as PaperProvider } from "react-native-paper";

// NAVIGATION
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// ICONE TABS
import { Ionicons, FontAwesome } from "@expo/vector-icons";

const HomeTab = () => {
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

const ConsoTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Conso"
        component={ConsoScreen}
        options={{ headerShown: false }}
        initialParams={{ stationName: null }}
      />
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
            component={HomeTab}
            options={{
              tabBarIcon: ({ color }) => {
                return <Ionicons name="home-outline" size={24} color={color} />;
              },
              headerShown: false,
              title: "Acceuil",
              tabBarLabelStyle: { fontWeight: "bold" },
              tabBarActiveTintColor: MD3Colors.primary20,
              tabBarInactiveTintColor: MD3Colors.primary80,
            }}
          />

          <Tab.Screen
            name="ConsoTab"
            component={ConsoTab}
            options={{
              tabBarIcon: ({ color }) => {
                return <FontAwesome name="euro" size={24} color={color} />;
              },
              headerShown: false,
              title: "Consommation",
              tabBarLabelStyle: { fontWeight: "bold" },
              tabBarActiveTintColor: MD3Colors.primary20,
              tabBarInactiveTintColor: MD3Colors.primary80,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
