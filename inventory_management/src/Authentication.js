import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext= createContext();

export function AuthyBoi({children}){
  const [auth, setAuth] = useState({ token:null, user:null});

  useEffect(()=>{
    const token  = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    if (token && username) {
      setAuth({ token, user:{username}});
    }
  }, []);

    const login = (token, user) => {

      localStorage.setItem('token', token)
      localStorage.setItem('username', user.username)

      setAuth({ token, user});
    };

    const logout = () => {

      localStorage.removeItem('token');
      localStorage.removeItem('username');

      setAuth({ token:null, user:null});
    };

    return (
      <AuthContext.Provider value={{auth, login, logout}}>
        {children}
      </AuthContext.Provider>
    );
}

export function useAuth(){
  return useContext(AuthContext);
}