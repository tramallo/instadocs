import { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { Link } from "expo-router";

import { supabase } from "../resources/supabase";
import { styles } from "../resources/styles";

export default function SignInComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
    <View style={styles.screenContainer}>
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
      <TextInput
        style={styles.singinInput}
        placeholder="email@email.com"
        value={email}
        onChangeText={(newText) => {
          setEmail(newText);
          setErrorMessage("");
        }}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCompleteType="email"
      />
      <TextInput
        style={styles.singinInput}
        placeholder="contraseña"
        value={password}
        onChangeText={(newText) => {
          setPassword(newText);
          setErrorMessage("");
        }}
        autoCompleteType="password"
        secureTextEntry={true}
      />
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Link href="/signup">Crear cuenta</Link>
        <Button
          title="Iniciar sesion"
          onPress={onSignInButtonPress}
          disabled={isLoading}
        />
      </View>
    </View>
  );
}
