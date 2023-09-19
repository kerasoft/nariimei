import React, { useEffect } from 'react'
import CheckoutProgress from '../components/CheckoutProgress'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useCreateOrderMutation } from '../slices/ordersApiSlice'
import { toast } from 'react-toastify'
import { clearCartItems } from '../slices/cartSlice'
import { cashfreeSandbox } from "cashfree-pg-sdk-javascript"
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
      if(paymentMethod === 'Pay Online'){
        let cashfree = new cashfreeSandbox.Cashfree(res?.paymentSessionId);
        cashfree.redirect()
      }else {
        navigate(`/login?redirect=/order/${res._id}`)
      }
      dispatch(clearCartItems())
    } catch (error) {
      toast(error?.data?.message || error?.error)
    }
  }
  return (
    (shippingAddress && paymentMethod) && <React.Fragment>
      <CheckoutProgress login address payment placeOrder />
      <div className='max-w-[1200px] mx-auto flex flex-col md:flex-row gap-5 lg:gap-8 mt-5 md:mt-8'>
        <div className='flex-1 px-4 py-5 bg-black rounded-xl sm:p-6 sm:px-8'>
          <h4 className='text-xl font-semibold text-gray-500'>Delivery Address</h4>
          <div className='mt-2 text-gray-200 italic text-[.965rem] sm:text-base'>
            {shippingAddress.line1} <br />
            {shippingAddress.line2} <br />
            {shippingAddress.city}, {shippingAddress.pin}
          </div>
          <h4 className='mt-6 text-xl font-semibold text-gray-500'>Mode of payment</h4>
          <p className='mt-1 text-purple-500 text-[1.2rem]'>{paymentMethod}</p>
          <h4 className='mt-6 mb-5 text-xl font-semibold text-gray-500'>Order Items</h4>
          {cartItems.map(item=>(
            <div key={item._id} className='flex relative max-w-[27.5rem] mb-6 pb-2 select-none'>
              <div className='flex items-center text-gray-50'>
                <span className='absolute top-0 px-2 text-sm -translate-y-1/2 bg-black rounded-full sm:text-base left-2'>{item.name}</span>
                <img className='w-16 md:w-[4.5rem] rounded-l-lg bg-gray-50' src={item.image} alt={item.name}/>
              </div>
              <div className='flex items-center justify-end flex-1 pr-4 text-lg font-semibold text-gray-400 bg-gray-800 rounded-r-lg sm:text-xl'>&#8377; {item.totalPerUnit}
                <span className='absolute top-0 px-2 text-sm font-normal -translate-y-1/2 bg-black rounded-full sm:text-base right-2'>{item.qty} unit(s) @ &#8377;{item.price}</span>
              </div>
            </div>
          ))}
        </div>
        <div className='flex flex-col gap-2 p-6 bg-gray-800 rounded-xl h-fit'>
          <div className='md:w-[24rem] flex justify-between items-center'>
            <h2 className='text-lg text-gray-300'>Oder Total</h2>
            <span className='text-lg text-gray-300'>&#8377; {total}</span>
          </div>
          <div className='md:w-[24rem] flex justify-between items-center'>
            <h2 className='text-lg text-gray-300'>Taxes</h2>
            <span className='text-lg text-gray-300'>&#8377; {taxPrice}</span>
          </div>
          <div className='md:w-[24rem] flex justify-between items-center'>
            <h2 className='text-lg text-gray-300'>Delivery</h2>
            <span className='text-lg text-gray-300'>&#8377; {shippingPrice}</span>
          </div>
          <div className='md:w-[24rem] flex justify-between items-center'>
            <h2 className='text-[1.25rem] md:text-[1.45rem] font-semibold text-orange-700'>Net Payable</h2>
            <span className='text-orange-700 text-[1.25rem] md:text-[1.45rem] font-semibold'>&#8377; {totalPrice}</span>
          </div>
          <button disabled={isLoading} onClick={handlePlaceOrder} className='self-end hidden px-8 py-3 mt-8 font-bold tracking-wider uppercase bg-orange-700 rounded-md md:block w-fit text-gray-50' type='button'>place order {isLoading && <Spinner />}</button>
        </div>
      </div>
      <button disabled={isLoading} onClick={handlePlaceOrder} className='w-full px-5 py-3 mt-8 font-bold tracking-wider uppercase bg-orange-700 rounded-md md:hidden text-gray-50' type='button'>place order {isLoading && <Spinner />}</button>
    </React.Fragment>
  )
}

export default PlaceOrderScreen