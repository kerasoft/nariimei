import React from 'react'
import { Link } from 'react-router-dom'
import { FaRegHeart } from 'react-icons/fa'
import { RiShareBoxFill } from 'react-icons/ri'
import { addToCart } from '../slices/cartSlice'
import { useDispatch } from 'react-redux'
const ProductCard = ({product}) => {
  const dispatch = useDispatch()

  function addToCartHandler(e){
    e.preventDefault()
    dispatch(addToCart(product))
  }
  return (
    <Link to={`/product/${product._id}`} className='relative rounded-xl w-[9rem] h-[11rem] sm:w-[14rem] sm:h-[15rem] bg-gradient-to-r from-gray-100 to-gray-300 shadow-lg my-3 px-2 backdrop-filter backdrop-blur-md'>
        <FaRegHeart onClick={(e)=>{e.preventDefault()}} className='absolute text-lg text-purple-800 sm:text-2xl right-2 sm:right-4 top-2 sm:top-6' />
        <RiShareBoxFill onClick={(e)=>{e.preventDefault()}} className='absolute text-lg sm:text-[1.6rem] text-purple-800 right-2 sm:right-4 top-8 sm:top-12' />
        <img className='w-9/12 m-4 mx-auto rounded-lg sm:w-8/12' src={product.image} alt='' />
        <div className='mt-4 sm:px-1'>
          <div className='flex'>
            <h3 className='flex-1 mb-1 text-[.7rem] sm:text-base font-semibold uppercase text-slate-900'>{product.name}</h3>
            <span className='text-[.7rem] sm:text-base w-6 sm:w-8 p-1 font-semibold text-center text-white bg-green-700 rounded-md'>{product.rating.toFixed(1)}</span>
          </div>
          <p className='text-[.7rem] -mt-2 sm:text-base'>{product.size}</p>
        </div>
        <button type='button' onClick={addToCartHandler} className='text-sm sm:text-base absolute flex justify-between bottom-0 w-[95%] px-5 py-2 sm:px-6 sm:py-3 text-white translate-y-1/2 translate-x-1/2 right-1/2 bg-purple-900 rounded-full font-bold'><span className=''>&#8377;{product.price}</span><span>ADD</span></button>
    </Link>
  )
}

export default ProductCard