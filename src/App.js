import Signup from './LoginAndSignup/Signup';
import Login from './LoginAndSignup/Login';
import {BrowserRouter,Routes,Route,Router} from "react-router-dom";
import CusSignup  from './LoginAndSignup/CusSignup';
import CreateList from './ListSearch/CreateList';
import FirstPage from './Home/FirstPage'
function App() {
  return (
    <BrowserRouter>
    <Routes>
   <Route path="/" element={<Login/>}/>
   <Route path="/login" element={<Login/>}/>
   <Route path="/pharmacist-signup" element={<Signup/>}/>
   <Route path="/customer-signup" element={<CusSignup/>}/>
   <Route path="/home" element={<FirstPage/>}/>
   <Route path="/list" element={<CreateList/>}/>
   
   </Routes>
   </BrowserRouter>
  );
}

export default App;
