import './App.css';
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const navigate = useNavigate();

  return (
    <div>
      <div class = "loginMenu">
        <p>Username</p>
          <input type='text' /><br/>
        <p>Password</p>
          <input type='text' /><br/>
        <button className="login" onClick={() => navigate("/store")}>Login</button>
        <button className="createAccount" onClick={() => navigate("/createAccount")}>Create-Account</button><br/>
        <p>Proceed without logging in</p>
        <button className="guestStore" onClick={() => navigate("/store")}>Guest-Store</button>
      </div>
    </div>
  )
};