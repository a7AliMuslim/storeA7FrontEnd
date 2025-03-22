import {useEffect} from 'react'
import './App.css';
import{Routes, Route} from 'react-router-dom';
import UserProvider from './components/userContext.jsx';
import Header from './components/header.jsx';
import Home from './pages/home.jsx';
import ContactUs from './pages/contactUs.jsx';
import Login from './pages/login.jsx';
import Signup from './pages/signup.jsx';
import SellerDashboard from './pages/sellerDashboard.jsx';
import BecomeSeller from './pages/becomeSeller.jsx';
import Checkout from './pages/checkout.jsx';
import Products from './pages/products.jsx';
import SingleProduct from './pages/singleProduct.jsx';
import Test from './pages/testPageCatagoryadd.jsx';



function App() {
    useEffect(()=>{
        const root=document.getElementById('root');
        root.classList.add('touch:w-full')
    })
  return (
      <>
      
    <div id='app' className="App w-full bg-gradient-to-r from-dark to-light-dark min-h-screen text-black flex flex-col">
            <UserProvider>
                <Header/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/contact' element={<ContactUs/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/signup' element={<Signup/>}/>
                    <Route path='/seller' element={<SellerDashboard/>}/>
                    <Route path='/becomeSeller' element={<BecomeSeller/>}/>
                    <Route path='/checkout' element={<Checkout/>}/>
                    <Route path='/products' element={<Products/>}/>
                    <Route path='/singleProduct' element={<SingleProduct/>}/>
                    <Route path='/test' element={<Test/>}/>
                </Routes>
            </UserProvider>
    </div>
      </>
  );
}

export default App;
