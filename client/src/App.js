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
      {/* <button onClick={()=>toast('Sorry, Not more of this product in stock')} className='px-5 py-2 text-gray-900 bg-white'>toaster</button> */}
        <Outlet />
      </main>
      <ToastContainer position='top-right' autoClose={5000} theme='dark' toastStyle={{background: '#000e'}} bodyClassName={'text-gray-400 font-semibold italic'} progressStyle={{background: 'conic-gradient(at center top, rgb(202, 138, 4), rgb(220, 38, 38))'}}/>
      <ScrollRestoration />
    </>
  )
}

export default App