import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdLogout } from "react-icons/md";
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { setUser } from '../app/appSlice';
const Profile = () => {
    const user = useSelector(state=>state.app.user)
    const dispatch = useDispatch()
    const handleLogout = async() =>{
        signOut(auth).then(()=>{
            dispatch(setUser(null))
        }).catch((err)=>{
            console.log(err)
        })
    }
  return (
    <div className={`absolute right-5 p-5 flex flex-col items-center text-center  gap-3 rounded-lg shadow-lg bg-white`}>
     
        {user.email}
      
      
        <img src={user.image} alt="profile" className='rounded-full w-16 h-16 object-cover object-center' />
        <h2>Hi, {user.name}!</h2>
      
     
        <button className='flex items-center gap-2 border rounded-full  py-2 px-4 outline-none hover:bg-gray-200' onClick={handleLogout}>
        <MdLogout />
            Sign Out</button>
      

    </div>
  )
}

export default Profile
