import { useLayoutEffect, useState } from "react";
import { Redirect, Slot, useNavigation } from "expo-router";
import { Pressable, Text } from "react-native";

import { useAuthContext } from "../../components/AuthContext";
import { supabase } from "../../resources/supabase";

export default function AuthRequiredLayout() {
  const { isAuthenticated, authenticatedUser } = useAuthContext();
  const navigation = useNavigation();

  const [isLogoutLoading, setLogoutLoading] = useState(false);
  const onLogoutButtonPress = async () => {
    setLogoutLoading(true);
    const { error } = await supabase.auth.signOut();
    setLogoutLoading(false);

    if (error) {
      console.log("Logout error");
      console.log(error);
    }
  };
  const LogoutButton = (
    <Pressable
      style={{ borderWidth: 1, borderRadius: 5 }}
      onPress={onLogoutButtonPress}
      disabled={isLogoutLoading}
    >
      <Text style={{ color: "blue" }}>Cerrar sesion</Text>
    </Pressable>
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: authenticatedUser?.email || "",
      headerRight: () => LogoutButton,
    });
  });

  if (!isAuthenticated) {
    return <Redirect href="/" />;
  }
  return <Slot />;
}
