import { useNavigation } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";

export default function DefaultBackButton() {
  const navigation = useNavigation();

  const back = () => {
    if (!navigation.canGoBack()) {
      console.log(`cannot go back`);
      return;
    }

    navigation.goBack();
  };

  return (
    <Pressable style={styles.backButton} onPress={back}>
      <Text>&#60; Back</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backButton: {
    borderRadius: 5,
    backgroundColor: "white",
    padding: "1%",
    height: "100%",
    justifyContent: "center",
    borderWidth: 1,
  },
});
