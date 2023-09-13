import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import { useGetOrderByIdQuery } from '../slices/ordersApiSlice'
import { clearAddrAndPayment } from '../slices/cartSlice'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'

const OrderScreen = () => {
  const { state: prevPath } = useLocation()
  const { id: orderId } = useParams()
  const dispatch = useDispatch()
  const { shippingAddress: shippingAddrFromRedux } = useSelector(state => state.cart)
  const { data: order, isLoading, error } = useGetOrderByIdQuery(orderId)

  let date = new Date(`${order?.createdAt}`)
  let orderDate = date.toDateString()
  const buffer = 8.64e+7 * 7
  let deliveryDate = new Date(buffer + date.getTime()).toDateString()
  console.log(deliveryDate, orderDate)

  useEffect(() => {
    // clear shipping and paymentMethod only if order placed (redirected to login then to orderpage)
    (prevPath === '/login' && shippingAddrFromRedux) && dispatch(clearAddrAndPayment())
  }, [shippingAddrFromRedux, dispatch, prevPath])

  return (

    isLoading ? 
      <Loader /> :
      error ? 
        toast(error?.data?.message || error?.error) && <Navigate to={'/profile'} /> :
        order && <div className='max-w-[1200px] mx-auto'>
          <p className='mt-6 italic font-bold text-center text-gray-300 sm:pr-4 sm:mt-5 sm:text-end'>ORDER-ID: {order._id}</p>
          <div className='flex flex-col-reverse gap-5 mt-5 md:flex-row-reverse lg:gap-8 md:mt-5'>
            <div className='flex-1 px-4 py-5 bg-gray-950 rounded-xl sm:p-6 sm:px-8'>
              <h4 className='text-xl font-semibold text-gray-500'>Delivery Address</h4>
              <div className='mt-2 text-gray-200 italic text-[.965rem] sm:text-base'>
                {order.shippingAddress.line1} <br />
                {order.shippingAddress.line2} <br />
                {order.shippingAddress.city}, {order.shippingAddress.pin}
              </div>
              <h4 className='mt-6 text-xl font-semibold text-gray-500'>Mode of payment</h4>
              <p className='mt-1 text-purple-500 text-[1.2rem]'>{order.paymentMethod}</p>
              <h4 className='mt-6 mb-5 text-xl font-semibold text-gray-500'>Order Items</h4>
              {order.orderItems.map(item => (
                <div key={item._id} className='flex relative max-w-[27.5rem] mb-6 pb-2 select-none'>
                  <div className='flex items-center text-gray-50'>
                    <span className='absolute top-0 px-2 text-sm -translate-y-1/2 bg-black rounded-full sm:text-base left-2'>{item.name}</span>
                    <img className='w-16 md:w-[4.5rem] rounded-l-lg bg-gray-50' src={item.image} alt={item.name} />
                  </div>
                  <div className='flex items-center justify-end flex-1 pr-4 text-lg font-semibold text-gray-400 bg-gray-800 rounded-r-lg sm:text-xl'>&#8377; {item.price * item.qty}
                    <span className='absolute top-0 px-2 text-sm font-normal -translate-y-1/2 bg-black rounded-full sm:text-base right-2'>{item.qty} unit(s) @ &#8377;{item.price}</span>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div className='flex flex-col gap-2 px-4 py-6 mb-6 bg-slate-800 sm:px-6 sm:py-8 rounded-xl h-fit'>
                <div className='md:w-[24rem] flex justify-between items-center text-gray-400 sm:text-lg'>
                  <h2>Oder Date</h2>
                  <span>{orderDate}</span>
                </div>
                <div className='md:w-[24rem] flex justify-between items-center text-gray-400 sm:text-lg'>
                  <h2>Delivery ETA</h2>
                  <span>{deliveryDate}</span>
                </div>
                <div className='md:w-[24rem] flex justify-between items-center text-gray-400 sm:text-lg'>
                  <h2>Delivery Contact</h2>
                  <span>{order.user.email}</span>
                </div>
                <div className='md:w-[24rem] flex justify-between items-center'>
                  <h2 className='text-[1.2rem] md:text-[1.4rem] font-semibold text-orange-700'>Delivery Status</h2>
                  <span className={`text-[1rem] md:text-[1.225rem] font-bold uppercase ${order.isDelivered ? 'text-green-700' : 'text-red-600'}`}>{order.isDelivered ? 'Delivered' : 'pending'}</span>
                </div>
              </div>
              <div className='flex flex-col gap-2 px-4 py-6 bg-gray-800 sm:px-6 sm:py-8 rounded-xl h-fit'>
                <div className='md:w-[24rem] flex justify-between items-center text-gray-300 sm:text-lg'>
                  <h2>Oder Total</h2>
                  <span>&#8377; {order.itemsPrice}</span>
                </div>
                <div className='md:w-[24rem] flex justify-between items-center'>
                  <h2 className='text-gray-300 sm:text-lg'>Taxes</h2>
                  <span className='text-gray-300 sm:text-lg'>&#8377; {order.taxPrice}</span>
                </div>
                <div className='md:w-[24rem] flex justify-between items-center text-gray-300 sm:text-lg'>
                  <h2>Delivery</h2>
                  <span>&#8377; {order.shippingPrice}</span>
                </div>
                <div className='md:w-[24rem] flex justify-between items-center text-gray-100 font-bold sm:text-lg'>
                  <h2>Net Amount</h2>
                  <span>&#8377; {order.totalPrice}</span>
                </div>
                <div className='md:w-[24rem] flex justify-between items-center'>
                  <h2 className='text-[1.2rem] md:text-[1.4rem] font-semibold text-orange-700'>Payment Status</h2>
                  <span className={`text-[1rem] md:text-[1.225rem] font-bold uppercase ${order.isPaid ? 'text-green-700' : 'text-red-600'}`}>{order.isPaid ? 'Paid' : 'Pending'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default OrderScreen