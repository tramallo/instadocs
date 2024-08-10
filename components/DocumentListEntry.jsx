import { Text, View } from "react-native";

export default function DocumentListEntry({ document }) {
  return (
    <View
      style={{
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: "1%",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Text>{document.createdAt}</Text>
      <Text>{document.status}</Text>
    </View>
  );
}
