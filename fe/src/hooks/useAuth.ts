import React, { useContext } from "react";

export let AuthContext = React.createContext<
  {
    authUser: any,
    signIn: (email: string, password: string) => Promise<void>,
    signOut: () => void
  }>({
    authUser: null,
    signIn: async (email: string, password: string) => { },
    signOut: () => { },
  });

let useAuth = () => useContext(AuthContext)

export default useAuth;