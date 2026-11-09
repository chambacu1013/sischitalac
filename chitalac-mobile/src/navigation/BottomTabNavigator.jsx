import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/Home/HomeScreen";
import SyncScreen from "../screens/Sync/SyncScreen";
import ConfiguracionScreen from "../screens/Config/ConfigScreen";
import { MaterialIcons } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: "#1976D2",
        tabBarInactiveTintColor: "#757575",

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },

        tabBarStyle: {
          height: 125,
          paddingBottom: 10,
          paddingTop: 5,
        },

        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case "Inicio":
              iconName = "home";
              break;

            case "Sincronizaciones":
              iconName = "sync";
              break;

            case "Configuración":
              iconName = "settings";
              break;

            default:
              iconName = "circle";
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />

      <Tab.Screen name="Sincronizaciones" component={SyncScreen} />

      <Tab.Screen name="Configuración" component={ConfiguracionScreen} />
    </Tab.Navigator>
  );
}
