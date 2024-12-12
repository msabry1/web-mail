import React from 'react'
import { IoMdArrowBack } from "react-icons/io";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GoTrash,GoArchive } from "react-icons/go";
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
const MailDetails = () => {
    const navigate = useNavigate()
    const mail = useSelector(state => state.app.selectedMail)
    const handleDelete = async() =>{
        try{
            await deleteDoc(doc(db,"emails",mail.id))
            navigate("/")
        }catch(err){
            console.log(err)
        }
    }
    return (
        <div className='bg-white p-2 rounded-lg w-full lg:mr-5'>
           <div className='flex items-center'>
           <div className='rounded-full hover:bg-gray-200 w-fit p-2'>
                <IoMdArrowBack size={20} className='cursor-pointer' onClick={() => navigate("/")} />
            </div>
            <div className='rounded-full hover:bg-gray-200 w-fit p-2'>
                <GoArchive size={16} className='cursor-pointer' />
            </div>

            <div className='rounded-full hover:bg-gray-200 w-fit p-2'>
                <GoTrash size={16} className='cursor-pointer' onClick={handleDelete}/>
            </div>
            
           </div>
            <div className='ml-2 mt-5'>
                <h2 className='text-xl'>{
                    mail?.subject
                }</h2>
                <div className='mt-2 mb-5 flex items-center gap-2'>
                    <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="profile_pic" className='w-10 h-10 '/>
                    <div>
                        <h2 className='font-semibold'>{mail.to}</h2>
                        <p className='text-sm'>to me</p>
                    </div>
                </div>
                <p className='mt-4 text-lg'>{mail?.message}</p>
            </div>
        </div>
    )
}

export default MailDetails
