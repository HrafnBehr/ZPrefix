import './App.css';
import { useEffect, useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';

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

  return  (
    <div className="Form">
      <button className="return" onClick={() => navigate("/")}>Leave Store</button>
      <h2>Store's Local Inventory</h2>
      <div className="available-stock">
        {store.length > 0 ? (
          <ul>
            {store.map(item => (
              <li key={item.id}>
                <Link to={`/selected/${encodeURIComponent(item.itemName)}`}>
                  {item.itemName} - {item.description} (Quantity: {item.quantity})
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No Items currently available.</p>
        )}
      </div>
    </div>
  );
}

