import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { httpClient } from '../api/httpClient';
import { AuthContext } from '../hooks/useAuth';

let getAuthUser = () => {
  try {
    let decodedToken: any = jwt_decode(
      sessionStorage.getItem('access_token') || ''
    );
    return { email: decodedToken.email };
  } catch (error) {
    return null;
  }
};

const AuthProvider = (props: any) => {
  let [authUser, setAuthUser] = useState<{
    email: string;
  } | null>(getAuthUser());

  let signIn = async (email: string, password: string) => {
    try {
      let { data } = await httpClient.post('/api/sign-in', { email, password });
      let decodedToken: any = jwt_decode(data.token);
      sessionStorage.setItem('access_token', data.token);
      setAuthUser({ email: decodedToken.email });
    } catch (err: any) {
      let { errors } = await err.json();
      alert(errors[0].message);
    }
  };

  let signOut = () => {
    sessionStorage.clear();
    setAuthUser(null);
  };

  return (
    <AuthContext.Provider value={{ authUser, signIn, signOut }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
