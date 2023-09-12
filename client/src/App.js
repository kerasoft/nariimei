import React from 'react'
import Header from './components/Header'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Footer from './components/Footer'

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <main className='max-w-[1200] mx-auto px-4 pt-12 pb-6 sm:py-12 min-h-[calc(100vh-40px)]'>
        <Outlet />
      </main>
      <ToastContainer position='top-right' autoClose={5000} theme='dark' toastStyle={{background: '#000e'}} bodyClassName={'text-gray-400 font-semibold italic'} progressStyle={{background: 'conic-gradient(at center top, rgb(202, 138, 4), rgb(220, 38, 38))'}}/>
      <ScrollRestoration />
      <Footer />
    </React.Fragment>
  )
}

export default App