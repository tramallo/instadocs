import { Text, View } from "react-native";

import { styles } from "../resources/styles";

export default function MessageCard({ sentBy, content, sentAt }) {
  return (
    <View style={styles.messageCard}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 10 }}>{sentBy}</Text>
        <Text style={{ fontSize: 10 }}>{sentAt}</Text>
      </View>
      <Text>{content}</Text>
    </View>
  );
}
