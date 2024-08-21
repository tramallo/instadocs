import { Text, Pressable, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function DocumentListEntry({ document }) {
  return (
    <Link
      href={{
        pathname: "/[documentId]",
        params: { documentId: document.id },
      }}
      asChild
    >
      <Pressable style={styles.entryButton}>
        <Text>{document?.createdAt || "--"}</Text>
        <Text>{document?.status || "--"}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  entryButton: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 5,
    padding: "1%",
    marginBottom: "1%",
    backgroundColor: "cyan",
  },
});
