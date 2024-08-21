import { View, StyleSheet, FlatList } from "react-native";

import ShipmentListEntry from "./ShipmentListEntry";
import SimpleButton from "../SimpleButton";

export default function ShipmentList({ document, actionCallback }) {
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
    },
    actionButton: {
      backgroundColor: "red",
      flex: 0.4,
      alignItems: "center",
      borderRadius: 5,
    },
  });

  const listHeader = {
    client: "CLIENT",
    packages: "PACKAGES",
    payMethod: "PAY METHOD",
    priority: "PRIORITY",
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <ShipmentListEntry
            shipment={listHeader}
            extraComponent={
              actionCallback && <SimpleButton style={styles.actionButton} />
            }
          />
        }
        data={document?.shipments || []}
        extraData={document?.shipments || []}
        renderItem={({ item, index }) => (
          <ShipmentListEntry
            key={item.id}
            shipment={item}
            extraComponent={
              actionCallback && (
                <SimpleButton
                  style={styles.actionButton}
                  onPress={() => actionCallback(item, index)}
                  text="-"
                />
              )
            }
          />
        )}
      />
    </View>
  );
}
