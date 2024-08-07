import './App.css';
import { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

const baseURL = "http://localhost:5050/store"

export default function Store() {
  const navigate = useNavigate();
  let [store, setStore] = useState([]);

  useEffect(()=>{
    fetch(baseURL)
      .then((res) => res.json())
      .then((data) => {
        setStore(data);
      });
  }, []);

  return (
    <div className="App">
      <button className="return" onClick={() => navigate("/")}>Leave-Store</button><br/>
      <div>
      <h2>Store's Local Inventory</h2>
      </div>
      <div class="available-stock">
        {store.length > 0 ? (
          <ul>
            {store.map(item => (
              <li key={item.id}>{item.itemName} - {item.description} (Quantity: {item.quantity})</li>
            ))}
          </ul>
        ):(
          <p>No Items currently available.</p>
        )}
      </div>
    </div>
  );
}

