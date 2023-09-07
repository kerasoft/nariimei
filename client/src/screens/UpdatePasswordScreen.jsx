import React, { useEffect, useState } from 'react'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import Spinner from '../components/Spinner'
import { useUpdateUserMutation } from '../slices/usersApiSlice'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
const UpdatePasswordScreen = () => {
    const [showHint, setShowHint] = useState(false)
    const [showPassword, setShowPassword] = useState({old:false, new:false})
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    })
    
    const passwordRegex = /^[a-z,A-Z,0-9,!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,16}$/

    function handleChange(e){
        const { value, id } = e.target
        setFormData(formData=>({
            ...formData,
            [id]: value.trim()
        }))
    }

    const navigate = useNavigate()
    const { userInfo } = useSelector(state => state.auth)
    
    useEffect(()=>{
        !userInfo && navigate('/login')
    },[userInfo, navigate])

    const [updateUser, { isLoading }] = useUpdateUserMutation()

    async function handleSubmit(e){
        e.preventDefault()
        if(!oldPassword || !newPassword || !confirmNewPassword){
            toast('All fields are required')
        } else {
            if(!passwordRegex.test(newPassword)){
                setShowHint(true)
                toast("Try a different password")
            } else {
                if(newPassword!==confirmNewPassword){
                    toast("New passwords don't match")
                }else {
                    try {
                        const res = await updateUser({...formData}).unwrap()
                        res && toast('Password updated')
                        navigate('/profile')
                    } catch (error) {
                        toast(error?.data?.message || error?.error)
                    }
                }
            }
        }
    }

    const { oldPassword, newPassword, confirmNewPassword } = formData
    return (
        <div className='mt-16 sm:mt-12 flex justify-center items-center px-4 sm:px-0'>
                <div className='flex-none w-full p-0 rounded-lg sm:p-12 sm:bg-slate-800 sm:w-fit'>
                    <h3 className='text-center text-gray-400 font-bold text-2xl mb-12'>Update Password</h3>
                    <form onSubmit={handleSubmit} className='[&>*]:block [&>*]:mb-5'>
                        <div className='relative'>
                            <label className='absolute top-0 px-2 ml-2 text-gray-400 -translate-y-1/2 bg-gray-900 sm:bg-gray-800' htmlFor="email">Old Password</label>
                            <input
                                className='text-purple-200 focus:outline-none focus:border-orange-500 w-full sm:w-80 bg-transparent border-[2px] px-5 py-3 border-orange-700 rounded-md placeholder:text-gray-700 sm:placeholder:text-gray-600'
                                type={showPassword.old ? 'text' : 'password'}
                                id='oldPassword'
                                onChange={handleChange}
                                value={oldPassword}
                                placeholder='$A123456'
                                autoComplete='false'
                            />
                            <div onClick={()=>setShowPassword(showPassword=>({
                                ...showPassword,
                                old: !showPassword.old
                            }))} className='absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-400 cursor-pointer'>
                                {showPassword.old ? <MdVisibilityOff/> : <MdVisibility />}
                            </div>
                        </div>
                        <div className='relative'>
                            <label className='absolute top-0 px-2 ml-2 text-gray-400 -translate-y-1/2 bg-gray-900 sm:bg-gray-800' htmlFor="password">New Password</label>
                            <input
                                className='text-purple-200 focus:outline-none focus:border-orange-500 w-full sm:w-80 bg-transparent border-[2px] px-5 py-3 border-orange-700 rounded-md placeholder:text-gray-700 sm:placeholder:text-gray-600'
                                type={showPassword.new ? 'text' : 'password'}
                                id='newPassword'
                                value={newPassword}
                                onChange={handleChange}
                                placeholder='$A12345678'
                                autoComplete='new-password'
                            />
                            <div onClick={()=>setShowPassword(showPassword=>({
                                ...showPassword,
                                new: !showPassword.new
                            }))} className='absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-400 cursor-pointer'>
                                {showPassword.new ? <MdVisibilityOff/> : <MdVisibility />}
                            </div>
                        </div>
                        {showHint && <p className='text-sm -mt-4 ml-2 text-gray-50'>8-16, can include numbers/special chars.</p>}
                        <div className='relative'>
                            <label className='absolute top-0 px-2 ml-2 text-gray-400 -translate-y-1/2 bg-gray-900 sm:bg-gray-800' htmlFor="password">Confirm New Password</label>
                            <input
                                className='text-purple-200 focus:outline-none focus:border-orange-500 w-full sm:w-80 bg-transparent border-[2px] px-5 py-3 border-orange-700 rounded-md placeholder:text-gray-700 sm:placeholder:text-gray-600'
                                type={showPassword.new ? 'text' : 'password'}
                                id='confirmNewPassword'
                                value={confirmNewPassword}
                                onChange={handleChange}
                                placeholder='$A12345678'
                                autoComplete='new-password'
                            />
                        </div>
                        <button className='w-full px-5 py-3 font-bold tracking-wider uppercase bg-orange-700 rounded-md mt-7 text-gray-50' type='submit' disabled={isLoading}><div className='flex justify-center items-center gap-2'>Update {isLoading && <Spinner />}</div>
                        </button>
                    </form>
                    <p className='text-end mr-2 mt-6 text-gray-400'>Maybe Later? &nbsp;<Link className=' text-purple-500' to={'/profile'}>Go to Profile</Link></p>
                </div>
            </div>
    )
    }

export default UpdatePasswordScreen