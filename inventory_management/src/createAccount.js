import './App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Account() {
  let [fname, setFname] = useState('');
  let [lname, setLname] = useState('');
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');



  const navigate = useNavigate();
  const startVerifier = async (e) => {
    e.preventDefault();
    const passer = await Verifier(fname, lname, username, password);
    handleResponse(passer)
  };

  const handleResponse = () => {
    navigate("/");
  }

  return (
    <div className = "Form">
      <div class = "accountCreation">
        <p>First Name</p>
          <input type= "text" minLength= "1" maxLength= "25" placeholder= " " value={fname} onChange={(e) => setFname(e.target.value)} required/><br/>
        <p>Last Name</p>
          <input type= "text" minLength= "1" maxLength= "25" placeholder= " " value={lname} onChange={(e) => setLname(e.target.value)} required/><br/>
        <p>Username</p>
          <input type= 'text' minLength= "1" maxLength= "25" placeholder= " " value={username} onChange={(e) => setUsername(e.target.value)} required /><br/>
        <p>Password</p>
          <input type= "password" minLength= "8" maxLength= "16" placeholder= " " value={password} onChange={(e) => setPassword(e.target.value)} required/><br/>
        <p>SSN</p>
          <input type='text'/><br/>
        <button className="returnHome" onClick={(e) => startVerifier(e)}>Complete-Registration</button><br/>
        <button className="returnHome" onClick={() => navigate("/")}>Leave-Creation</button><br/>
      </div>
    </div>
  )
};

async function Verifier(fname, lname, username, password){
  try {
    const response = await fetch('http://localhost:5050/createAccount', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        fname: fname, lname: lname, username: username, password: password
      }),
    });

    if(!response.ok) {
      throw new Error('Failure to register, giving the boot');
    }

    const data = await response.json();
    console.log(data);
    console.log('Registered, welcome to the Red Dragon')
    return true;

  } catch (error) {
    console.error('Error during registration:', error);
    return false;

  }
}
