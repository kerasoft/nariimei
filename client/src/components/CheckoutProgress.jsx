import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutProgress = ({login, address, payment, placeOrder}) => {
  return (
    <div className='flex justify-center pt-4 pb-2 italic bg-gray-900 sticky top-12 z-10'>
        <Link onClick={(e)=>(
            e.preventDefault())} className={login ? 'text-purple-400 cursor-not-allowed' : 'text-gray-500'} to={'/login?redirect=/shipping'}>Sign In &mdash;&nbsp;</Link>
        <Link onClick={(e)=>(
            !address && e.preventDefault())} className={address ? 'text-purple-400' : 'text-gray-500 cursor-default'} to={'/shipping'} >Shipping &mdash;&nbsp;</Link>
        <Link onClick={(e)=>(
            !payment && e.preventDefault())} className={payment ? 'text-purple-400' : 'text-gray-500 cursor-default'} to={'/payment'} >Payment &mdash;&nbsp;</Link>
        <Link onClick={(e)=>(
            !placeOrder && e.preventDefault())} className={placeOrder ? 'text-purple-400' : 'text-gray-500 cursor-default'} to={'/place-order'} >Place Order</Link>
    </div>
  )
}

export default CheckoutProgress