import {useEffect, Suspense, lazy} from 'react'
import './App.css';
import{Routes, Route} from 'react-router-dom';
import UserProvider from './components/userContext.jsx';
import Header from './components/header.jsx';
import Loading from './components/svgs/loading.jsx';
const Home = lazy(() => import('./pages/home.jsx'));
const ContactUs = lazy(() => import('./pages/contactUs.jsx'));
const Login = lazy(() => import('./pages/login.jsx'));
const Signup = lazy(() => import('./pages/signup.jsx'));
const SellerDashboard = lazy(() => import('./pages/sellerDashboard.jsx'));
const BecomeSeller = lazy(() => import('./pages/becomeSeller.jsx'));
const Checkout = lazy(() => import('./pages/checkout.jsx'));
const Products = lazy(() => import('./pages/products.jsx'));
const SingleProduct = lazy(() => import('./pages/singleProduct.jsx'));
const Test = lazy(() => import('./pages/testPageCatagoryadd.jsx'));


function App() {
    useEffect(()=>{
        const root=document.getElementById('root');
        root.classList.add('touch:w-full')
    })
  return (
      <>
      
    <div id='app' className="App w-full green-gradient-x min-h-screen text-black flex flex-col">
            <UserProvider>
                <Header/>
                <Suspense fallback={<div className="fixed w-screen h-screen flex justify-center items-center"><Loading className='w-1/2 aspect-square'/></div>}>
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
                </Suspense>
            </UserProvider>
    </div>
      </>
  );
}

export default App;
