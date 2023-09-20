import React, { useEffect } from 'react'
import { FiUser, FiSearch, FiShoppingBag, FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const Header = () => {
    const {totalQty} = useSelector((state)=>state.cart)
    const {userInfo} = useSelector(state=>state.auth)

    // useEffect(()=>{
    //     const body = document.querySelector('body')
    //     const menu = document.querySelector('.menu')
    //     const menuIcon = document.querySelector('.menuIcon')
    //     body.addEventListener('click', function(e){
    //         if(!menu.contains(e.target) && !menuIcon.contains(e.target)){
    //             menu.classList.add('hidden')
    //             menuIcon.classList.remove('-rotate-45')
    //         }
    //     })
    // },[])//eslint-disable-line

    // function handleToggle(){
    //     const menuIcon = document.querySelector('.menuIcon')
    //     const menu = document.querySelector('.menu')
    //     menu.classList.toggle('hidden')
    //     menuIcon.classList.toggle('-rotate-45')
    // }
    return (
        <header className='z-50 top-0 fixed w-full bg-gray-900 shadow-sm border-b-[1px] border-b-[#ccc2] max-h-20 px-6'>
            {/* <div className='hidden transition menu absolute -bottom-0 left-3 right-16 sm:left-6 sm:w-[21rem] rounded-md z-10 translate-y-full bg-slate-800 p-2 opacity-[96%] pt-3'>
                <ul className='text-gray-300 font-semibold mx-4 py-4 space-y-2 uppercase text-[.95rem] border-b-[1px] border-gray-900'>
                    <li>Products</li>
                    <li>Deals</li>
                    <li>What's New</li>
                </ul>
                <div className='text-purple-400 mx-4 italic py-4 flex flex-col gap-2.5 border-b-[1px] border-gray-900'>
                    <Link to={'/'} className=''>Privacy Policy</Link>
                    <Link to={'/'} className=''>Shipping Policy</Link>
                    <Link to={'/'} className=''>Cookie Policy</Link>
                </div>
                <div className='px-4 pb-3 pt-5 flex justify-center gap-4 text-2xl text-orange-600'>
                    <FiFacebook />
                    <FiInstagram  />
                    <FiTwitter />
                </div>
            </div> */}
            <nav className='max-w-[1300px] mx-auto py-3 flex items-center gap-5 justify-items-stretch'>
                <div className='flex items-center gap-4'>
                    {/* <div onClick={handleToggle} className='menuIcon flex flex-col gap-[3px] mt-[3px]'>
                        <span className='w-[12px] h-[4px] rounded-full bg-gray-300'></span>
                        <span className='w-[16px] h-[4px] rounded-full bg-gray-400'></span>
                        <span className='w-[20px] h-[4px] rounded-full bg-gray-500'></span>
                    </div> */}
                    <Link to={'/'}>
                        {/* <img src="" alt="" /> */}
                        <h2 className='cursor-pointer text-2xl font-bold md:font-extrabold text-transparent bg-clip-text bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-yellow-600 to-red-600'>nariimei</h2>
                    </Link>
                </div>
                <ul className='flex-1 hidden gap-6 text-gray-50 md:flex'>
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
                    <Link to={userInfo ? '/profile' : 'userInfo' in localStorage ? '/login' : '/register'} className='relative font-bold'><FiUser className='text-[1.3rem] md:text-[1.45rem] text-white'/>{userInfo && <span className={`absolute bottom-0 w-3 h-3 rounded-full -right-1 ${userInfo.isAdmin ? 'bg-[#c00000]' : 'bg-[#00c000]'}`}></span>}</Link>
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