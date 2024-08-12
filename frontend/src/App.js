import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import AboutUs from './pages/AboutUs/AboutUs';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import Products from './pages/Products/Products';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import LoginSignUp from './pages/Login/LoginSignUp';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './store/userSlice';
import Account from './pages/Account/Account';
import ProtectedRoutes from './utils/ProtectedRoutes';
import SignUp from './pages/Login/SignUp';
import Update from './pages/Account/Update';
import UpdatePassword from './pages/Account/UpdatePassword';
import ForgotPassword from './pages/Account/Forgot';
import ResetPassword from './pages/Account/ResetPassword';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Cart/Checkout';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import Success from './pages/Cart/CheckOutComponent/Success';



function App() {
  const dispatch = useDispatch()

  const { isAuthenticated } = useSelector(state => state.user)

  const [stripePublishableKey, setStripeAPIKey] = useState('')

  const getStripeAPIKey = async () => {
    const { data } = await axios.get('http://localhost:8000/api/v1/payment/getStripePublishableKey', { withCredentials: true })

    if (data) {

      setStripeAPIKey(data.stripePublishableKey)

    }
  }

  useEffect(() => {
    dispatch(loadUser());

    if (isAuthenticated) {
      getStripeAPIKey()
    }

  }, [isAuthenticated]);
  return (
    <div className='main_app'>
      <Toaster />

      <Header />
      <main className='main'>
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/products' element={<Products />} />
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route path='/login' element={< LoginSignUp />} />
          <Route path='/cart' element={< Cart />} />

          <Route element={<ProtectedRoutes />}>

            <Route path='/account' element={< Account />} />
            <Route path='/me/update' element={< Update />} />
            <Route path='/password/update' element={<UpdatePassword />} />
            <Route path='/checkout' element={stripePublishableKey && <Checkout stripePublishableKey={stripePublishableKey} />} />
            <Route path='/success' element={<Success />} />
          </Route>
          {/* protected checkout later do it */}

          <Route path='/password/forgot' element={<ForgotPassword />} />
          <Route path="/user/password/reset/:token" element={<ResetPassword />} />


        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
