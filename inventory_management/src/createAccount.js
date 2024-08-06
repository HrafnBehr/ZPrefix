import './App.css';
import { useNavigate } from 'react-router-dom';


export default function Account() {
  const navigate = useNavigate();

  return (
    <div>
      <div class = "accountCreation">
        <p>First Name</p>
          <input type='text' /><br/>
        <p>Last Name</p>
          <input type='text' /><br/>
        <p>Username</p>
          <input type='text' /><br/>
        <p>Password</p>
          <input type='text' /><br/>
        <p>SSN</p>
          <input type='text' minLength="10" maxLength = "10" require /><br/>
        <button className="returnHome" onClick={() => navigate("/")}>Complete-Registration</button><br/>
        <button className="returnHome" onClick={() => navigate("/")}>Leave-Creation</button><br/>
      </div>
    </div>
  )
};