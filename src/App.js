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
import AddMedicineForm from './Pharma/AddMedicineForm';
import NewCusHome from './Home/NewCusHome'
import PharmacySignup from './LoginAndSignup/Signup';
import PharmacyFinder from './ListSearch/PharmacyFinder';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pharmacist-signup" element={<Signup />} />
        <Route path="/customer-signup" element={<CusSignup />} />
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <FirstPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/cus-home" 
          element={
            <ProtectedRoute>
              <NewCusHome />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/list" 
          element={
            <ProtectedRoute>
              <CreateList />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/diagnosis" 
          element={
            <ProtectedRoute>
              <Diagnosis />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/post" 
          element={
            <ProtectedRoute>
              <Post />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/pharmahome" 
          element={
            <ProtectedRoute>
              <PharmaHome />
            </ProtectedRoute>
          } 
        />
        <Route path="/signout" element={<LandingPage />} />
        <Route 
          path="/requests" 
          element={
            <ProtectedRoute>
              <Requests />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/stocks" 
          element={
            <ProtectedRoute>
              <Stocks />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/orders" 
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/analysis" 
          element={
            <ProtectedRoute>
              <Analysis />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/history" 
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/addmed" 
          element={
            <ProtectedRoute>
              <AddMedicineForm />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/pharma" 
          element={
            <ProtectedRoute>
              <PharmacyFinder />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
