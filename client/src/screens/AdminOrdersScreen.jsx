import React, { useEffect, useState } from 'react'
import { useGetOdersQuery } from '../slices/ordersApiSlice'
import Loader from '../components/Loader'
import {BsFillCheckCircleFill, BsXCircleFill } from 'react-icons/bs'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'


const AdminOrdersScreen = () => {
  const navigate = useNavigate()
  const [searchParam] = useSearchParams()
  const [page, setPage] = useState(0)
  const { data:orders, isLoading, error } = useGetOdersQuery(page)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(()=>{
    orders && setTotalPages((orders[1]))
    let pageNum = Number(searchParam.get('page'))
    if(pageNum >= 0 && pageNum <= totalPages){
      setPage(pageNum)
    }
  },[searchParam, orders, totalPages])

  function formatDate(createdAt){
    let date = new Date(createdAt).toLocaleDateString().split('/')
    return date = `${date[1]}/${date[0]}/${date[2]}`
  }
  
  function handlePageChange(e){
    const {value} = e.target
    value && navigate(`/admin/orders?page=${value-1}`)
  }
  return (
    isLoading ? 
      <Loader /> :
      error ? 
        toast(error?.data?.message || error?.error) :
      <div className='mx-auto max-w-[1200px] mt-8'>
        <div className='flex justify-end gap-2 pr-2 mb-3 font-semibold text-gray-50'>
          <div>
            <label className='mr-2' htmlFor="page">Page {page + 1}</label>
            <input placeholder={`max ${totalPages + 1}`} onChange={handlePageChange} id='page' type="number" min={1} max={totalPages} className='placeholder:text-sm placeholder:italic placeholder:font-normal bg-transparent w-20 text-center outline-none border-[2px] border-orange-700 rounded-md h-9 px-2'/>
          </div>
          <button disabled={page<=0} type='button' onClick={()=>navigate(`/admin/orders?page=${(page>0) ? (page-1) : 0}`)} className='px-3 py-1 bg-gray-600 rounded-md'>Prev</button>
          <button disabled={orders[0].length<12} type='button' onClick={()=>navigate(`/admin/orders?page=${orders[0].length===12 ? (page+1) : page}`)} className='px-3 py-1 bg-gray-600 rounded-md'>Next</button>
        </div>
        <div className='lg:scrollbar orders-table overflow-x-scroll border-gray-600 pb-[15px]'>
          <table className="w-[1200px] text-gray-300 bg-gray-800">
            <thead className='bg-gray-700'>
              <tr className='[&>*]:p-2 [&>*]:px-5 [&>*]:text-start'>
                <th>Order Date</th>
                <th>Order Id</th>
                <th>User</th>
                <th>Items</th>
                <th>Total</th>
                <th>Delivery</th>
                <th>Pay</th>
              </tr>
            </thead>
            <tbody className='[&>*:nth-child(odd)]:bg-gray-900'>
              {!orders[0].length ? <Navigate to={`/admin/orders?page=${(page-1)< 0 ? 0: (page-1)}`} replace={true} /> : orders[0]?.map((order,idx)=>(
                <tr onClick={()=>navigate(`/admin/orders/${order._id}`)} className='cursor-pointer [&>*]:p-2 [&>*]:px-5 [&>*]:text-start [&:odd'>
                  <td className='flex gap-2'>{formatDate(order.createdAt)}</td>
                  <td className='uppercase'>{order._id}</td>
                  <td className='capitalize'>{order.user.name}</td>
                  <td>{order.orderItems[0].name} {(order.orderItems.length-1) ? `& ${(order.orderItems.length-1)}` : '' }</td>
                  <td>&#8377; {order.totalPrice}</td>
                  <td>{order.isDelivered ? <BsFillCheckCircleFill size={23} fill='green'/> : <BsXCircleFill size={23} fill='#b91c1c'/>}</td>
                  <td>{order.isPaid ? <BsFillCheckCircleFill size={23} fill='green'/> : <BsXCircleFill size={23} fill='#b91c1c'/>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  )
}

export default AdminOrdersScreen