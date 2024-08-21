import { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

import SimpleButton from "../SimpleButton";

export default function ShipmentCreate({ newShipmentCallback, readOnly }) {
  const [newShipmentClient, setNewShipmentClient] = useState();
  const [newShipmentPackages, setNewShipmentPackages] = useState();
  const [newShipmentPayMethod, setNewShipmentPayMethod] = useState();
  const [newShipmentPriority, setNewShipmentPriority] = useState();

  // TODO: web sizing wrong when shrinking page
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      width: "100%",
      borderRadius: 5,
      borderWidth: 1,
      backgroundColor: "blue",
    },
    inputEntry: {
      borderRadius: 5,
      flex: 1,
      textAlign: "center",
      margin: "1%",
      backgroundColor: readOnly ? "grey" : "white",
    },
    createShipmentButton: {
      backgroundColor: readOnly ? "grey" : "green",
      borderRadius: 5,
      flex: 0.4,
      justifyContent: "center",
      alignItems: "center",
      margin: "1%",
    },
  });

  const clearInputs = () => {
    setNewShipmentClient("");
    setNewShipmentPackages("");
    setNewShipmentPayMethod("");
    setNewShipmentPriority("");
  };

  const createShipment = () => {
    //TODO: add input data validation
    if (
      !newShipmentClient ||
      !newShipmentPackages ||
      !newShipmentPayMethod ||
      !newShipmentPriority
    ) {
      console.log("new shipment data invalid");
      return;
    }

    const newShipment = {
      client: newShipmentClient,
      packages: newShipmentPackages,
      payMethod: newShipmentPayMethod,
      priority: newShipmentPriority,
    };

    newShipmentCallback(newShipment);
    clearInputs();
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={newShipmentClient}
        onChangeText={setNewShipmentClient}
        style={styles.inputEntry}
        readOnly={readOnly}
      />
      <TextInput
        value={newShipmentPackages}
        onChangeText={setNewShipmentPackages}
        style={styles.inputEntry}
        keyboardType="numeric"
        readOnly={readOnly}
      />
      <TextInput
        value={newShipmentPayMethod}
        onChangeText={setNewShipmentPayMethod}
        style={styles.inputEntry}
        readOnly={readOnly}
      />
      <TextInput
        value={newShipmentPriority}
        onChangeText={setNewShipmentPriority}
        style={styles.inputEntry}
        keyboardType="numeric"
        readOnly={readOnly}
      />
      <SimpleButton
        style={styles.createShipmentButton}
        onPress={createShipment}
        text="+"
        disabled={readOnly}
      />
    </View>
  );
}
