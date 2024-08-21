import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";

import { supabase } from "../resources/supabase";
import NavigationBar from "../components/navigation/NavigationBar";

export default function SignUpRoute() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      padding: "1%",
    },
    content: {
      height: "95%",
      justifyContent: "center",
    },
    errorMessage: { color: "red", fontSize: 10 },
    inputField: {
      backgroundColor: isLoading ? "grey" : "white",
      borderRadius: 5,
      marginBottom: "1%",
      fontSize: 16,
    },
    buttonContainer: {
      width: "100%",
      flexDirection: "row-reverse",
    },
    signUpButton: {
      padding: "1%",
      borderWidth: 1,
      borderRadius: 5,
      backgroundColor: "cyan",
      flexDirection: "row",
    },
  });

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
    <View style={styles.container}>
      <View style={styles.content}>
        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}
        <TextInput
          style={styles.inputField}
          placeholder="email@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCompleteType="email"
          onTextInput={() => setErrorMessage("")}
        />
        <TextInput
          style={styles.inputField}
          placeholder="password"
          value={password}
          onChangeText={setPassword}
          autoCompleteType="password"
          secureTextEntry={true}
          onTextInput={() => setErrorMessage("")}
        />
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.signUpButton}
            onPress={() => onSignUpButtonPress()}
            disabled={isLoading}
          >
            {isLoading && <ActivityIndicator />}
            <Text>Create account</Text>
          </Pressable>
        </View>
      </View>
      <NavigationBar />
    </View>
  );
}
