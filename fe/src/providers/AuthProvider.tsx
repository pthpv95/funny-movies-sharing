import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { httpClient } from '../api/httpClient';
import { AuthContext } from '../hooks/useAuth';

const AuthProvider = (props: any) => {
  let [authUser, setAuthUser] = useState<
    | {
        email: string;
        accessToken: string;
      }
    | null
  >();
  
  let signIn = async (email: string, password: string) => {
    try {
      let { data } = await httpClient.post('/api/sign-in', { email, password });
      let decodedToken: any = jwt_decode(data.token);
      sessionStorage.setItem('access_token', data.token);
      setAuthUser({ email: decodedToken.email, accessToken: data.token });
    } catch (err: any) {
      let { errors } = await err.json();
      alert(errors[0].message)
    }
  };

  let signOut = () => {
    sessionStorage.clear();
    setAuthUser(null);
  };

  useEffect(() => {
    if(!authUser){
      console.log('refresh token', authUser);
    }
  }, [])

  return (
    <AuthContext.Provider value={{ authUser, signIn, signOut }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
