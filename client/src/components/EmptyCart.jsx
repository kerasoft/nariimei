import React from 'react'
import EmptyCartImg from '../images/emptycart.webp'
import { useNavigate } from 'react-router-dom'

const EmptyCart = () => {
    const navigate = useNavigate()
    const btnClickHandler = () => {
        navigate('/')
    }
    return (
        <div className='flex flex-col items-center justify-center gap-6 min-h-[70vh]'>
            <img className='w-[10rem] md:w-[15rem]' src={EmptyCartImg} alt="" />
            <div className='flex flex-col items-center'>
                <h3 className='text-gray-400 font-semibold text-[1.5rem] sm:text-[1.75rem] md:text-[1.9rem]'>Your Cart is <span className='text-gray-50'>Empty</span></h3>
                <button type='button' onClick={btnClickHandler} className='text-gray-100 px-6 py-3 bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-yellow-600 to-red-600 mt-6 uppercase font-bold rounded-full text-sm lg:text-base'>Continue Shopping</button>
            </div>
        </div>
    )
}

export default EmptyCart