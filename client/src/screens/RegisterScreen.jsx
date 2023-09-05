import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useRegisterUserMutation } from '../slices/usersApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'

const RegisterScreen = () => {
    const [showPassword, setShowpassword] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })

    const initialHintState = {
        nameHint: false, 
        emailHint: false,
        passwordHint: false
    }

    const [showHint, setShowHint] = useState(initialHintState)

    const nameRegex = /^[a-z,A-Z ]{3,24}/
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
    const passwordRegex = /^[a-z,A-Z,0-9,!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,16}$/
    
    const navigate = useNavigate()
    const [ searchParam ] = useSearchParams()
    let redirect = searchParam.get('redirect') || '/'

    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.auth)
    const [registerUser, { isLoading }] = useRegisterUserMutation()

    useEffect(() => {
        (userInfo && redirect) && navigate(redirect)
    }, [userInfo, navigate, redirect])

    async function handleSubmit(e){
        e.preventDefault()
        setShowHint(initialHintState)
        if(!email || !name || !password){
            toast('All fields are required')
        } else {
            if(emailRegex.test(email) && nameRegex.test(name) && passwordRegex.test(password)){
                try {
                    const res = await registerUser({...formData}).unwrap()
                    dispatch(setCredentials({...res}))
                } catch (error) {
                    toast(error?.data?.message || error?.error)
                }
            }else {
                !nameRegex.test(name) && setShowHint(showHint=>({...showHint, nameHint: true}))
                !emailRegex.test(email) && setShowHint(showHint=>({...showHint, emailHint: true}))
                !passwordRegex.test(password) && setShowHint(showHint=>({...showHint, passwordHint: true}))
                toast('Some field(s) invalid, check hint/example at each feild')
            }
        }
    }

    function handleChange(e) {
        const {value, id} = e.target
        setFormData(formData=>(
            {
                ...formData,
                [id]: (id==='name')?(value):(value.trim())
            }
        ))
    }
    
    const { name, email, password } = formData
    const { nameHint, emailHint, passwordHint } = showHint
    
    return (
        !userInfo && <div className='mt-16 sm:mt-12 flex justify-center items-center px-4 sm:px-0'>
            <div className='flex-none w-full p-0 rounded-lg sm:p-12 sm:bg-slate-800 sm:w-fit'>
                <h3 className='text-center text-gray-400 font-bold text-2xl mb-12'>Hello, Welcome!</h3>
                <form onSubmit={handleSubmit} className='[&>*]:block [&>*]:mb-5'>
                    <div className='relative'>
                        <label className='absolute top-0 px-2 ml-2 text-gray-400 -translate-y-1/2 bg-gray-900 sm:bg-gray-800' htmlFor="name">Full Name</label>
                        <input 
                            className='capitalize text-purple-200 focus:outline-none focus:border-orange-500 w-full sm:w-80 bg-transparent border-[2px] px-5 py-3 border-orange-700 rounded-md placeholder:text-gray-700 sm:placeholder:text-gray-600' 
                            type="name"
                            id='name'
                            onChange={handleChange}
                            value={name}
                            placeholder='Abdul Kalaam'
                            autoComplete='false'
                        />
                        {nameHint && <p className='text-sm mt-1 ml-2 text-gray-50'>3-24 chars of english alphabet</p>}
                    </div>
                    <div className='relative'>
                        <label className='absolute top-0 px-2 ml-2 text-gray-400 -translate-y-1/2 bg-gray-900 sm:bg-gray-800' htmlFor="email">Email</label>
                        <input 
                            className='text-purple-200 focus:outline-none focus:border-orange-500 w-full sm:w-80 bg-transparent border-[2px] px-5 py-3 border-orange-700 rounded-md placeholder:text-gray-700 sm:placeholder:text-gray-600 lowercase' 
                            type='text'
                            id='email'
                            onChange={handleChange}
                            value={email}
                            placeholder='apj@greatness.com'
                            autoComplete='false'
                        />
                        {emailHint && <p className='text-sm mt-1 ml-2 text-gray-50'>abc@email.com, match this format.</p>}
                    </div>
                    <div className='relative'>
                        <label className='absolute top-0 px-2 ml-2 text-gray-400 -translate-y-1/2 bg-gray-900 sm:bg-gray-800' htmlFor="password">Password</label>
                        <input 
                            className='text-purple-200 focus:outline-none focus:border-orange-500 w-full sm:w-80 bg-transparent border-[2px] px-5 py-3 border-orange-700 rounded-md placeholder:text-gray-700 sm:placeholder:text-gray-600' 
                            type={showPassword ? 'text' : 'password'} 
                            id='password'
                            value={password}
                            onChange={handleChange}
                            placeholder='$Wing5fire'
                            autoComplete='false'
                        />
                        <div onClick={()=>setShowpassword(!showPassword)} className='absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-400 cursor-pointer'>
                            {showPassword ? <MdVisibilityOff/> : <MdVisibility/>}
                        </div>
                    </div>
                    {passwordHint && <p className='text-sm -mt-4 ml-2 text-gray-50'>8-16, can include numbers/special chars.</p>}
                    <button className='flex justify-center items-center gap-2 w-full px-5 py-3 font-bold tracking-wider uppercase bg-orange-700 rounded-md mt-7 text-gray-50' type='submit'><div className='flex items-center gap-2 justify-center'>Register {isLoading && <Spinner />}</div></button>
                </form>
                <p className='text-end mr-2 mt-6 text-gray-400'>Already registerd? &nbsp;<Link className=' text-purple-500' to={'/login'}>Login</Link></p>
            </div>
        </div>
    )
}

export default RegisterScreen