import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { useLogoutUserMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'
import { useGetUserProfileMutation } from '../slices/usersApiSlice'
import Loader from '../components/Loader'

const ProfileScreen = () => {
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.auth)

    const [userData, setUserData] = useState({})

    let [getUserProfile, { isLoading: isLoadingUser, error: profileFetchError }] = useGetUserProfileMutation()

    const navigate = useNavigate()

    const [logoutUser, { isLoading }] = useLogoutUserMutation()

    useEffect(() => {
        async function getUser() {
            const res = await getUserProfile()
            setUserData(res.data)
        }
        getUser()
    }, [getUserProfile,])

    async function handleLogout() {
        try {
            await logoutUser()
            dispatch(setCredentials(null))
            navigate('/login')
        } catch (error) {
            toast(error?.data?.message || error?.error)
        }
    }
    return (
        !userInfo ? 
            <Navigate to={'/login'} /> : 
            isLoadingUser ? 
                <Loader /> :
                profileFetchError ? 
                    toast(profileFetchError?.data?.message || profileFetchError.error) : 
                    <div className='max-w-[1100px] mx-auto py-8 lg:py-16 lg:flex flex-row-reverse gap-8'>
            <div className='relative bg-black p-4 md:p-6 rounded-lg lg:rounded-xl lg:border-none shadow-sm border-[1px] border-gray-700 py-5 lg:w-[25rem]'>
            <span className='uppercase bg-slate-800 text-gray-400 tracking-wider text-[.875rem] rounded-full px-2 py-1 font-semibold absolute left-4 top-0 -translate-y-1/2'>admin</span>
                <div className='flex justify-between items-center border-b-[1px] border-gray-700 pb-4'>
                    <h4 className='text-lg text-gray-400 capitalize'>{userData?.name}</h4>
                    <button type='button' onClick={handleLogout} className={`px-4 py-2 bg-orange-700 text-sm rounded-lg text-gray-50 font-bold tracking-wider ${isLoading && 'bg-gray-600'}`} disabled={isLoading}>LOGOUT</button>
                </div>
                {/* <h6 className='text-lg text-gray-200 mt-4'>{email}</h6> */}
                <address className='text-gray-200 mt-4 mb-6'>
                    #401, 4th Floor <br />
                    Madhuram Building, 8th Cross <br />
                    Venkateshwara Layout <br />
                    560037
                </address>
                <Link to={'/update-password'} className='text-sm text-purple-500'>Change Password</Link>
            </div>
            <ul className='lg:flex-1 text-[.925rem] bg-gray-800 p-4 md:p-6 rounded-lg lg:rounded-xl lg:border-none shadow-sm border-[1px] border-gray-700 mt-5 lg:mt-0 text-gray-200 uppercase font-semibold space-y-2'>
                <li>
                    <Link>Orders</Link>
                </li>
                <li>
                    <Link>Coupons</Link>
                </li>
            </ul>
        </div>
    )
}

export default ProfileScreen