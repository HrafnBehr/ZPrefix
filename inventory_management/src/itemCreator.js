import { useState } from 'react';
import { useAuth } from '../src/Authentication.js';
import { useNavigate } from 'react-router-dom';

const ItemCreation = () => {
  const {auth} = useAuth();
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const navigate = useNavigate();

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

      alert('Item added to the stockpile!')
      setItemName('');
      setDescription('');
      setQuantity('');
      navigate("/yourStore")
    } catch (error) {
      console.error('Error making that item.', error);
      alert('Could not place in stockpile');
    }
  };

  return (
    <div>
      <form onSubmit={addItem}>
        <input type="text" placeholder="Item Name" value={itemName} onChange={e => setItemName(e.target.value)} required /><br />
        <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required /><br />
        <input type="number" placeholder="quantity" value={quantity} onChange={e => setQuantity(e.target.value)} required /><br />
        <button type="submit">Make-New-Item</button>
      </form>
    </div>
  )
}
export default ItemCreation;