import React, { useContext } from 'react'
import { Route, Routes } from "react-router-dom";
import Navbar from './navbar';
import Home from './home';
import Login from './login';
import ChatContext from './context/chatcontext';
import Chat from './chat';
import Modal from './modal';
import DeleteModal from './deletemodal';
import SignUp from './login copy';
import LoadingBar from 'react-top-loading-bar';
import EditModal from './editmodal';
export default function AppBody() {
    const context = useContext(ChatContext)
    const {progress,navHider} = context
    const token = localStorage.getItem('authToken')
    return (

        <>

           { token&&<>{!navHider&&<Navbar/>}</>}
           <Modal/>

           <LoadingBar color='#f11946' progress={progress} />
         
     
            <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/:chatId" element={<><Home /><DeleteModal/><EditModal/></>} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                {/* <Route path="/chat/:id" element={<Chat />} /> */}
            </Routes>
        </>


    )
}