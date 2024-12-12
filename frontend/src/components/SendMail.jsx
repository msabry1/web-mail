import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { setOpen } from '../app/appSlice';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const SendMail = () => {
    const initialData = {
        to:"",
        subject:"",
        message:"",
    }
    const [formData,setFormData] = useState(initialData)
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch()
    const handleChange = (e) =>{
        const {name,value} = e.target;

        setFormData({
            ...formData,
            [name]:value
        })
    }
    const sendMail = async(e) =>{
        e.preventDefault()
        setLoading(true)
        await addDoc(collection(db,"emails"),{
            to:formData.to,
            subject:formData.subject,
            message:formData.message,
            createdAt:serverTimestamp()
        })
        setLoading(false)
        setFormData(initialData)
    }

  return (
    <div className='absolute bottom-0 lg:right-16 right-0 rounded-t-lg lg:w-1/3 w-full  bg-white p-5 shadow-lg'>
      <div className='flex items-center bg-gray-200 p-2 rounded-lg mb-3 justify-between'>
        <span>New Message</span>
        <IoMdClose className='cursor-pointer' onClick={()=>dispatch(setOpen(false))}/>
      </div>
      <form className='flex flex-col gap-3' onSubmit={sendMail}>
        <div className='border-b flex items-center gap-3  pb-1'>
            <span>To</span>
        <input type="email" name='to' value={formData.to} onChange={handleChange} className='outline-none' required/>
        </div>
        <div className='border-b flex items-center gap-3  pb-1'>
            <span>Subject</span>
        <input type="text" name='subject' value={formData.subject} onChange={handleChange} className='outline-none' required/>
        </div>
       
            <textarea  name='message' value={formData.message} onChange={handleChange} className='outline-none h-44'></textarea>
    
        <div>
            <button type='submit' className='bg-[#1A73E8] text-white px-4 py-1 rounded-full'>{loading ? 'Sending...':'Send'}</button>
        </div>
      </form>

    </div>
  )
}

export default SendMail
