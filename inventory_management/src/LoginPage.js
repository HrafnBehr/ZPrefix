import './App.css';
import { useState } from 'react';
import { useAuth } from '../src/Authentication.js'
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const [username, setUsername] =  useState('')
  const [password, setPassword] =  useState('')
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async(e) => {
    e.preventDefault();

    try{
      const response = await fetch('http://localhost:5050/login', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json' },
        body:JSON.stringify({username, password}),
      });

      if (!response.ok){
        throw new Error('Invalid login credentials');
      }

      const data = await response.json();
      login(data.token, { username: data.username });
      navigate('/yourStore');
    } catch (error){
      console.error('trouble logging you in')
    }
  }

  return (
    <div className = "Form">
      <div className = "loginMenu">
        <form  onSubmit={handleLogin}>
          <p>Username</p>
            <input type='text' value={username} onChange={(e)=>setUsername(e.target.value)} required /><br/>
          <p>Password</p>
            <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} required /><br/>
          <button className="login" onClick={(e) => handleLogin(e)}>Login</button>
        </form>
        <button className="createAccount" onClick={() => navigate("/createAccount")}>Create-Account</button><br/>
        <p>Proceed without logging in</p>
        <button className="guestStore" onClick={() => navigate("/store")}>Guest-Store</button>
      </div>
    </div>
  )
};