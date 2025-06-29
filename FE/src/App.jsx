import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route} from 'react-router'
import ListOfOrchids from './components/ListOfOrchids';
import EditOrchid from './components/EditOrchid';
import HomeScreen from './components/HomeScreen';
import NavBar from './components/NavBar';
import ListOfEmployees from './components/ListOfEmployees';
import DetailOrchid from './components/DetailOrchid';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import OrchidsPage from './components/Orchids';
import ForgetPassword from './components/ForgetPassword';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import './App.css';
function App() {
 
  return (
    <>
    <NavBar/>
    <Routes>
      <Route path='/manageOrchids' element={<ListOfOrchids/>}/>
      <Route path='/' element={<HomeScreen/>}/>
      <Route path='/manageUsers' element={<ListOfEmployees/>}/>
      <Route path='/detail/:id' element={<DetailOrchid/>}/>
      <Route path='/edit/:id' element={<EditOrchid/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/orchids' element={<OrchidsPage/>}/>
      <Route path='/forgot-password' element={<ForgetPassword/>}/>
      <Route path='/cart' element={<CartPage/>}/>
      <Route path='/checkout' element={<CheckoutPage/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App