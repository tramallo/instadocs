import { useEffect, useState } from "react";
import { Button, FlatList, View } from "react-native";

import { supabase } from "../../resources/supabase";
import { styles } from "../../resources/styles";
import DocumentListEntry from "../../components/DocumentListEntry";

export default function Home() {
  const [loadingDocuments, setLoadingDocuments] = useState(false);
  const [documents, setDocuments] = useState([]);

  //fetch documents on initial load
  useEffect(() => {
    const updateDocuments = async () => {
      setLoadingDocuments(true);
      const { data, error } = await supabase
        .from("shipmentOrders")
        .select(
          `id, status, createdBy, createdAt, doneBy, doneAt, shipments ( id, client, priority, payMethod, packages )`
        )
        .order("status", { ascending: true });
      setLoadingDocuments(false);

      if (error) {
        console.log("error fetching documents");
        console.log(error);
      } else {
        setDocuments(data);
      }
    };
    updateDocuments();
  }, []);

  // subscribe to receive new messages in real time
  /*   useEffect(() => {
    const handleInserts = (data) => {
      const newMessage = data.new;
      setSentMessages((sentMessages) => [newMessage, ...sentMessages]);
    };

    const subscription = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        handleInserts
      )
      .subscribe();

    return () => subscription.unsubscribe();
  }, []); */

  // TODO: add loading sign when loading initial documents
  // TODO: add no-data sign when documents is empty
  return (
    <View style={styles.screenContainer}>
      <FlatList
        style={{ width: "100%" }}
        data={documents}
        inverted={true}
        extraData={documents}
        renderItem={({ item }) => (
          <DocumentListEntry key={item.id} document={item} />
        )}
      />
      <Button title="nuevo documento" />
    </View>
  );
}
