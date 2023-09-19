import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { savePaymentMethod } from '../slices/cartSlice'
import CheckoutProgress from '../components/CheckoutProgress'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { toast } from 'react-toastify'
import PayOnline from '../images/payonline.png'
import COD from '../images/cod.png'


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

    function handlePayMethod(idx) {
      const payMethod = document.querySelectorAll('.pay-method')
      payMethod.forEach(el=>{
          el.classList.remove('bg-slate-200')
          el.lastChild.classList.add('hidden')
      })
      payMethod[idx].classList.add('bg-slate-200')
      payMethod[idx].lastChild.classList.remove('hidden')
      setPayMethod((idx===0 ? 'Pay Online' : 'Cash On Delivery'))
  }

    function handleClick() {
      if(payMethod) {
        dispatch(savePaymentMethod(payMethod))
        navigate('/place-order', {state: pathname})
      }else{
          toast('Select a payment method to proceed')
      }
    }
    
    return (
       (cartItems.length && shippingAddress) && <React.Fragment >
            <CheckoutProgress login address payment />
            <div className='sm:mt-12 flex justify-center items-center px-4 sm:px-0'>
                <div className='relative sm:min-w-[27.5rem] flex-none w-full p-0 rounded-lg sm:px-12 py-10 sm:bg-slate-800 sm:w-fit'>
                    <h3 className='sm:absolute top-0 -translate-y-1/2 bg-gray-900 px-3 py-2 rounded-full text-center text-gray-200 font-semibold text-xl sm:text-2xl'>Payment Method</h3>
                    <div className='py-2'>
                      <div onClick={()=>{handlePayMethod(0)}} className='select-none pay-method relative cursor-pointer focus:outline-2 flex text-gray-200 bg-gray-50 justify-center rounded-lg sm:text-lg font-semibold italic mb-7 mt-2 px-5 py-2'>
                        <img className='w-[17rem]' src={PayOnline} alt="online payment options" />
                        <div className='absolute top-0 left-4 -translate-y-1/2 uppercase px-3 py-1 rounded-full bg-black text-sm'>Pay online</div>
                        <BsFillCheckCircleFill className='hidden absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 text-gray-50' size={36}/>
                      </div>
                      <div onClick={()=>{handlePayMethod(1)}} className='select-none pay-method relative cursor-pointer focus:outline-2 flex text-gray-200 bg-gray-50 rounded-lg sm:text-lg font-semibold italic justify-center'>
                        <img className='w-[14rem] h-[6.2rem]' src={COD} alt="online payment options" />
                        <div className='absolute top-0 left-4 -translate-y-1/2 uppercase px-3 py-1 rounded-full bg-black text-sm'>cash on Delivery</div>
                        <BsFillCheckCircleFill className='hidden absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 text-gray-50' size={36}/>
                      </div>
                      <button onClick={handleClick} className='w-full px-5 py-3 font-bold tracking-wider uppercase bg-orange-700 rounded-md mt-8 text-gray-50' type='button'>proceed to confirm</button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default PaymentScreen