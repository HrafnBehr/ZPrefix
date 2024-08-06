import './App.css';
import { useEffect, useState} from 'react';
const baseURL = "http://localhost:5050/store"

function App() {
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
      {JSON.stringify(store)}
    </div>
  );
}

export default App;
