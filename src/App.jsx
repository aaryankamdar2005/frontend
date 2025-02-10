import { useState } from 'react'
import{Routes,Route} from 'react-router-dom';
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Create from './pages/Create'
import Hero from './components/Hero'
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Screening from './pages/Screening';

function App() {
  

  return (
    <>

      <Navbar/>
      <Routes>
        <Route path='/create' element={<Create/>}>
         </Route>
         <Route path='/' element={<Home/>}>
         </Route>
         <Route path='/login' element={<Login/>}>
         </Route>
         <Route path='/screen' element={<Screening/>}>
         </Route>
      </Routes>
    <Footer/>
    </>
  )
}

export default App
