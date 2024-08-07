import { Navigate } from 'react-router-dom';
import { useAuth } from '../src/Authentication';

export default function Protector({children}) {
  const {auth} = useAuth();

  if(!auth.token){
    return <Navigate to="/" />;
  }

  return children;
}