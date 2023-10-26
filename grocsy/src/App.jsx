import { useState, useEffect, useCallback } from 'react'
import { useNavigate, Navigate, useLocation } from 'react-router-dom'
import './App.scss'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import SellerDashboard from './pages/SellerDashboard/SellerDashboard'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Cart from './pages/Cart/Cart'
import Addresses from './pages/Addresses/Addresses'
import Orders from './pages/Orders/Orders'
import Item from './pages/Item/Item'

function App() {
  return (
    <>
      <main>
        <div className='navbar'>
          <Navbar />
        </div>

        <div className='hero'>
          <div className='hero-content'>
            <Routes>
              <Route path="/" Component={Home} />
              <Route path="/login" Component={Login} />
              <Route path="/signup" Component={Signup} />
              {/* <Route path="*" Component={Login} /> */}
              <Route path="/cart" Component={Cart} />
              <Route path='/orders' Component={Orders} />
              <Route path="/seller-dashboard" Component={SellerDashboard} />
              <Route path='/addresses' Component={Addresses} />
              <Route path='/product/:productId' Component={Item} />
            </Routes>
          </div>
        </div>

        <div className='footer'>
          <Footer />
        </div>
      </main>
    </>
  )
}

export default App
