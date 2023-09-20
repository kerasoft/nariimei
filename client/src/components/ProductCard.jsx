import React from 'react'
import { Link } from 'react-router-dom'
import { FaRegHeart } from 'react-icons/fa'
import { RiShareBoxFill } from 'react-icons/ri'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { addToCart, deleteFromCart } from '../slices/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
const ProductCard = ({product}) => {
  const dispatch = useDispatch()

  const { cartItems } = useSelector(state => state.cart)
  let existsInCart = cartItems.findIndex((item)=>item._id === product._id)
  
  let green = (5 - product.rating) * 30 + 100
  let ratingBgColor = `rgb(0, ${green}, 0)`

  function decrementQty() {
    if(cartItems[existsInCart].qty===1 && cartItems[existsInCart].qty>0){
      dispatch(deleteFromCart({i:existsInCart, purge:true}))
    }else {
      dispatch(deleteFromCart({i:existsInCart, decrement: true}))
    }
  }

  function addToCartHandler(e){ 
    e.preventDefault()
    dispatch(addToCart(product))
  }
  return (
    <Link to={`/product/${product._id}`} className='relative rounded-xl w-[9rem] h-[11rem] md:w-[11.5rem] md:h-[13.25rem] bg-gradient-to-r from-gray-100 to-gray-300 shadow-lg my-3 px-2 backdrop-filter backdrop-blur-md'>
        <FaRegHeart onClick={(e)=>{e.preventDefault()}} className='absolute text-lg text-purple-800 md:text-2xl right-2 top-3 md:top-4' />
        <RiShareBoxFill onClick={(e)=>{e.preventDefault()}} className='absolute text-lg sm:text-[1.6rem] text-purple-800 right-2 top-8 sm:top-11' />
        <img className='w-9/12 my-2 mx-auto rounded-lg' src={product.image} alt={product.name} />
        <div className='mt-3 sm:px-1'>
          <div className='flex justify-between items-center'>
            <div>
              <h3 className='flex-1 text-[.825rem] md:text-[.975rem] font-medium capitalize text-gray-950'>{product.name}</h3>
              <p className='italic text-[.8rem] sm:text-base'>{product.size}</p>
            </div>
            <span style={{backgroundColor: ratingBgColor}} className={`text-[.7rem] md:text-[.875rem] w-6 h-6 md:w-[1.8rem] md:h-[1.8rem] -mt-2 font-medium text-center text-white rounded-md flex justify-center items-center`}>{product.rating.toFixed(1)}</span>
          </div>
        </div>
        <div onClick={(e)=>e.preventDefault()} className='cursor-default text-sm sm:text-base absolute flex justify-between bottom-0 w-[95%] text-white translate-y-1/2 translate-x-1/2 right-1/2 bg-purple-900 rounded-full font-bold items-center overflow-x-hidden'>
          <span className='pl-4 sm:pl-5'>&#8377;{product.price}</span>
          { existsInCart>-1 ? 
            <div className='bg-purple-800 rounded-r-full flex items-center justify-around py-2 sm:py-2.5 pr-1'>
              <span onClick={decrementQty} className='sm:text-lg px-1.5 sm:px-2.5 cursor-pointer'><AiOutlineMinus/></span>
              <span className='px-1'>{cartItems[existsInCart].qty}</span>
              <span onClick={()=>dispatch(addToCart({...cartItems[existsInCart], qty:1}))} className='sm:text-lg px-1.5 sm:px-2.5 cursor-pointer'><AiOutlinePlus/></span>
            </div> : 
            <button type='button' onClick={addToCartHandler} className='bg-purple-800 px-4 py-2 sm:px-5 sm:py-2.5 rounded-r-full'>ADD</button>}
        </div>
    </Link>
  )
}

export default ProductCard