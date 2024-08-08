import { useAuth } from '../src/Authentication.js';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditItem = () => {
  const {itemID} = useParams();
  console.log(itemID);
  const {auth} = useAuth();
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();

  useEffect(()=> {
    const fetchItemDetails = async ()=>{
      try{
        const response = await fetch(`http://localhost:5050/Store/${itemID}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${auth.token}`
          }
        });

        if(!response.ok){
          throw new Error('failed to add to stockpile');
        }

        const itemDetails = await response.json();
        setItemName(itemDetails.itemName);
        setDescription(itemDetails.description);
        setQuantity(itemDetails.quantity);
      }catch(error){
        console.error('Error grabbing that items details.', error);
        alert('Could not get details');
      }
    };

  if(auth.token){
    fetchItemDetails();
  }
  }, [auth.token,itemID]);

  const editBoi = async (e) => {
    e.preventDefault();
    const updateItem = {itemName, description, quantity};

    try{
      const response = await fetch(`http://localhost:5050/Store/${itemID}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`
        },
        body: JSON.stringify(updateItem)
      });

      if(!response.ok) {
        throw new Error('Item could not be updated');
      }

      alert('Item updated!');
      navigate('/yourStore');
    } catch (error) {
      console.error('Error changing that items details.', error);
      alert('Could not change details');
    }
  };

  return (
    <div>
      <form onSubmit={editBoi}>
        <input type="text" placeholder="Item Name" value={itemName} onChange={e => setItemName(e.target.value)} required /><br />
        <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required /><br />
        <input type="number" placeholder="quantity" value={quantity} onChange={e => setQuantity(e.target.value)} required /><br />
        <button type="submit">Update-Item</button>
        <button className="return" onClick={() => navigate("/yourStore")}>Cancel-Edit</button>
      </form>
    </div>
  )
}

export default EditItem;