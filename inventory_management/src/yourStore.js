import './App.css';
import { useAuth } from '../src/Authentication.js';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function YourStore(){
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const {auth} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      if(!auth.token) return;

      try {
        const response = await fetch('http://localhost:5050/userItems', {
          method: 'GET',
          headers: {
            'Authorization':`Bearer ${auth.token}`
          }
        });

        if(!response.ok){
          throw new Error('Could not find your items');
        }

        const fetchedItems = await response.json();
        setItems(fetchedItems);
      }catch (error){
        console.error('Error getting your items');
      }
    };
    if(auth.user){
      fetchItems();
    }
  },  [auth.user, auth.token]);


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
      console.log(result);

      setItems(prevItems=>[...prevItems,  result]);
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
      <p>These are your items!</p>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.itemName} - {item.description} (Quantity: {item.quantity})</li>
        ))}
      </ul>
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