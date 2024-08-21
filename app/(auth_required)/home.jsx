import { View, StyleSheet, Pressable, Text } from "react-native";
import { Link } from "expo-router";

import DocumentList from "../../components/document/DocumentList";
import NavigationBar from "../../components/navigation/NavigationBar";
import LogoutButton from "../../components/navigation/LogoutButton";

export default function Home() {
  const styles = StyleSheet.create({
    container: {
      padding: "1%",
      height: "100%",
      width: "100%",
    },
    content: { height: "95%" },
    newDocumentButton: {
      borderRadius: 5,
      width: "100%",
      height: "5%",
      justifyContent: "center",
      backgroundColor: "green",
      alignItems: "center",
      marginBottom: "1%",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <DocumentList />

        <Link href="/new_document" asChild>
          <Pressable style={styles.newDocumentButton}>
            <Text>new document</Text>
          </Pressable>
        </Link>
      </View>

      <NavigationBar hideDefaultBackButton={true}>
        <LogoutButton />
      </NavigationBar>
    </View>
  );
}
