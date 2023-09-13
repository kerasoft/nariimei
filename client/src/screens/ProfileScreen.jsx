import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useLogoutUserMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import { clearAddrAndPayment, clearCartItems } from '../slices/cartSlice'
import { toast } from 'react-toastify'

const ProfileScreen = () => {
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.auth)
    
    const { pathname } = useLocation()
    const navigate = useNavigate()
    
    const [logoutUser, { isLoading }] = useLogoutUserMutation()

    async function handleLogout() {
        try {
            await logoutUser()
            dispatch(setCredentials(null))
            dispatch(clearAddrAndPayment())
            dispatch(clearCartItems())
            navigate('/login')
        } catch (error) {
            toast(error?.data?.message || error?.error)
        }
    }
    return (
        <div className='max-w-[1100px] mx-auto py-8 lg:py-16 lg:flex flex-row-reverse gap-8'>
            <div className='relative bg-black p-4 md:p-6 rounded-lg lg:rounded-xl lg:border-none shadow-sm py-5 lg:w-[25rem]'>
            {userInfo.isAdmin && <span className='uppercase bg-slate-800 text-gray-400 tracking-wider text-[.875rem] rounded-full px-2 py-1 font-semibold absolute left-4 top-0 -translate-y-1/2'>admin</span>}
                <div className='flex justify-between items-center border-b-[1px] border-gray-700 pb-4'>
                    <h4 className='text-lg text-gray-400 capitalize'>{userInfo.name}</h4>
                    <button type='button' onClick={handleLogout} className={`px-4 py-2 bg-orange-700 text-sm rounded-lg text-gray-50 font-bold tracking-wider ${isLoading && 'bg-gray-600'}`} disabled={isLoading}>LOGOUT</button>
                </div>
                <h6 className='text-lg text-gray-200 mt-4'>{userInfo.email}</h6>
                {userInfo.address.length && <address className='text-[.925rem] sm:text-base text-gray-300 mt-4 mb-6'>
                    {userInfo.address[0]?.line1} <br />
                    {userInfo.address[0]?.line2} <br />
                    {userInfo.address[0]?.city} {userInfo.address[0]?.state} <br />
                    {userInfo.address[0]?.pin}
                </address>}
                <ul>
                    <li>
                        <Link to={'/new-address'} state={pathname} className='text-[.9rem] text-purple-500'>Add Address</Link>
                    </li>
                    <li className='mt-1'>
                        <Link to={'/update-password'} className='text-[.9rem] text-purple-500'>Change Password</Link>
                    </li>
                </ul>
            </div>
            <ul className='lg:flex-1 text-[.875rem] bg-gray-800 p-4 md:p-6 rounded-lg lg:rounded-xl lg:border-none shadow-sm mt-5 lg:mt-0 text-gray-300 uppercase font-semibold space-y-2 tracking-wider'>
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