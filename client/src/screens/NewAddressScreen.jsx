import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../slices/cartSlice'
import { toast } from 'react-toastify'
import { useUpdateUserMutation } from '../slices/usersApiSlice'
import Spinner from '../components/Spinner'
import { setCredentials } from '../slices/authSlice'
import CheckoutProgress from '../components/CheckoutProgress'

const NewAddressScreen = () => {
    const { state: prevPath } = useLocation()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        line1: '',
        line2: '',
        city: '',
        state: 'Karnataka',
        pin: ''
    })

    const [saveAddr, setSaveAddr] = useState(false)

    const dispatch = useDispatch()
    const { shippingAddress } = useSelector(state => state.cart)

    const [updateUser, { isLoading }] = useUpdateUserMutation()

    useEffect(()=>{
        (prevPath==='/shipping' && shippingAddress) && setFormData({...shippingAddress})
    },[shippingAddress, prevPath, navigate])

    function handleChange(e) {
        const {value, id} = e.target
        setFormData(formData => ({
            ...formData,
            [id]: value
        }))
    }

    function handleSaveAddr(e) {
        document.getElementById('checkBox').classList.toggle('bg-gray-200')
        setSaveAddr(!saveAddr)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if(!Object.values(formData).every(value=>(Boolean(value.trim())))){
            toast('All fields are required')
            let emptyInputs = []
            for(let [key, value] of Object.entries(formData)){
                if(value.trim()==='') {
                    emptyInputs.push(key)
                }
            }
            document.getElementById(emptyInputs[0]).focus()
        } else {
            (prevPath === '/shipping') && dispatch(saveShippingAddress(formData))
            if(saveAddr || (prevPath === '/profile')){
                try {
                    const res = await updateUser(formData).unwrap()
                    if(res) {
                        dispatch(setCredentials(res))
                        toast('Address saved on your profile')
                    }
                } catch (error) {
                    toast(error?.data?.message || error?.error)
                }
            }
            navigate((prevPath === '/profile')? prevPath: '/payment')
            
        }
    }
   const {line1, line2, city, state, pin} = formData
  return (
        <React.Fragment>
            {prevPath === '/shipping' && <CheckoutProgress login address />}
            <div className='flex items-center justify-center px-4 sm:mt-8 sm:px-0'>
                <div className='md:max-w-[55vw] lg:max-w-[45vw] mx-auto flex-1 w-full p-0 rounded-lg sm:px-12 py-10 sm:bg-slate-800 sm:w-fit'>
                    <h3 className='mb-12 text-2xl font-bold text-center text-gray-400'> Shipping address</h3>
                    <form onSubmit={handleSubmit} className='[&>*]:block [&>*]:mb-5'>
                        <div className='relative'>
                            <label className='absolute top-0 px-2 ml-2 text-gray-400 -translate-y-1/2 bg-gray-900 sm:bg-gray-800' htmlFor="line1">Line 1</label>
                            <input
                                className='text-gray-100 focus:outline-none focus:border-orange-500 w-full bg-transparent border-[2px] px-5 py-3 border-orange-700 rounded-md placeholder:text-gray-700 sm:placeholder:text-gray-600 capitalize'
                                type="text"
                                id='line1'
                                onChange={handleChange}
                                value={line1}
                                placeholder='#302, 4th floor, Apartment 11'
                                autoComplete='false'
                                autoFocus={!shippingAddress && 'autofocus'}
                            />
                        </div>
                        <div className='relative'>
                            <label className='absolute top-0 px-2 ml-2 text-gray-400 -translate-y-1/2 bg-gray-900 sm:bg-gray-800' htmlFor="line2">Line 2</label>
                            <input
                                className='text-gray-100 focus:outline-none focus:border-orange-500 w-full bg-transparent border-[2px] px-5 py-3 border-orange-700 rounded-md placeholder:text-gray-700 sm:placeholder:text-gray-600 capitalize'
                                type='text'
                                id='line2'
                                value={line2}
                                onChange={handleChange}
                                placeholder='3rd Cross, RR Layout, Kalyan Nagar'
                                autoComplete='false'
                            />
                        </div>
                        <div className='relative'>
                            <label className='absolute top-0 px-2 ml-2 text-gray-400 -translate-y-1/2 bg-gray-900 sm:bg-gray-800' htmlFor="city">City</label>
                            <input
                                className='text-gray-100 focus:outline-none focus:border-orange-500 w-full bg-transparent border-[2px] px-5 py-3 border-orange-700 rounded-md placeholder:text-gray-700 sm:placeholder:text-gray-600 capitalize'
                                type='text'
                                id='city'
                                value={city}
                                onChange={handleChange}
                                placeholder='Bengaluru'
                                autoComplete='false'
                            />
                        </div>
                        <div className='relative'>
                            <label className='absolute top-0 px-2 ml-2 text-gray-400 -translate-y-1/2 bg-gray-900 sm:bg-gray-800' htmlFor="state">State</label>
                            <select className="text-gray-100 focus:outline-none focus:border-orange-500 w-full bg-transparent border-[2px] px-4 py-3 border-orange-700 rounded-md [&>*]:text-gray-50 [&>*]:bg-gray-700" id="state" value={state} onChange={handleChange}>
                                {/* <option selected >--Select an option--</option> */}
                                <option>Karnataka</option>
                                <option>Kerala</option>
                                <option>Tamil Nadu</option>
                                <option>Andra Pradesh</option>
                                <option>Telangana</option>
                            </select>
                        </div>
                        <div className='relative'>
                            <label className='absolute top-0 px-2 ml-2 text-gray-400 -translate-y-1/2 bg-gray-900 sm:bg-gray-800' htmlFor="pin">PIN Code</label>
                            <input
                                className='text-gray-100 focus:outline-none focus:border-orange-500 w-full bg-transparent border-[2px] px-5 py-3 border-orange-700 rounded-md placeholder:text-gray-700 sm:placeholder:text-gray-600'
                                type='text'
                                id='pin'
                                value={pin}
                                onChange={handleChange}
                                placeholder='560078'
                                autoComplete='false'
                            />
                        </div>
                        {prevPath==='/shipping' && <div className='inline-flex'>
                            <div id='checkBox' onClick={handleSaveAddr} className='cursor-pointer -mb-[3px] inline-block border-[2px] border-orange-600 w-5 h-5 rounded-sm'></div>
                            <p onClick={handleSaveAddr} className='inline-block ml-2 text-gray-200 cursor-pointer select-none'>Save this address?</p>
                        </div>}
                        <button className='w-full px-5 py-3 font-bold tracking-wider uppercase bg-orange-700 rounded-md mt-7 text-gray-50' type='submit' disabled={isLoading}>
                            {prevPath === '/profile' ? 'add address' : 'proceed to payment'} {((saveAddr || (prevPath === '/profile')) && isLoading) && <Spinner />}
                        </button>
                    </form>
                </div>
            </div>
        </React.Fragment>
  )
}

export default NewAddressScreen