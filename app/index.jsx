import { Redirect } from "expo-router";

import { useAuthContext } from "../components/AuthContext";
import SignInComponent from "../components/SignIn";

export default function SignInRoute() {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) {
    return <Redirect href="/homee" />;
  }
  return <SignInComponent />;
}
