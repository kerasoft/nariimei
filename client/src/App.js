import React from 'react'
import Header from './components/Header'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <>
      <Header />
      <main className='max-w-[1200] mx-auto px-4 py-12'>
        <Outlet />
      </main>
      <ToastContainer position='top-right' autoClose={5000} theme='dark' toastStyle={{background: '#000e'}} bodyClassName={'text-gray-400 font-semibold italic'} progressStyle={{background: 'conic-gradient(at center top, rgb(202, 138, 4), rgb(220, 38, 38))'}}/>
      <ScrollRestoration />
    </>
  )
}

export default App