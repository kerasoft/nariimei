import React, { useEffect } from 'react'
import CheckoutProgress from '../components/CheckoutProgress'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useCreateOrderMutation } from '../slices/ordersApiSlice'
import { toast } from 'react-toastify'
import { clearCartItems } from '../slices/cartSlice'
import Spinner from '../components/Spinner'

const PlaceOrderScreen = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const { shippingAddress, paymentMethod, cartItems, totalPrice:total } = useSelector(state => state.cart)

  const [ createOrder, { isLoading, error }] = useCreateOrderMutation()

  useEffect(()=>{
    if(!shippingAddress) {
      navigate('/shipping')
    } else if(!paymentMethod) {
      navigate('/payment')
    }
    if(error) toast(error)
  }, [paymentMethod, shippingAddress, navigate, error])

  let shippingPrice = total > 1500 ? 0 : 150
  let taxPrice = total * 18 / 100
  let totalPrice = total + shippingPrice + taxPrice

  async function handlePlaceOrder() {
    try {
      const res = await createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice: total,
        shippingPrice,
        taxPrice,
        totalPrice
      }).unwrap()
      navigate(`/login?redirect=/order/${res._id}`)
      dispatch(clearCartItems())
      console.log('order placed')
      toast('Order placed successfully')
    } catch (error) {
      toast(error?.data?.message || error?.error)
    }
  }
  return (
    (shippingAddress && paymentMethod) && <React.Fragment>
      <CheckoutProgress login address payment placeOrder />
      <div className='max-w-[1200px] mx-auto flex flex-col md:flex-row gap-5 lg:gap-8 mt-5 md:mt-8'>
        <div className='flex-1 bg-black rounded-xl px-4 sm:p-6 sm:px-8 py-5'>
          <h4 className='text-xl text-gray-500 font-semibold'>Delivery Address</h4>
          <div className='mt-2 text-gray-200 italic text-[.965rem] sm:text-base'>
            {shippingAddress.line1} <br />
            {shippingAddress.line2} <br />
            {shippingAddress.city}, {shippingAddress.pin}
          </div>
          <h4 className='text-xl text-gray-500 font-semibold mt-6'>Mode of payment</h4>
          <p className='mt-1 text-purple-500 text-[1.2rem]'>{paymentMethod}</p>
          <h4 className='text-xl text-gray-500 font-semibold mb-5 mt-6'>Order Items</h4>
          {cartItems.map(item=>(
            <div key={item._id} className='flex relative max-w-[27.5rem] mb-6 pb-2 select-none'>
              <div className='text-gray-50 flex items-center'>
                <span className='text-sm sm:text-base absolute top-0 -translate-y-1/2 left-2 rounded-full bg-black px-2'>{item.name}</span>
                <img className='w-16 md:w-[4.5rem] rounded-l-lg bg-gray-50' src={item.image} alt={item.name}/>
              </div>
              <div className='flex-1 justify-end text-lg sm:text-xl font-semibold text-gray-400 bg-gray-800 flex items-center pr-4 rounded-r-lg'>&#8377; {item.totalPerUnit}
                <span className='text-sm sm:text-base font-normal absolute top-0 -translate-y-1/2 right-2 rounded-full bg-black px-2'>{item.qty} unit(s) @ &#8377;{item.price}</span>
              </div>
            </div>
          ))}
        </div>
        <div className='bg-gray-800 rounded-xl p-6 flex flex-col h-fit gap-2'>
          <div className='md:w-[24rem] flex justify-between items-center'>
            <h2 className='text-lg text-gray-300'>Oder Total</h2>
            <span className='text-gray-300 text-lg'>&#8377; {total}</span>
          </div>
          <div className='md:w-[24rem] flex justify-between items-center'>
            <h2 className='text-lg text-gray-300'>Taxes</h2>
            <span className='text-gray-300 text-lg'>&#8377; {taxPrice}</span>
          </div>
          <div className='md:w-[24rem] flex justify-between items-center'>
            <h2 className='text-lg text-gray-300'>Delivery</h2>
            <span className='text-gray-300 text-lg'>&#8377; {shippingPrice}</span>
          </div>
          <div className='md:w-[24rem] flex justify-between items-center'>
            <h2 className='text-[1.25rem] md:text-[1.45rem] font-semibold text-orange-700'>Net Payable</h2>
            <span className='text-orange-700 text-[1.25rem] md:text-[1.45rem] font-semibold'>&#8377; {totalPrice}</span>
          </div>
          <button disabled={isLoading} onClick={handlePlaceOrder} className='hidden md:block self-end w-fit px-8 py-3 font-bold tracking-wider uppercase bg-orange-700 rounded-md mt-8 text-gray-50' type='button'>place order {isLoading && <Spinner />}</button>
        </div>
      </div>
      <button disabled={isLoading} onClick={handlePlaceOrder} className='md:hidden w-full px-5 py-3 font-bold tracking-wider uppercase bg-orange-700 rounded-md mt-8 text-gray-50' type='button'>place order {isLoading && <Spinner />}</button>
    </React.Fragment>
  )
}

export default PlaceOrderScreen