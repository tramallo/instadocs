import { FlatList, StyleSheet } from "react-native";

import DocumentListEntry from "./DocumentListEntry";
import { useDocumentStorageContext } from "./DocumentStorageContext";

export default function DocumentList() {
  const { documents } = useDocumentStorageContext();

  const styles = StyleSheet.create({
    list: {
      width: "100%",
      marginTop: "1%",
      padding: "1%",
    },
  });

  // TODO: add error fetching data sign when loading documents fails
  // TODO: add loading sign when loading initial documents
  // TODO: add no-data sign when documents is empty
  return (
    <FlatList
      style={styles.list}
      data={documents}
      inverted={true}
      extraData={documents}
      renderItem={({ item }) => (
        <DocumentListEntry key={item.id} document={item} />
      )}
    />
  );
}
