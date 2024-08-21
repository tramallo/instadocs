import { createContext, useContext, useState, useEffect } from "react";

import { supabase } from "../../resources/supabase";

const DocumentStorageContext = createContext({
  isLoadingDocuments: false,
  documents: [],
  loadDocumentsError: undefined,
  createDocument: (data) => undefined,
});
export const useDocumentStorageContext = () =>
  useContext(DocumentStorageContext);

export default function DocumentStorageProvider({ children }) {
  const [isLoadingDocuments, setLoadingDocuments] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [loadDocumentsError, setLoadError] = useState(undefined);

  const createDocument = async (newDocument) => {
    return await supabase.from("shipmentOrder").insert(newDocument);
  };

  //fetch documents on initial load
  useEffect(() => {
    const updateDocuments = async () => {
      setLoadError(undefined);
      setLoadingDocuments(true);
      setDocuments([]);

      const { data, error } = await supabase
        .from("shipmentOrder")
        .select(`id, status, createdBy, createdAt, doneBy, doneAt, shipments`)
        .order("createdAt", { ascending: false });

      if (error) {
        setLoadError(error);
      } else {
        setDocuments(data);
      }
      setLoadingDocuments(false);
    };

    updateDocuments();
  }, []);

  //subscribe to receive new documents in real time
  useEffect(() => {
    const handleNewDocument = (data) => {
      const newShipmentOrder = data.new;
      setDocuments((documents) => [newShipmentOrder, ...documents]);
    };

    const subscription = supabase
      .channel("shipmentOrder")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "shipmentOrder",
        },
        handleNewDocument
      )
      .subscribe();

    return () => subscription.unsubscribe();
  }, []);

  return (
    <DocumentStorageContext.Provider
      value={{
        isLoadingDocuments,
        documents,
        loadDocumentsError,
        createDocument,
      }}
    >
      {children}
    </DocumentStorageContext.Provider>
  );
}
