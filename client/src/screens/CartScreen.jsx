import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EmptyCart from '../components/EmptyCart'
import { addToCart, deleteFromCart } from '../slices/cartSlice'
import {RiDeleteBin5Fill} from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'

const CartScreen = () => {
  const navigate = useNavigate()

  const {totalPrice, totalQty, cartItems} = useSelector(state=>state.cart)
  const dispatch = useDispatch()

  function handleCheckout(){
    navigate('/login?redirect=/shipping')
  }
  return (
    <div className='mt-5'>
      {totalQty === 0 && <EmptyCart />}
      {totalQty > 0 && <div className='flex gap-5 md:gap-8 mx-auto max-w-[1100px] flex-col md:flex-row'>
        <div className='flex-1 bg-gray-800 rounded-2xl'>
          {cartItems.map((item, i) => {
            return <div key={i} className='[&:not(:last-child)]:border-b-[2px] border-gray-700 m-4 pb-4 flex justify-between'>
              <Link to={`/product/${item._id}`} className=''>
                <img className='w-20 sm:w-24 bg-gray-50 rounded-md' src={item.image} alt="" />
                <h5 className='mt-2 font-semibold text-sm sm:text-base text-gray-200'>{item.name}</h5>
              </Link>
              <div className='flex flex-col justify-between'>
                <button onClick={()=>dispatch(deleteFromCart({i, purge:true}))} className='bg-gray-500 rounded-full w-6 h-6 sm:w-7 sm:h-7 flex justify-center items-center self-end sm:text-lg'>
                  <RiDeleteBin5Fill />
                </button>
                <p className='text-lg sm:text-xl text-orange-600 text-end font-bold mt-auto'>&#8377;{item.totalPerUnit}</p>
                <div className='flex flex-0 h-fit self-end rounded-md bg-gray-300 ring-2 ring-white mb-2 mt-3'>
                  <button onClick={()=>dispatch(deleteFromCart({i, decrement:true}))} type='button' className='w-6 h-6 sm:w-8 sm:h-8 flex justify-center items-center text-lg sm:text-xl font-semibold'>-</button>
                  <div className='w-6 h-6 sm:w-8 sm:h-8 flex justify-center items-center border-x-[1px] border-white text-sm sm:text-lg font-semibold'>{item.qty}</div>
                  <button onClick={()=>dispatch(addToCart({...item, qty:1}))} type='button' className='w-6 h-6 sm:w-8 sm:h-8 flex justify-center items-center text-lg sm:text-xl font-semibold'>+</button>
                </div>
              </div>
            </div>
          })}
        </div>
        <div>
          <div className='w-full md:w-[22rem] lg:w-[27.5rem] xl:w-[30rem] max-h-60 bg-gray-800 rounded-2xl flex'>
            <div className='m-2 sm:m-4 pt-3.5 sm:pt-8 flex-1 mb-4 sm:mt-auto sm:mb-8'>
              <div className='flex justify-between px-8 text-gray-200 text-[1.1rem] sm:text-[1.2rem]'><span>Total Quantity:</span><span className='font-bold'>{totalQty}</span></div>
              <div className='flex mt-2 justify-between px-8 text-orange-500 text-[1.15rem] sm:text-[1.25rem]'><span>Sub Total:</span><span className='font-bold'>&#8377;{totalPrice}</span></div>
            </div>
          </div>
          <div className='mt-4 mx-auto max-w-[1100px] text-end'><button type="button" onClick={handleCheckout} className='w-full sm:w-fit px-8 py-[13px] sm:py-3 bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-yellow-600 to-red-600 rounded-md font-bold uppercase text-[1.125rem] sm:text-lg text-gray-800'>Checkout</button></div>
        </div>
      </div>}
    </div>
  )
}

export default CartScreen