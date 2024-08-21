import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

import AuthContextProvider from "../components/AuthContext";

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "index",
};

export default function RootLayout() {
  const styles = StyleSheet.create({
    safeAreaView: {
      width: "100%",
      height: "100%",
    },
  });

  return (
    <AuthContextProvider>
      <SafeAreaView style={styles.safeAreaView}>
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaView>
    </AuthContextProvider>
  );
}
