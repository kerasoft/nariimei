import React from 'react'
import Header from './components/Header'
import { Outlet, ScrollRestoration } from 'react-router-dom'

const App = () => {
  return (
    <>
      <Header />
      <main className='max-w-[1200] mx-auto px-4 py-12'>
        <Outlet />
      </main>
      <ScrollRestoration />
    </>
  )
}

export default App