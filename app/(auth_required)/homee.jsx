import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

import { supabase } from "../../resources/supabase";
import { styles } from "../../resources/styles";
import DocumentListEntry from "../../components/DocumentListEntry";

export default function Home() {
  const [loadingDocuments, setLoadingDocuments] = useState(false);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const updateSentMessages = async () => {
      setLoadingDocuments(true);
      const { data, error } = await supabase
        .from("shipmentOrders")
        .select(
          `id, createdBy, createdAt, shipments ( id, status, priority, payMethod, packages, doneBy, doneAt, client )`
        );
      setLoadingDocuments(false);

      if (error) {
        console.log("error fetching documents");
        console.log(error);
      } else {
        console.log(data);
        setDocuments(data);
      }
    };
    updateSentMessages();
  }, []);

  return (
    <View style={styles.screenContainer}>
      <FlatList
        //style={styles.messagesList}
        data={documents}
        inverted={true}
        extraData={documents}
        renderItem={({ item }) => (
          <DocumentListEntry key={item.id} document={item} />
        )}
      />
    </View>
  );
}
