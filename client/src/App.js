import logo from './logo.svg';
import './index.css';
import './stripe.css';
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import {BrowserRouter , Route, Routes } from 'react-router-dom'
import NavbarComponent from './components/Navbar';
import Homescreen from './screens/Homescreen';
import Cartscreen from './screens/CartScreen'
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import Ordersscreen from './screens/Orderscreen';
import Adminscreen from './screens/Adminscreen';
import Footer from './components/Footer';
import EmailVerification from './screens/EmailVerification';
import StripeCheckout from './components/Stripecheckout.js';
import CheckoutForm from './components/CheckoutForm';
import CheckoutSuccess from './components/CheckoutSuccess';
import CheckoutCancelled from './components/CheckoutCancelled';
import AboutScreen from './screens/AboutScreen'

export default function App() {
  return (
    <>
      <div className="content">
       <NavbarComponent/>
       <BrowserRouter>
       <Routes>
          <Route path="/" exact element={<Homescreen />} />
          <Route path="/cart" exact element={<Cartscreen />}/>
          <Route path="/register" exact element={<Registerscreen />}/>
          <Route path='/login' exact element={<Loginscreen />}/>
          <Route path='/orders' exact element={<Ordersscreen />}/>
          <Route path='/admin/*' element={<Adminscreen />}/>
          <Route path='/user/verify' element={<EmailVerification />}/>
          <Route path="/payment" exact element={<CheckoutForm />}/>
          <Route path="/CheckoutSuccess" exact element={<CheckoutSuccess />}/>
          <Route path="/CheckoutCancelled" exact element={<CheckoutCancelled />}/>
          <Route path="/about" exact element={<AboutScreen />}/>
        </Routes>
       </BrowserRouter>
      </div>
      
      <Footer />
    </>
  );
}