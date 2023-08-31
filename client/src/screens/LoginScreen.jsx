import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useLoginUserMutation } from '../slices/usersApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { setCredentials } from '../slices/authSlice'
import Spinner from '../components/Spinner'

const LoginScreen = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { userInfo } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [loginUser, { isLoading }] = useLoginUserMutation()

    const navigate = useNavigate()
    const [ searchParam ] = useSearchParams()
    let redirect = searchParam.get('redirect') || '/'
    
    useEffect(() => {
    userInfo && navigate(redirect)
    }, [userInfo, navigate, redirect])

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const res = await loginUser({email, password}).unwrap()
            dispatch(setCredentials({...res}))
        } catch (error) {
            toast(error?.data?.message || error?.error)
        }
    }

    function handleChange(e) {
        const { value, id } = e.target
        setFormData(formData => (
            {
                ...formData,
                [id]: value
            }
        ))
    }


    const { email, password } = formData
    return (
        <div className='mt-16 sm:mt-12 flex justify-center items-center px-4 sm:px-0'>
            <div className='flex-none w-full p-0 rounded-lg sm:p-12 sm:bg-slate-800 sm:w-fit'>
                <h3 className='text-center text-gray-400 font-bold text-2xl mb-12'>Hello, welcome back!</h3>
                <form onSubmit={handleSubmit} className='[&>*]:block [&>*]:mb-5'>
                    <div className='relative'>
                        <label className='absolute top-0 px-2 ml-2 text-gray-400 -translate-y-1/2 bg-gray-900 sm:bg-gray-800' htmlFor="email">Email</label>
                        <input
                            className='text-purple-200 focus:outline-none focus:border-orange-500 w-full sm:w-80 bg-transparent border-[2px] px-5 py-3 border-orange-700 rounded-md placeholder:text-gray-700 sm:placeholder:text-gray-600'
                            type="email"
                            id='email'
                            onChange={handleChange}
                            value={email}
                            placeholder='apj@greatness.com'
                            autoComplete='false'
                        />
                    </div>
                    <div className='relative'>
                        <label className='absolute top-0 px-2 ml-2 text-gray-400 -translate-y-1/2 bg-gray-900 sm:bg-gray-800' htmlFor="password">Password</label>
                        <input
                            className='text-purple-200 focus:outline-none focus:border-orange-500 w-full sm:w-80 bg-transparent border-[2px] px-5 py-3 border-orange-700 rounded-md placeholder:text-gray-700 sm:placeholder:text-gray-600'
                            type="password"
                            id='password'
                            value={password}
                            onChange={handleChange}
                            placeholder='$Wing5fire'
                            autoComplete='new-password'
                        />
                    </div>
                    <button className='w-full px-5 py-3 font-bold tracking-wider uppercase bg-orange-700 rounded-md mt-7 text-gray-50' type='submit' disabled={isLoading}><div className='flex justify-center items-center gap-2'>Login {isLoading && <Spinner />}</div></button>
                </form>
                <p className='text-end mr-2 mt-6 text-gray-400'>New to Nariimei? &nbsp;<Link className=' text-purple-500' to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link></p>
            </div>
        </div>
    )
}

export default LoginScreen