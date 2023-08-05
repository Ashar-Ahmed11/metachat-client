import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import ChatContext from './context/chatcontext'
import { Link } from 'react-router-dom'
export default function SignUp() {
    const context = useContext(ChatContext)
    const { signup, error } = context
    const [credentials, setcredentials] = useState({ email: '', password: '',firstname:'',lastname:'' })
    const declareLogin = (e) => {
        e.preventDefault()
        signup(credentials)
    }
    return (
        <>
            {error && <div style={{ position: "absolute", width: '100%' }} class="alert alert-danger d-flex justify-content-center" role="alert">
                {error}
            </div>}
            <div className="d-flex justify-content-center  " style={{ position: 'absolute', height: "100%", width: "100%", alignItems: 'center', flexDirection: 'column' }}>
                <div className="container d-flex justify-content-center">
                    <div className="card" style={{ width: '400px' }}>
                        <a style={{ color: "#720D59", fontSize: '50px' }} class="navbar-brand text-center p-2" href="#"><i class="fa-brands fa-rocketchat"></i><span className='px-2'>MetaChat</span></a>
                        <form onSubmit={(e) => declareLogin(e)} className='px-2' >
                            <div className="d-flex">
                            <input value={credentials.firstname} onChange={(e) => { setcredentials({ ...credentials, firstname: e.target.value }) }} type="text" className="myform-control my-2" style={{ backgroundColor: "#720D59" }} placeholder='First Name' />
                            <input value={credentials.lastname} onChange={(e) => { setcredentials({ ...credentials, lastname: e.target.value }) }} type="text" className="myform-control my-2" style={{ backgroundColor: "#720D59" }} placeholder='Last Name' />
                            </div>
                            <input value={credentials.email} onChange={(e) => { setcredentials({ ...credentials, email: e.target.value }) }} type="text" className="myform-control my-2" style={{ backgroundColor: "#720D59" }} placeholder='Email' />
                            <input value={credentials.password} onChange={(e) => { setcredentials({ ...credentials, password: e.target.value }) }} type="password" className="myform-control my-2" style={{ backgroundColor: "#720D59" }} placeholder='Password' />
                            <div className="d-flex justify-content-center">
                                <button style={{ backgroundColor: '#720D59', color: '#ffffff' }} className="btn my-2"><i class="fa-solid fa-arrow-right-to-bracket px-2"></i>Signup</button>
                            </div>
                            
                        </form>
                    </div>
                </div>
                <Link to="/login">   <p className='my-2'>Already Have an account?</p></Link>

            </div>
        </>
    )
}