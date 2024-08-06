import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import AboutUs from './pages/AboutUs/AboutUs';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import Products from './pages/Products/Products';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import LoginSignUp from './pages/Login/LoginSignUp';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser } from './store/userSlice';
import Account from './pages/Account/Account';


function App() {
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <div className='main_app'>
      <Header />
      <main className='main'>
        <Routes>
          <Route index path='/' element={<Home />}></Route>
          <Route path='/about' element={<AboutUs />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/products' element={<Products />}></Route>
          <Route path='/product/:id' element={<ProductDetails />}></Route>
          <Route path='/login' element={< LoginSignUp />}></Route>
          <Route path='/account' element={< Account />}></Route>

        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
