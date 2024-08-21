import { Pressable, StyleSheet, Text } from "react-native";
import { useState } from "react";

import { supabase } from "../../resources/supabase";

export default function LogoutButton() {
  const [isLogoutLoading, setLogoutLoading] = useState(false);

  const logoutUser = async () => {
    setLogoutLoading(true);
    const { error } = await supabase.auth.signOut();
    setLogoutLoading(false);

    if (error) {
      console.log("Logout error");
      console.log(error);
    }
  };

  return (
    <Pressable
      style={styles.button}
      onPress={logoutUser}
      disabled={isLogoutLoading}
    >
      <Text>Signout</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: "1%",
    borderWidth: 1,
    borderRadius: 5,
    height: "100%",
    justifyContent: "center",
    backgroundColor: "orange",
  },
});
