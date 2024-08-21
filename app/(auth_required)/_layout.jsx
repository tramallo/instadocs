import { Redirect, Slot } from "expo-router";

import { useAuthContext } from "../../components/AuthContext";
import DocumentStorageProvider from "../../components/document/DocumentStorageContext";

export default function AuthRequiredLayout() {
  const { isAuthenticated, authenticatedUser } = useAuthContext();

  if (!isAuthenticated) {
    return <Redirect href="/" />;
  }
  return (
    <DocumentStorageProvider>
      <Slot />
    </DocumentStorageProvider>
  );
}
