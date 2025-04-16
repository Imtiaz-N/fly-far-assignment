import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'

const Main = () => {
  return (
    <div className='min-h-screen bg-[#edf2f6]'>
      <Header />
      <div className='mt-28'></div>
      <Outlet />
      <Footer />
    </div>
  )
}

export default Main
