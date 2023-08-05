import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import ChatContext from './context/chatcontext';
import { Link } from 'react-router-dom';
const Navbar = () => {
  const history = useNavigate()
  const context = useContext(ChatContext)
  const { userData, fetchUser } = context
  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <>


      {userData &&
        <nav class="navbar navbar-expand-lg bg-body-tertiary" style={{ padding: '0px' }}>
          <div style={{ backgroundColor: '#720D59', height: "10vh" }} class="container-fluid p-2">
            <Link style={{ color: "white",textDecoration:'none' }} class="navbar-brand" to="/"><i class="fa-brands fa-rocketchat fa-2xl"></i><span className='px-2'>MetaChat</span></Link>
            {/* <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button> */}
            <div class="" id="navbarText">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              </ul>
              <span style={{ color: "white" }} class="navbar-text">
                <div class="d-flex justify-content-end" >
                  <div className='mx-2 d-flex align-items-center' style={{ width: "max-content" }}>
                    <span style={{ width: "max-content" }}>{userData.fullname}</span>
                  </div>
                  <div className="d-flex justify-content-center" style={{ alignItems: 'center' }}>
                    <button style={{ border: '1px solid  #ffffff', color: ' #ffffff' }} onClick={() => { localStorage.removeItem('authToken'); history('/login') }} className="btn "><i class="fa-solid fa-arrow-right-from-bracket fa-sm"></i></button>
                  </div>
                </div>
              </span>
            </div>
          </div>
        </nav>}
    </>
  )
}

export default Navbar