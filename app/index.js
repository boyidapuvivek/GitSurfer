import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import AppNavigator from "../navigtions/AppNavigator";
import { View, Text, Button, Alert, Linking, StyleSheet } from "react-native";
import NetInfo from "@react-native-community/netinfo";

const App = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      if (!state.isConnected) {
        Alert.alert("No Internet", "Please turn on the internet to continue.", [
          { text: "Cancel", style: "cancel" },
          { text: "Open Settings", onPress: () => Linking.openSettings() },
        ]);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Provider store={store}>
      {isConnected ? (
        <AppNavigator />
      ) : (
        <View style={styles.container}>
          <Text style={styles.text}>No Internet Connection</Text>
          <Button
            title="Open Settings"
            onPress={() => Linking.openSettings()}
          />
        </View>
      )}
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 18,
    color: "red",
    marginBottom: 10,
  },
});

export default App;
