import { View, Text, StyleSheet } from "react-native";

export default function DocumentDetails({ document, showId }) {
  const styles = StyleSheet.create({
    container: {
      padding: "1%",
      borderRadius: 5,
      backgroundColor: "grey",
      marginBottom: "1%",
    },
  });

  return (
    <View style={styles.container}>
      {showId && <Text>ID: {document?.id || "--"}</Text>}
      <Text>Status: {document?.status || "--"}</Text>
      <Text>Created by: {document?.createdBy || "--"}</Text>
      <Text>Created at: {document?.createdAt || "--"}</Text>
      <Text>Done by: {document?.doneBy || "--"}</Text>
      <Text>Done at: {document?.doneAt || "--"}</Text>
    </View>
  );
}
