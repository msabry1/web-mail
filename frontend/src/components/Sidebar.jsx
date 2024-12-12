import React from 'react'
import { GoPencil, GoClock } from "react-icons/go";
import { FaRegStar } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { VscSend } from "react-icons/vsc";
import { useDispatch } from 'react-redux';
import { setOpen } from '../app/appSlice';
const Sidebar = () => {
    const dispatch = useDispatch()
    
    return (
        <div className='w-[20%]  flex pr-4 flex-col gap-5 sidebar text-gray-800'>
            <div className='flex gap-3 ml-3 items-center  w-fit bg-[#C2E7FF] p-4 rounded-xl cursor-pointer hover:shadow-lg' onClick={()=>dispatch(setOpen(true))}>
                <GoPencil size={18}/>
                <span className='font-semibold text-sm'>Compose</span>
            </div>
            <div className='flex flex-col gap-1'>
                <div className='flex items-center gap-5 pl-5 pr-2 py-2 bg-gray-300 cursor-pointer rounded-r-full'>
                    <img src="/inbox.png" alt="inbox" width={20} />
                    <span className='font-semibold'>Inbox</span>
                </div>
                <div className='flex items-center gap-5 pl-5 pr-2 py-2 hover:bg-gray-300 cursor-pointer rounded-r-full'>
                    <FaRegStar />
                    <span>Starred</span>
                </div>
                <div className='flex items-center gap-5 pl-5 pr-2 py-2 hover:bg-gray-300 cursor-pointer rounded-r-full'>
                    <GoClock />
                    <span>Snoozed</span>
                </div>
                <div className='flex items-center gap-5 pl-5 pr-2 py-2 hover:bg-gray-300 cursor-pointer rounded-r-full'>
                    <VscSend/>
                    <span>Sent</span>
                </div>
                <div className='flex items-center gap-5 pl-5 pr-2 py-2 hover:bg-gray-300 cursor-pointer rounded-r-full'>
                    <img src="/draft.png" alt="inbox" width={20} />
                    <span>Drafts</span>
                </div>
                <div className='flex items-center gap-5 pl-5 pr-2 py-2 hover:bg-gray-300 cursor-pointer rounded-r-full'>
                   <IoIosArrowDown/>
                    <span>More</span>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
