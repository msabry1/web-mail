import React, { useEffect, useState } from 'react'
import { GoSearch } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import { setProfile, setSearchText } from '../app/appSlice';
const Navbar = () => {
    const dispatch = useDispatch()
    const {user,profile} = useSelector(state=>state.app)
    const [input,setInput] = useState('')
    useEffect(()=>{
        dispatch(setProfile(false))
    },[])
    useEffect(()=>{
        dispatch(setSearchText(input))
    },[input])
    return (
        <div className='w-full left-0 flex justify-between gap-2 items-center px-4 py-2'>
            <div>
                <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png" alt="logo" />
            </div>

            <div className='flex items-center gap-2 lg:w-1/2 w-full rounded-full px-3 py-2 lg:text-lg text-sm bg-[#EAF1FB]'>
                <GoSearch />
                <input type="text" placeholder='Search mail' value={input} onChange={(e)=>setInput(e.target.value)} className='bg-transparent outline-none' />
            </div>
            <div onClick={()=>dispatch(setProfile(!profile))} className='cursor-pointer'>
                <img src={user?.image} alt="profile_pic" className='rounded-full w-10 h-10 object-cover object-center' />
            </div>

        </div>
    )
}

export default Navbar
