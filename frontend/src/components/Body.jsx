import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import SendMail from './SendMail'
import { useSelector } from 'react-redux'
import Profile from './Profile'

const Body = () => {
  const { open, profile } = useSelector(state => state.app)

  return (
    <div className='flex'>
      <Sidebar />

      <Outlet />
      {
        profile && <Profile/>
      }


      {
        open && <SendMail />
      }

    </div>
  )
}

export default Body
