import React from 'react'
import "./Login.css"

const Login = () => {
  return (
    <div className='Login-container bg-white flex'>
      <div className="Login flex flex-col gap-3">
            <h1 className='font-extrabold'>Login</h1>
        <input className='border border-black' type="text" placeholder='Username' />
        <input className='border border-black' type="password" placeholder='Password' />
        <button className='hover:font-bold'>Login</button>
      </div>
    </div>
  )
}

export default Login
