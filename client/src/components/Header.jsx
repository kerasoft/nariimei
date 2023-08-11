import React from 'react'

const Header = () => {
  return (
    <header className='bg-[#f9f9f9] shadow-sm border-b-[1px] border-b-[#2222] max-h-20 px-6'>
        <nav className='max-w-[1300px] mx-auto py-3 flex items-center gap-5 justify-items-stretch'>
            <div>
                {/* <img src="" alt="" /> */}
                <h2 className='font-bold text-2xl text-purple-600'>nariimei</h2>
            </div>
            <ul className='font-semibold gap-6 flex-1 hidden md:flex'>
                <li>Products</li>
                <li>Deals</li>
                <li>What's New</li>
            </ul>
            <div className='flex-1 md:flex-none flex justify-end'>
                <a href="/" className=''>Login/Register</a>
            </div>
        </nav>
    </header>
  )
}

export default Header