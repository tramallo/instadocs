import { View, Text, StyleSheet } from "react-native";

export default function ShipmentListEntry({ shipment, extraComponent }) {
  const styles = StyleSheet.create({
    container: {
      padding: "1%",
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: 5,
      marginBottom: "1%",
      backgroundColor: "orange",
    },
    textStyle: { flex: 1, textAlign: "center" },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{shipment.client}</Text>
      <Text style={styles.textStyle}>{shipment.packages}</Text>
      <Text style={styles.textStyle}>{shipment.payMethod}</Text>
      <Text style={styles.textStyle}>{shipment.priority}</Text>
      {extraComponent ?? undefined}
    </View>
  );
}
