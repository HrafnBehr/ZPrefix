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
      <button className="returnHome" onClick={() => navigate("/")}>Leave-Store</button><br/>
      {JSON.stringify(store)}
    </div>
  );
}

