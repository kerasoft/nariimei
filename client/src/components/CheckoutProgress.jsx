import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutProgress = ({login, address, payment, status}) => {
  return (
    <div className='flex justify-center pt-4 pb-2 italic bg-gray-900 sticky top-12 z-10'>
        <Link onClick={(e)=>(
            !login && e.preventDefault())} className={login ? 'text-purple-400' : 'text-gray-500'} to={'/login?redirect=/shipping'}>Login &mdash;&nbsp;</Link>
        <Link onClick={(e)=>(
            !address && e.preventDefault())} className={address ? 'text-purple-400' : 'text-gray-500 cursor-default'} to={'/shipping'} >Shipping &mdash;&nbsp;</Link>
        <Link onClick={(e)=>(
            !payment && e.preventDefault())} className={payment ? 'text-purple-400' : 'text-gray-500 cursor-default'} to={'/payment'} >Payment &mdash;&nbsp;</Link>
        <Link onClick={(e)=>(
            !status && e.preventDefault())} className={status ? 'text-purple-400' : 'text-gray-500 cursor-default'} to={'/order-status'} >Order Status</Link>
    </div>
  )
}

export default CheckoutProgress