import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <>
      <Header />
      <main className='max-w-[1200] mx-auto px-6'>
        <Outlet />
      </main>
    </>
  )
}

export default App