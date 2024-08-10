import { Text, View } from "react-native";

export default function DocumentListEntry({ document }) {
  return (
    <View>
      <Text>{document.createdAt}</Text>
    </View>
  );
}
