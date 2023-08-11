import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({product}) => {
  return (
    <Link to={`/product/${product._id}`} className='rounded-md w-[16rem] px-1 py-2 bg-gray-50 shadow-lg my-3'>
        <img className='rounded-lg' src={product.image} alt='' />
        <div className='mt-4'>
          <div className='flex mb-1'>
            <h3 className='uppercase font-semibold mb-2 flex-1'>{product.name}</h3>
            <span className='bg-black p-1 w-8 text-white text-center font-semibold rounded-md'>{product.rating.toFixed(1)}</span>
          </div>
          <div className='flex justify-between'>
            <div className='flex flex-1 gap-2'><div className='bg-black rounded-full w-7 h-7 text-white flex justify-center items-center'>{product.stock}</div> <p>in stock</p></div>
            <p className='text-xl font-bold self-end'>&#8377;{product.price}</p>
          </div>
        </div>
        <button onClick={(e)=>{e.preventDefault()}} className='rounded-md mt-4 text-end px-5 py-3 bg-black text-white w-full'>ADD TO CART</button>
    </Link>
  )
}

export default ProductCard