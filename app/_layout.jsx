import { Stack } from "expo-router";

import AuthContextProvider from "../components/AuthContext";

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <Stack />
    </AuthContextProvider>
  );
}
