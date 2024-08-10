import { View, TextInput, Button, Text } from "react-native";
import { useState } from "react";

import { supabase } from "../resources/supabase";
import { styles } from "../resources/styles";

export default function SignUpRoute() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSignUpButtonPress = async () => {
    setIsLoading(true);
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });
    setIsLoading(false);

    if (error) {
      setErrorMessage(error.message);
    } else {
      setErrorMessage("Usuario creado.");
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
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCompleteType="email"
        onTextInput={() => setErrorMessage("")}
      />
      <TextInput
        style={styles.singinInput}
        placeholder="contraseña"
        value={password}
        onChangeText={setPassword}
        autoCompleteType="password"
        secureTextEntry={true}
        onTextInput={() => setErrorMessage("")}
      />
      <View
        style={{
          width: "100%",
          flexDirection: "row-reverse",
        }}
      >
        <Button
          title="Crear cuenta"
          onPress={onSignUpButtonPress}
          disabled={isLoading}
        />
      </View>
    </View>
  );
}
