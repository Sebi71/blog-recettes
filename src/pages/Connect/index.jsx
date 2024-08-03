/* eslint-disable react/prop-types */
import NavBar from '../../components/NavBar'
import SignInSignUp from '../../components/SignInSignUp'
import './index.scss'
import { Navigate } from 'react-router-dom'

export default function Connect({user}) {
    if(user){
        return <Navigate to="/dashboard" />
    }
    
  return (
    <>
        <NavBar />
        <SignInSignUp />
    </>
  )
}