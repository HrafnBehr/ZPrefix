import './App.css';
import { useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function SingleItem(){
  const navigate= useNavigate();
  const {itemName} = useParams();
  const [individual, setIndividual] = useState(null)

  useEffect(()=>{
    fetch(`http://localhost:5050/store?search=${itemName}`)
      .then((res) => {
        if(!res.ok){
          throw new Error('Failure to retrieve item');
        }
        return res.json();
      })
      .then(data => {
        setIndividual(data[0]); // Assuming the first item is what you want
      })
      .catch(error => {
        console.error('Error fetching item details:', error);
      });
  }, [itemName]);

  if(!individual){
    return <p>Getting those details for you...</p>
  }

  return (
    <div>
      <button className="return" onClick={() => navigate("/Store")}>Return</button>
      <button className="return" onClick={() => navigate("/yourStore")}>Your Section</button><br/><br/>
      <p>Details</p>
        <div className="details">
          <div>
            <ul>
              <li>Name: {individual.itemName}</li>
              <li>Description: {individual.description}</li>
              <li>Quantity: {individual.quantity}</li>
            </ul>
          </div>
        </div>
    </div>
  )
}