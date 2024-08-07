import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Store from '../src/Store.js';
import Login from "../src/LoginPage.js";
import Account from "../src/createAccount.js";
import SingleItem from "../src/singleItem.js";
import YourStore from "../src/yourStore.js";
import ItemCreation from "../src/itemCreator.js";
import {AuthyBoi} from "../src/Authentication.js";



function App() {

  return (
    <AuthyBoi>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/store" element={<Store />}/>
          <Route path="/selected/:itemName" element={<SingleItem/>}/>
          <Route path="/createAccount" element={<Account />}/>
          <Route path="/makeItem" element={<ItemCreation />}/>
          <Route path="/yourStore" element={<YourStore />}/>
        </Routes>
      </Router>
    </AuthyBoi>
  );
}

export default App;
