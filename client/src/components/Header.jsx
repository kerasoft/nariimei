import React from 'react'
import { FiUser, FiSearch, FiShoppingBag } from 'react-icons/fi'
import { UseSelector, useSelector } from 'react-redux'
const Header = () => {

    const {totalQty} = useSelector((state)=>state.cart)
    return (
        <header className='z-50 top-0 fixed w-full bg-slate-900 shadow-sm border-b-[1px] border-b-[#ccc2] max-h-20 px-6'>
            <nav className='max-w-[1300px] mx-auto py-3 flex items-center gap-5 justify-items-stretch'>
                <div>
                    {/* <img src="" alt="" /> */}
                    <h2 className='text-2xl font-bold text-transparent bg-clip-text bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-yellow-600 to-red-600'>nariimei</h2>
                </div>
                <ul className='flex-1 hidden gap-6 font-semibold text-gray-50 md:flex'>
                    <li>Products</li>
                    <li>Deals</li>
                    <li>What's New</li>
                </ul>
                <div className='flex justify-end flex-1 md:flex-none'>
                    <a href="/" className='mr-3 font-bold md:mr-5 '><FiSearch className='text-xl md:text-[1.45rem] text-white'/></a>

                    <a href="/" className='relative mr-3 font-bold md:mr-5'><FiShoppingBag className='text-xl md:text-[1.45rem] text-white'/><span className='absolute bottom-0 w-5 h-5 sm:w-6 sm:h-6 flex justify-center items-center rounded-full bg-black -right-4 -top-3 text-[.875rem] sm:text-base text-gray-200 font-normal'>{totalQty}</span></a>

                    <a href="/" className='relative font-bold'><FiUser className='text-[1.3rem] md:text-[1.45rem] text-white'/><span className='absolute bottom-0 w-3 h-3 rounded-full bg-[#00c000] -right-1'></span></a>
                </div>
            </nav>
        </header>
    )
}

export default Header