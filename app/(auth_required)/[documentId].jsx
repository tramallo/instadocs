import { useGlobalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { useDocumentStorageContext } from "../../components/document/DocumentStorageContext";
import DocumentDetails from "../../components/document/DocumentDetails";
import ShipmentList from "../../components/document/ShipmentList";
import NavigationBar from "../../components/navigation/NavigationBar";

export default function ViewDocumentRoute() {
  const { documentId } = useGlobalSearchParams();
  const { documents } = useDocumentStorageContext();
  const [document, setDocument] = useState();

  const styles = StyleSheet.create({
    container: { height: "100%", width: "100%", padding: "1%" },
    content: {
      height: "95%",
      marginBottom: "1%",
    },
    listContainer: { flex: 1, padding: "1%" },
  });

  useEffect(() => {
    const documentIndex = documents.findIndex((doc) => doc.id == documentId);

    if (documentIndex == -1) {
      console.log(`document (id: ${documentId}) not found`);
      return;
    }

    setDocument(documents[documentIndex]);
  }, [documents]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <DocumentDetails document={document} showId={true} />
        <View style={styles.listContainer}>
          <ShipmentList document={document} />
        </View>
      </View>
      <NavigationBar></NavigationBar>
    </View>
  );
}
