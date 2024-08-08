import './App.css';
import { useAuth } from '../src/Authentication.js';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function YourStore(){
  const [items, setItems] = useState([]);
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

        console.error('Error getting your items', error);
      }
    };
    if(auth.user){
      fetchItems();
    }
  },  [auth.user, auth.token]);

  const deleteItem = async (itemID) => {

    try{
      const response = await fetch(`http://localhost:5050/selected/${itemID}`, {
        method:'DELETE',
        headers:{
          'Authorization': `Bearer ${auth.token}`
        }
      });

      if(!response.ok) throw new Error('Could not be removed');

      alert('Item removed!');
      setItems(prevItems => prevItems.filter(item  => item.id !== itemID));

    } catch (error) {

      console.error('Could not remove item', error);
      alert('Could not remove item!')
    }
  }


  if(!auth.user){
    return <p>Trouble finding that user...</p>
  }

  return (
    <div>
      <h2> Welcome, {auth.user.username}!</h2>
      <p>These are your items!</p>
      <div className="available-stock">
        {items.length > 0 ? (
          <ul>
            {items.map(item => (
              <li key={item.id}>
                <Link to={`/selected/${encodeURIComponent(item.itemName)}`}>
                  {item.itemName} - {item.description} (Quantity: {item.quantity})
                </Link>
                <button onClick={()=> deleteItem(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No Items currently available.</p>
        )}
      </div>
      <p> These are your options!</p>
      <button className="return" onClick={() => navigate("/makeItem")}>Make-Item</button>
      <button className="return" onClick={() => navigate("/")}>Leave-Store</button>
    </div>
  );
}