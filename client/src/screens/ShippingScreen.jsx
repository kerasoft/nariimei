import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { saveShippingAddress } from '../slices/cartSlice'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import CheckoutProgress from '../components/CheckoutProgress'
import { toast } from 'react-toastify'

const ShippingScreen = () => {
    const [addrIndex, setAddrIndex] = useState(null)
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.auth)


    useEffect(() => {
        !userInfo?.address.length && navigate('/new-address', {state:pathname})
    }, [navigate, userInfo.address, pathname])

    function handleSelectAddr(idx) {
        const address = document.querySelectorAll('.address')
        address.forEach(el=>{
            el.classList.remove('bg-orange-800')
            el.lastChild.classList.add('hidden')
        })
        address[idx].firstChild.checked = true
        address[idx].classList.add('bg-orange-800')
        address[idx].lastChild.classList.remove('hidden')
        setAddrIndex(idx)
    }

    function handleSubmit(e) {
        e.preventDefault()
        if(addrIndex!==null) {
            dispatch(saveShippingAddress(userInfo.address[addrIndex]))
            navigate('/payment')
        }else{
            toast('Please select an address for shipping or add a new address')
        }
    }
    
    return (
        <React.Fragment >
            <CheckoutProgress login address />
            <div className='sm:mt-5 flex justify-center items-center px-4 sm:px-0'>
                <div className='flex-none w-full p-0 rounded-lg sm:px-12 py-10 sm:bg-slate-800 sm:w-fit'>
                    <h3 className='text-center text-gray-400 font-bold text-xl sm:text-2xl mb-12'>Select address</h3>
                    <form onSubmit={handleSubmit} className='[&>*]:block [&>*]:mb-8'>
                            {userInfo.address.map((addr, idx) => (
                                <div key={idx} onClick={()=>handleSelectAddr(idx)} className='select-none address relative cursor-pointer focus:outline-2 flex text-gray-200 bg-gray-700 px-5 py-3 rounded-lg sm:text-lg font-semibold italic'>
                                    <input type="radio" className='hidden'/>
                                    <div className='mt-2'>
                                        {addr.line1} <br />
                                        {addr.line2} <br />
                                        {addr.city}, {addr.pin}
                                    </div>
                                    <div className='absolute top-0 left-4 -translate-y-1/2 uppercase px-2 py-1 rounded-full bg-black text-sm'>address {idx + 1}</div>
                                    <BsFillCheckCircleFill className='hidden absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 text-gray-200' size={36}/>
                                </div>
                            ))}

                        <button className='w-full px-5 py-3 font-bold tracking-wider uppercase bg-orange-700 rounded-md mt-7 text-gray-50' type='submit'>proceed to payment</button>
                    </form>
                    <p className='text-end mr-2 mt-6 text-gray-400'>Different Address? &nbsp;<Link className=' text-purple-500' to={'/new-address'} state={pathname}>Add New Address</Link></p>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ShippingScreen