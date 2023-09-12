import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { savePaymentMethod } from '../slices/cartSlice'
import CheckoutProgress from '../components/CheckoutProgress'
import { toast } from 'react-toastify'
import PayPal from '../images/paypal.png'
import Gpay from '../images/gpay.png'
import COD from '../images/cod.svg'

const PaymentScreen = () => {
    const { pathname } = useLocation()
    const [payMethod, setPayMethod] = useState(null)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { shippingAddress, cartItems } = useSelector(state => state.cart)

    useEffect(() => {
      if(!cartItems.length) {
        navigate('/cart')
      }
      if(!shippingAddress) {
        navigate('/shipping')
      }
    }, [navigate, shippingAddress, cartItems.length])

    function handleChange(e){
      setPayMethod(e.currentTarget.name)
    }

    function handleSubmit(e) {
      e.preventDefault()
      if(payMethod && payMethod === 'CashOnDelivery') {
        dispatch(savePaymentMethod(payMethod))
        navigate('/place-order', {state: pathname})
      }else{
        if(payMethod && payMethod !== 'CashOnDelivery') {
          toast('Sorry, Only cash on delivery available at this time')
        } else {
          toast('Select a payment method to proceed')
        }
      }
    }
    
    return (
       (cartItems.length && shippingAddress) && <React.Fragment >
            <CheckoutProgress login address payment />
            <div className='sm:mt-12 flex justify-center items-center px-4 sm:px-0'>
                <div className='relative sm:min-w-[30rem] flex-none w-full p-0 rounded-lg sm:px-12 py-10 sm:bg-slate-800 sm:w-fit'>
                    <h3 className='sm:absolute top-0 -translate-y-1/2 bg-gray-900 px-3 py-2 rounded-full text-center text-gray-50 font-semibold text-xl sm:text-2xl'>Payment Method</h3>
                    <form onSubmit={handleSubmit} className='[&>*]:block [&>*]:mb-4 mt-6'>
                      <div className='w-full relative'>
                        <input name='PayPal' id="paypal" onChange={handleChange} type="radio" checked={payMethod==='PayPal'} className="w-5 h-5 absolute top-1/2 left-8 -translate-y-1/2"/>
                        <label htmlFor="paypal" className="w-full rounded-lg flex justify-center bg-black"><img className="w-36 rounded-lg px-2" src={PayPal} alt="paypal" /></label>
                      </div>
                      <div className='w-full relative'>
                        <input name='Gpay' id="gpay" onChange={handleChange} type="radio" checked={payMethod==='Gpay'} className="w-5 h-5 absolute top-1/2 left-8 -translate-y-1/2"/>
                        <label htmlFor="gpay" className="w-full rounded-lg flex justify-center bg-gray-500 py-2.5"><img className="w-[8rem] rounded-lg px-2" src={Gpay} alt="googlepay" /></label>
                      </div>
                      <div className='w-full relative'>
                        <input name='CashOnDelivery' id="COD" onChange={handleChange} type="radio" checked={payMethod==='CashOnDelivery'} className="w-5 h-5 absolute top-1/2 left-8 -translate-y-1/2"/>
                        <label htmlFor="COD" className="w-full h-[4rem] overflow-hidden rounded-lg flex justify-center bg-gray-500"><img className="w-[9rem] rounded-lg px-2" src={COD} alt="cash on delivery" /></label>
                      </div>
                      <button className='w-full px-5 py-3 font-bold tracking-wider uppercase bg-orange-700 rounded-md mt-8 text-gray-50' type='submit'>preview order</button>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}

export default PaymentScreen