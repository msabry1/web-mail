import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { setEmails, setSelectedMail } from '../app/appSlice'
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import {useNavigate} from "react-router-dom"

const Inbox = () => {
  const menuItems = [
    {
      src: "/inbox.png",
      text: "Primary"
    },
    {
      src: "/tag.png",
      text: "Promotions"
    },
    {
      src: "/social.png",
      text: "Social"
    },
  ]
  const {emails,searchText} = useSelector(state=>state.app)
  const [tempEmails,setTempEmails] = useState(emails)
  const [active,setActive] = useState(0)
  const dispatch = useDispatch()
  const navigate = useNavigate() 
  useEffect(()=>{
    const q = query(collection(db,"emails"),orderBy('createdAt','desc'))
    const emails = onSnapshot(q,(snapshot)=>{
      const allEmails = snapshot.docs.map((doc)=>({...doc.data(),id:doc.id}));
      dispatch(setEmails(allEmails))
    })
    return () => emails()
  },[])
  useEffect(()=>{
    const filteredEmails = emails.filter((email)=>{
      return email.subject.toLowerCase().includes(searchText.toLowerCase()) || email.to.toLowerCase().includes(searchText.toLowerCase()) || email.message.toLowerCase().includes(searchText.toLowerCase())
    })
    setTempEmails(filteredEmails)
  },[searchText,emails])
  const handleClick = (email) =>{
    navigate(`/mail/${email.id}`)
    dispatch(setSelectedMail(email))
  }
  return (
    <div className='bg-white rounded-lg flex flex-col w-full lg:mr-5'>
      <div className='md:flex hidden lg:gap-5 gap-2 items-center inbox-nav'>

        {
          menuItems.map((item,index) => {
            return <div className={`flex items-center gap-3 hover:bg-gray-100 cursor-pointer  px-5 py-3 ${active==index ? 'text-indigo-500  border-b-2 border-indigo-500':''}`} key={index} onClick={()=>setActive(index)}>
              <img src={item.src} alt={item.text} width={20} />
              {item.text}
            </div>
          })
        }

      </div>
      <div className='flex flex-col'>
       {
        tempEmails.map((email)=>{
          return <div key={email.id} className='flex gap-2 items-center  justify-between border-b h-10 p-2  cursor-pointer hover:shadow-lg ' onClick={()=>handleClick(email)}>
          <div className='items-center gap-2 w-1/4 min-w-fit  flex'>
          <MdCheckBoxOutlineBlank />
            <p className='font-semibold'>{email.to}</p>
          </div>
           
          <div className='w-full overflow-hidden h-full '>
          <p>{email.subject}</p>
          </div>
          <div className='min-w-fit hidden md:block'>
          <p>{new Date(email?.createdAt?.seconds*1000).toUTCString().slice(5,11)}</p>
          </div>
           
          </div>
        })
       }
      </div>
    </div>
  )
}

export default Inbox
