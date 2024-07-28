import Signup from './LoginAndSignup/Signup';
import Login from './LoginAndSignup/Login';
import {BrowserRouter,Routes,Route,Router} from "react-router-dom";
import CusSignup  from './LoginAndSignup/CusSignup';
import CreateList from './ListSearch/CreateList';
import FirstPage from './Home/FirstPage'
import Diagnosis from './ListSearch/Diagnosis'
import LandingPage from './Home/Landingpage';
import Post from './Posts/Post';
import PharmaHome from './Pharma/PharmaHome';
import Requests from './Pharma/Requests';
import CusHome from './Home/CusHome';
import Stocks from './Pharma/Stocks';
import Orders from './Pharma/Orders';
import Analysis from './Pharma/Analysis';
import History from './ListSearch/History';

function App() {
  return (
    <BrowserRouter>
    <Routes>
   <Route path="/" element={<LandingPage/>}/>
   <Route path="/login" element={<Login/>}/>
   <Route path="/pharmacist-signup" element={<Signup/>}/>
   <Route path="/customer-signup" element={<CusSignup/>}/>
   <Route path="/home" element={<FirstPage/>}/>
   <Route path="/cus-home" element={<CusHome/>}/>
   <Route path="/list" element={<CreateList/>}/>
   <Route path="/diagnosis" element={<Diagnosis/>}/>
   <Route path="/post" element={<Post/>}/>
   <Route path="/pharmahome" element={<PharmaHome/>}/>
   <Route path="/signout" element={<LandingPage/>}/>
   <Route path="/requests" element={<Requests/>}/>
   <Route path="/stocks" element={<Stocks/>}/>
   <Route path="/orders" element={<Orders/>}/>
   <Route path="/analysis" element={<Analysis/>}/>
   <Route path="/history" element={<History/>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
