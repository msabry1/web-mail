import React from 'react'
import Navbar from './Navbar'
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import Body from './Body'
import Inbox from './Inbox'
import MailDetails from './MailDetails'

const Home = () => {
    const router = createBrowserRouter([
        {
            path:"/",
            element:<Body/>,
            children:[
                {
                    path:"/",
                    element:<Inbox/>
                },
                {
                    path:"/mail/:id",
                    element:<MailDetails/>
                },
            ]
        }
    ])
  return (
    <>
      <Navbar/>
      <RouterProvider router={router}/>
    </>
  )
}

export default Home
