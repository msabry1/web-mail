import React from 'react'
import {useSelector} from "react-redux"
import Login from './components/Login'
import Home from './components/Home'
import "./App.css"
const App = () => {
  const user = useSelector(state=>state.app.user)
  return (
    <>
     
      {
        user ? <Home/> : <Login/>
      }
    </>
  )
}

export default App
