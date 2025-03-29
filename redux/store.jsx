import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favoritesSlice";
import themeReducer, { setTheme } from "./themeSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    theme: themeReducer,
  },
});

const loadTheme = async () => {
  const savedTheme = await AsyncStorage.getItem("darkMode");
  if (savedTheme !== null) {
    store.dispatch(setTheme(JSON.parse(savedTheme)));
  }
};

loadTheme();
