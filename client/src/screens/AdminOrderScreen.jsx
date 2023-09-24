import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetOrderByIdQuery, useUpdateDeliveryStatusMutation, useUpdatePayStatusMutation } from '../slices/ordersApiSlice'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'
import ToggleButton from '../components/ToggleButton'
import Spinner from '../components/Spinner'

const AdminOrderScreen = () => {
    
    console.log('rendering..')
    const { id: orderId } = useParams()
    const { data: order, isLoading, error } = useGetOrderByIdQuery(orderId)
    const [status, setStatus] = useState({ pay: false, delivery: false })
    const [updatePayStatus, { isLoading: loadingPayStatus, error:errorPayStatus }] = useUpdatePayStatusMutation()
    const [updateDeliveryStatus, { isLoading: loadingDeliveryStatus, error:errorDeliveryStatus }] = useUpdateDeliveryStatusMutation()
    
    useEffect(()=>{
        order && setStatus(status=>({
            ...status,
            pay: order.isPaid,
            delivery: order.isDelivered 
        }))

        if(order && !order.isDelivered) {
            const body = document.querySelector('body')
            let container = document.querySelector('.cancelContainer')
            body.addEventListener('click', function(e){
              if(container.firstChild.classList.contains('hidden') && !container.contains(e.target)){
                  container.children.forEach(i=>i.classList.toggle('hidden'))
              }
            })
        }
    },[order])


    
    async function handleChange(e) {
        const { id } = e.target
        setStatus(status => (
            {
                ...status,
                [id]: !status[id]
            }
            ))
            if(id==='pay'){
                console.log(status.pay)
                try {
                    await updatePayStatus({orderId: order._id, orderStatus: !status.pay})
                } catch (error) {
                    toast(error?.data?.message || error?.error)
                }
            }
            if(id==='delivery'){
                try {
                    await updateDeliveryStatus({orderId: order._id, orderStatus: !status.delivery})
                } catch (error) {
                    toast(error?.data?.message || error?.error)
                }
            }
    }

    let date = new Date(`${order?.createdAt}`)
    let orderDate = date.toDateString()
    const buffer = 8.64e+7 * 7
    let deliveryDate = new Date(buffer + date.getTime()).toDateString()
    
    function cancelClick () {
        const cancelCtnr = document.querySelector('.cancelContainer')
        cancelCtnr.children.forEach(i=>i.classList.toggle('hidden'))
    }

    return (
        isLoading ? 
            <Loader /> :
            error ? 
                toast(error?.data?.message || error?.error) :
                <div className='max-w-[1200px] mx-auto'>
                    <p className='mt-6 italic font-bold text-center text-gray-300 sm:mt-5 sm:text-end'>ORDER-ID: {order._id}</p>
                    {!order.isDelivered && <div className='w-full mt-5 flex justify-end'>
                        <div id='container' className='cancelContainer space-x-1.5'>
                            <button onClick={cancelClick} className='cancelBtn px-2 py-[2px] bg-gray-200 text-red-700 rounded-md font-semibold uppercase text-[.925rem]'>Cancel</button>
                            <span className='cancelText hidden text-gray-300 italic mr-1'>Confirm to cancel?</span>
                            <button className='yesBtn hidden px-2 py-[2px] bg-blue-700 text-gray-50 rounded-md font-semibold uppercase text-[.925rem]'>yes</button>
                            <button onClick={cancelClick} className='noBtn hidden px-2 py-[2px] bg-gray-50 text-blue-700 rounded-md font-semibold uppercase text-[.925rem]'>no</button>
                        </div>
                    </div>}
                    <div className='flex flex-col-reverse gap-5 mt-2 md:flex-row-reverse lg:gap-8'>
                        <div className='flex-1 px-4 py-5 bg-gray-950 rounded-xl sm:p-6 sm:px-8'>
                            <h4 className='text-xl font-semibold text-gray-500 '>User Details</h4>
                            <div className='mt-2 font-medium text-gray-200'>
                                {order.user.name} <br />
                                {order.user.email}
                            </div>
                            <h4 className='mt-5 text-xl font-semibold text-gray-500'>Delivery Address</h4>
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
                                <div className='md:w-[24rem] flex justify-between items-center pt-2'>
                                    <h2 className='text-[1.2rem] md:text-[1.4rem] font-semibold text-orange-700'>Delivery Status</h2>
                                    {loadingDeliveryStatus ? <Spinner bg='bg-slate-800' /> : <ToggleButton id='delivery' handleToggle={handleChange} status={status.delivery} />}
                                </div>
                                {errorDeliveryStatus && <span className='mt-2 self-end text-[.675rem] italic text-gray-400'>Bad connection, check you internet and try</span>}
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
                                <div className='md:w-[24rem] flex justify-between items-center pt-2'>
                                    <h2 className='text-[1.2rem] md:text-[1.4rem] font-semibold text-orange-700'>Payment Status</h2>
                                    {loadingPayStatus ? <Spinner bg='bg-gray-800' /> : <ToggleButton id='pay' handleToggle={handleChange} status={status.pay} />}
                                </div>
                                {errorPayStatus && <span className='mt-2 self-end text-[.675rem] italic text-gray-400'>Bad connection, check your internet and try</span>}
                            </div>
                        </div>
                    </div>
                </div>
    )
}

export default AdminOrderScreen