import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "expo-router";

import { useDocumentStorageContext } from "../../components/document/DocumentStorageContext";
import { useAuthContext } from "../../components/AuthContext";
import DocumentDetails from "../../components/document/DocumentDetails";
import ShipmentList from "../../components/document/ShipmentList";
import ShipmentCreate from "../../components/document/ShipmentCreate";
import NavigationBar from "../../components/navigation/NavigationBar";
import SimpleButton from "../../components/SimpleButton";

export default function CreateDocumentRoute() {
  const navigation = useNavigation();
  const { authenticatedUser } = useAuthContext();
  const { createDocument } = useDocumentStorageContext();
  const [document, setDocument] = useState();
  const [creatingDocument, setCreatingDocument] = useState(false);

  const styles = StyleSheet.create({
    container: {
      padding: "1%",
      height: "100%",
      width: "100%",
    },
    content: { height: "95%", marginBottom: "1%" },
    listContainer: { flex: 1, padding: "1%" },
    confirmButton: {
      borderWidth: 1,
      borderRadius: 5,
      padding: "1%",
      height: "100%",
      justifyContent: "center",
      backgroundColor: "cyan",
    },
  });

  const addShipment = (newShipment) => {
    const documentCopy = { ...document };
    document.shipments.push(newShipment);

    setDocument(documentCopy);
  };
  const removeShipment = (shipment, shipmentIndex) => {
    const documentCopy = { ...document };
    documentCopy.shipments.splice(shipmentIndex, 1);

    setDocument(documentCopy);
  };

  const create = async () => {
    setCreatingDocument(true);
    const { error, data } = await createDocument(document);
    setCreatingDocument(false);
    if (error) {
      //TODO: error when creating document
      console.log(error);
      return;
    }

    navigation.goBack();
  };

  //initialize document
  useEffect(() => {
    const newDocument = {
      status: "pending",
      createdBy: authenticatedUser.email,
      createdAt: new Date().toISOString(),
      shipments: [],
    };

    setDocument(newDocument);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <DocumentDetails document={document} showId={false} />
        <View style={styles.listContainer}>
          <ShipmentList document={document} actionCallback={removeShipment} />
        </View>
        <ShipmentCreate
          newShipmentCallback={addShipment}
          readOnly={creatingDocument}
        />
      </View>

      <NavigationBar>
        <SimpleButton
          style={styles.confirmButton}
          onPress={create}
          text="Confirm"
          working={creatingDocument}
        />
      </NavigationBar>
    </View>
  );
}
