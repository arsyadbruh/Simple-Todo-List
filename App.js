import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {Ionicons, FontAwesome5} from "@expo/vector-icons";

import { AboutScreen, TaskCompletedScreen, TaskScreen } from "./screens";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Task") {
            iconName = "tasks";
          } else if (route.name === "Completed") {
            iconName =  "clipboard-check";
          } else if (route.name === "About") {
            iconName = "exclamation-circle";
          }
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
        tabBarIconStyle: { marginTop: 10 },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 10,
        },
        tabBarStyle: {
          height: 70,
          borderTopWidth: 0,
        },
      })}>
      <Tab.Screen name="Task" component={TaskScreen} options={{ unmountOnBlur: true }}/>
      <Tab.Screen name="Completed" component={TaskCompletedScreen} options={{ unmountOnBlur: true }}/>
      <Tab.Screen name="About" component={AboutScreen} options={{ unmountOnBlur: true }}/>
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="BottomNavigator"
            component={BottomNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
