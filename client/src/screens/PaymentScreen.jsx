import React from 'react'
import CheckoutProgress from '../components/CheckoutProgress'

const PaymentScreen = () => {
  return (
    <React.Fragment>
        <CheckoutProgress login address payment />
        <div className='text-gray-50'>PaymentScreen</div>
    </React.Fragment>
  )
}

export default PaymentScreen