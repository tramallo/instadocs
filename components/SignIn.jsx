import { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

import { supabase } from "../resources/supabase";

export default function SignInComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      justifyContent: "center",
      padding: "1%",
    },
    inputField: {
      backgroundColor: isLoading ? "grey" : "white",
      marginBottom: "1%",
      fontSize: 16,
    },
    errorMessage: { fontSize: 10, color: "red" },
    buttonsBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  });

  const onSignInButtonPress = async () => {
    setIsLoading(true);
    const { user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setIsLoading(false);

    if (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <View style={styles.container}>
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      <TextInput
        style={styles.inputField}
        placeholder="email@email.com"
        value={email}
        onChangeText={setEmail}
        onTextInput={() => setErrorMessage("")}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCompleteType="email"
      />
      <TextInput
        style={styles.inputField}
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        onTextInput={() => setErrorMessage("")}
        autoCompleteType="password"
        secureTextEntry={true}
      />
      <View style={styles.buttonsBar}>
        <Link href="/signup">Sign up</Link>

        <Button
          title="Sign in"
          onPress={onSignInButtonPress}
          disabled={isLoading}
        />
      </View>
    </View>
  );
}
