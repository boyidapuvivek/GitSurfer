import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// import { NavigationContainer } from "@react-navigation/native";
import SearchScreen from "../screens/SearchScreen";
import DetailsScreen from "../screens/DetailsScreen";
import FavoritesScreen from "../screens/FavouritesScreen";

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="Search"
  >
    <Stack.Screen name="Search" component={SearchScreen} />
    <Stack.Screen name="Details" component={DetailsScreen} />
    <Stack.Screen name="Favorites" component={FavoritesScreen} />
  </Stack.Navigator>
);

export default AppNavigator;
