import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import GoogleButton from 'react-google-button'
import { auth, provider } from '../firebase'
import { useDispatch } from 'react-redux'
import { setUser } from '../app/appSlice'
const Login = () => {
    const dispatch = useDispatch()
    const signInWithGoogle = async() =>{
        try{
            const res = await signInWithPopup(auth,provider);
            dispatch(setUser({
                name:res.user.displayName,
                email:res.user.email,
                image:res.user.photoURL
            }))
        }catch(error){
            console.log(error)
        }
    }
    return (
        <div className='h-screen w-full flex items-center justify-center'>
            <GoogleButton
                onClick={signInWithGoogle}
            />
        </div>
    )
}

export default Login
