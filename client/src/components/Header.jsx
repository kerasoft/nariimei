import React from 'react'
import { FiUser, FiSearch, FiShoppingBag } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const Header = () => {
    const {totalQty} = useSelector((state)=>state.cart)
    const {userInfo} = useSelector(state=>state.auth)
    return (
        <header className='z-50 top-0 fixed w-full bg-slate-900 shadow-sm border-b-[1px] border-b-[#ccc2] max-h-20 px-6'>
            <nav className='max-w-[1300px] mx-auto py-3 flex items-center gap-5 justify-items-stretch'>
                <Link to={'/'}>
                    {/* <img src="" alt="" /> */}
                    <h2 className='cursor-pointer text-2xl font-bold text-transparent bg-clip-text bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-yellow-600 to-red-600'>nariimei</h2>
                </Link>
                <ul className='flex-1 hidden gap-6 font-semibold text-gray-50 md:flex'>
                    <li>Products</li>
                    <li>Deals</li>
                    <li>What's New</li>
                </ul>
                <div className='flex justify-end flex-1 md:flex-none'>
                    <button type='button' className='mr-3 font-bold md:mr-5 '><FiSearch className='text-xl md:text-[1.45rem] text-white'/></button>

                    <Link to={'/cart'} className='relative mr-3 font-bold md:mr-5'><FiShoppingBag className='text-xl md:text-[1.45rem] text-white'/>
                        {totalQty > 0 && <span className='absolute bottom-0 w-5 h-5 sm:w-6 sm:h-6 flex justify-center items-center rounded-full bg-purple-800 -right-4 -top-3 text-[.875rem] sm:text-base text-gray-100 font-semibold'>{totalQty}</span>}
                    </Link>
                    
                    {/* @routing: If there's a token, redirect to /profile, or If user had ever logged in on same browser(and currently no auth) then redirect to /login or else to /register*/}
                    <Link to={userInfo ? '/profile' : 'auth' in localStorage ? '/login' : '/register'} className='relative font-bold'><FiUser className='text-[1.3rem] md:text-[1.45rem] text-white'/>{userInfo && <span className='absolute bottom-0 w-3 h-3 rounded-full bg-[#00c000] -right-1'></span>}</Link>
                    {/* <div className='absolute z-[99] top-12 shadow-md shadow-current rounded-lg right-2'>
                        <ul className='font-semibold'>
                            <li className='text-gray-200 py-2 px-7 bg-black rounded-lg rounded-b-none'><Link to={'/login'}>Login</Link></li>
                            <li className='text-gray-900 py-2 px-7 bg-gray-300 rounded-lg rounded-t-none'><Link to={'/register'}>Register</Link></li>
                        </ul>
                    </div> */}
                </div>
            </nav>
        </header>
    )
}

export default Header