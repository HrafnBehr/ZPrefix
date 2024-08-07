import './App.css';
import { useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function SingleItem(){
  const navigate= useNavigate();
  const {itemName} = useParams();

  const [individual, setIndividual] = useState([])

  useEffect(()=>{
    fetch(`http://localhost:5050/store?search=${{itemName}}`)
      .then((res) => res.json())
      .then((data) => {
        setIndividual(data)
      });
  }, []);

  return (
    <div>
      <button className="return" onClick={() => navigate("/")}>Leave-Store</button><br/>
      <p>Details</p>
        <div className="details">
          {individual.map(detailData =>(
            <div>
              <ul>
                <p>{detailData}</p>
              </ul>
            </div>
          ))}
        </div>
    </div>
  )


}