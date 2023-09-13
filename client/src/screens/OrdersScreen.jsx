import React from 'react'
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'
import { Link, Navigate } from 'react-router-dom'

const OrdersScreen = () => {

    const { data: orders, isLoading, error } = useGetMyOrdersQuery()
    console.log(orders) 

    function orderDate(createdAt){
        return new Date(createdAt).toDateString()
    }
    function deliveryDate(createdAt){
        let millis = new Date(createdAt).getTime()
        const buffer = 8.64e+7 * 7
        return new Date(millis + buffer).toDateString()
    }

    return (
        isLoading ? 
            <Loader /> :
            error ? 
                toast(error?.data?.message || error?.error) :
                (orders && orders.length === 0) ?
                    toast('Sorry, there are no orders linked to your account') && <Navigate to={'/profile'} /> :
                    <div className='max-w-[1200px] mx-auto mt-12'>
                        {orders.map((order, idx)=>(
                            <Link to={`/order/${order._id}`} className='md:w-fit relative text-gray-50 flex flex-col md:flex-row bg-gray-800 rounded-md items-center justify-around gap-4 sm:px-4 mb-8 py-6 md:py-3.5 [&:not(:last-child)]:border-b-[2px] border-gray-800'>
                                <div className='border-b-[1px] md:border-b-0 md:border-r-[1px] border-gray-600 md:px-6 pb-4 md:pb-0 grid-cols-5 grid md:grid-cols-5 gap-2'>{order.orderItems.slice(0,8).map(item=>(<img className='w-10 sm:w-14 h-10 sm:h-14 bg-gray-50 rounded-md' src={item.image} alt={item.name}/>))}
                                </div>
                                <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
                                    <div className='text-center md:border-r-[1px] border-gray-600 px-2 sm:px-6'>
                                        <p className='text-sm sm:text-base text-gray-400 italic'>Order Created</p>
                                        <p className='text-sm sm:text-base'>{orderDate(order.createdAt)}</p>
                                    </div>
                                    <div className='md:border-r-[1px] border-gray-600 px-2 sm:px-6 text-center'>
                                        <p className='text-sm sm:text-base text-gray-400 italic'>{order.isDelivered ? 'Delivered By' : 'Delivery By'}</p>
                                        <p className='text-sm sm:text-base'>{deliveryDate(order.createdAt)}</p>
                                    </div>
                                    <div className='px-2 sm:px-6 text-center'>
                                        <p className='text-sm sm:text-base text-gray-400 italic'>Payment Status</p>
                                        <p className='text-sm sm:text-base'>{order.isPaid?'PAID':'PENDING'}</p>
                                    </div>
                                </div>
                                <span className='absolute left-3 top-0 -translate-y-1/2 px-2 py-.5 rounded-full bg-gray-900 flex justify-center items-center text-gray-400 text-[.925rem]'>ORDER-ID:{order._id}</span>
                            </Link>
                        ))}
                    </div>
    )
}

export default OrdersScreen