import { createContext, useState, useEffect, useContext } from "react";

import { supabase } from "../resources/supabase";

const AuthContext = createContext({
  isAuthenticated: false,
  authenticatedUser: null,
});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  // update local state when auth session state changes
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event == "SIGNED_IN") {
        setIsAuthenticated(!!session);
        setAuthenticatedUser(session?.user || null);

        console.log(`Signed in: ${JSON.stringify(session)}`);
      }

      if (event == "SIGNED_OUT") {
        setIsAuthenticated(false);
        setAuthenticatedUser(null);

        console.log(`Signed out: ${JSON.stringify(session)}`);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, authenticatedUser }}>
      {children}
    </AuthContext.Provider>
  );
}
