import './App.css';
import { useAuth } from '../src/Authentication.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function YourStore(){
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const {auth} = useAuth();
  const navigate = useNavigate();

  if(!auth.user){
    return <p>Trouble finding that user...</p>
  }

  const addItem = async (e) => {
    e.preventDefault();
    const itemToBeMade = {itemName, description, quantity}
    try {
      const response = await fetch('http://localhost:5050/addItem', {
        method:'POST',
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : `Bearer ${auth.token}`
        },
        body: JSON.stringify(itemToBeMade)
      });

      if(!response.ok){
        throw new Error('failed to add to stockpile');
      }

      const result = await response.json();
      alert('Item added to the stockpile!')
      setItemName('');
      setDescription('');
      setQuantity('');
    } catch (error) {
      console.error('Error making that item.', error);
      alert('Could not place in stockpile');
    }
  }

  return (
    <div>
      <h2> Welcome, {auth.user.username}!</h2>
      <p> These are your options!</p>
      <form onSubmit={addItem}>
        <input type="text" placeholder="Item Name" value={itemName} onChange={e => setItemName(e.target.value)} required /><br />
        <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required /><br />
        <input type="number" placeholder="quantity" value={quantity} onChange={e => setQuantity(e.target.value)} required /><br />
        <button type="submit">Make-New-Item</button>
      </form>
      <button className="return" onClick={() => navigate("/")}>Leave-Store</button>
    </div>
  )
}