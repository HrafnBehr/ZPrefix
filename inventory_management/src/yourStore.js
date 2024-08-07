import './App.css';
import { useAuth } from '../src/Authentication.js';
import { useNavigate } from 'react-router-dom';

export default function YourStore(){
  const {auth} = useAuth();
  const navigate = useNavigate();

  if(!auth.user){
    return <p>Trouble finding that user...</p>
  }

  return (
    <div>
      <h2> Welcome, {auth.user.username}!</h2>
      <p> These are your options!</p>
      <button className="return" onClick={() => navigate("/")}>Leave-Store</button>
    </div>
  )
}