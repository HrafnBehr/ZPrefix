import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Store from '../src/Store.js';
import Login from "../src/LoginPage.js";
import Account from "../src/createAccount.js";



function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/store" element={<Store />}/>
        <Route path="/createAccount" element={<Account />}/>
        {/* <Route path="/yourStore" element={<yourStore />}/> */}
      </Routes>
    </Router>
  );
}

export default App;
