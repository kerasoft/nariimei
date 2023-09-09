import { useNavigate, useParams } from 'react-router-dom'
import { useGetProductQuery } from '../slices/productsApiSlice'
import Loader from '../components/Loader'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../slices/cartSlice'
import { toast } from 'react-toastify'
const ProductScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [qty, setQty] = useState(1)
  const {id:productId} = useParams()
  const { data: product, isLoading, error } = useGetProductQuery(productId)

  function decrementQty() {
    (qty > 1) && setQty(qty=>qty-1)
  }

  function incrementQty(){
    (qty < product.stock) && setQty(qty=>qty+1)
  }

  function addToCartHandler(){
    dispatch(addToCart({...product, qty}))
    navigate('/cart')
  }
  return (
    isLoading ? 
      <Loader /> :
      error ? 
        toast(error?.data?.message || error.error) :
        <div className='mx-auto max-w-[1100px] px-4 py-4'>
          <h3 className='mt-4 lg:mt-8 text-lg md:text-2xl text-gray-200'>{product.name}</h3>
          <div className='w-full flex flex-col lg:flex-row gap-y-5 lg:gap-y-0 justify-between mt-5 items-center'>
            <div className='lg:w-5/12 self-start'>
              <div className='flex flex-col lg:items-start'>
                <img className='w-[75%] bg-gray-50 rounded-2xl' src={product.image} alt="" />
                <div ></div>
              </div>
            </div>
            <div className='lg:w-7/12 rounded-2xl bg-gray-800'>
              <div className='m-5'>
                <h5 className='text-gray-200 text-sm sm:text-base'>ABOUT THIS PRODUCT</h5>
                <p className='text-orange-500 mt-2 pl-2'>{product.desc}</p>
                <h5 className='text-gray-200 mt-4 text-sm sm:text-base'>STOCK</h5>
                <p className='text-orange-500 mt-2 pl-2'><span className='font-semibold bg-orange-500 w-6 items-center h-6 inline-flex justify-center rounded-full text-gray-50 text-lg'>{product.stock}</span> left in stock</p>
                <h5 className='text-gray-200 mt-4 text-sm sm:text-base'>CATEOGORY</h5>
                <p className='w-fit ml-2 px-2 rounded-full font-semibold mt-2 pl-2 capitalize bg-orange-500 text-gray-50'>{product.category}</p>
                <h5 className='text-gray-200 mt-4 text-sm sm:text-base'>PRICE</h5>
                <p className='text-orange-500 mt-2 pl-2 text-xl md:text-2xl font-bold'>&#8377; {product.price}</p>
                <div className='mt-8 mb-6 flex gap-x-3'>
                  <div className='flex rounded-md bg-gray-300 ring-2 ring-white'>
                    <button onClick={decrementQty} type='button' className='w-10 h-10 flex justify-center items-center text-xl font-semibold'>-</button>
                    <div className='w-10 h-10 flex justify-center items-center border-x-[1px] border-white text-xl font-semibold'>{qty}</div>
                    <button onClick={incrementQty} type='button' className='w-10 h-10 flex justify-center items-center text-xl font-semibold'>+</button>
                  </div>
                  <button onClick={addToCartHandler} type="button" className='ring-2 ring-orange-500 flex-none bg-orange-500 rounded-md px-4 text-gray-50 py-2 font-bold'>ADD TO CART</button>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default ProductScreen