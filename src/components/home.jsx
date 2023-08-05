import React, { useContext } from 'react'
import { useEffect } from 'react'
import ChatContext from './context/chatcontext'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import Pubnub from 'pubnub'
import LoadingBar from 'react-top-loading-bar'

import { useRef } from 'react'
const Home = () => {
  const params = useParams()
  const { chatId } = params
  console.log(chatId)
  const context = useContext(ChatContext)
  const { setnavHider,setMessages, bottomRef, getSingleMessage, setcontent, setmessageId, openEditModal, deleteMessage, setprogress, progress, openDeleteModal, counter, setcounter, getAllRooms, room, userData, modal, getAllUsers, messages, getAllMessages, sendMessage, sendingLoader } = context

  useEffect(() => {
    if(chatId&&window.innerWidth<768){
      setnavHider(true)
    }
    else{
      setnavHider(false)
    }
  }, [chatId])
  
  var pubnub = new Pubnub({
    publishKey: "pub-c-e5c44449-a3cf-4996-a063-f7285380f338",
    subscribeKey: "sub-c-bda7266f-a825-4795-8563-c2837f58e4e1",
    userId: 'xyz'
  });

  const [chatRoom, setchatRoom] = useState(null)
  const [content, setContent] = useState("")


  useEffect(() => {
    if (room) {
      const specificRoom = room.find((e) => { return e._id == chatId })
      setchatRoom(specificRoom)
    }


  }, [getAllRooms])
  console.log(chatRoom)

  const history = useNavigate()
  const token = localStorage.getItem('authToken')

  useEffect(() => {
    if (!token) {
      history('/login')
    }
  }, [token])

  useEffect(() => {
    if (token) {
      getAllRooms()
    }
  }, [token])


  const [filteredRoom, setFilteredRoom] = useState([])

  useEffect(() => {
    if (userData) {
      const filter = room.filter((e) => { return e.users.some((ele) => { return ele._id == userData._id }) })
      setFilteredRoom(filter)
    }
  }, [userData, room])



  // style={{ position: 'absolute', width: "100%", height: '80%' }}>



  useEffect(() => {

    if (chatId) {

      getAllMessages(chatId)


    }
  }, [chatId])



  useEffect(() => {
    const listenerParams = {
      message: (messageEvent) => {
        if (messageEvent.message.senderId !== userData._id) {
          if (messageEvent.publisher == 'creator') {
            getAllMessages(chatId)
            console.log('itran')
          }
          else if (messageEvent.publisher == 'editor') {
            getSingleMessage(messageEvent.message._id)
            // console.log(messageEvent.message._id)
          }
          else if (messageEvent.publisher == 'remover') {
            const filteredMessages = messages.filter((e) => { return e._id !== messageEvent.message._id })
            setMessages(filteredMessages)
            // console.log(messages)
          }
        }
      }
    }
    pubnub.addListener(listenerParams);
    pubnub.subscribe({ channels: [chatId] });
    return () => {
      pubnub.unsubscribe({ channels: [chatId] })
      pubnub.removeListener(listenerParams)
      console.log('unmounted')
    }
  }, [pubnub, chatId]);


  useEffect(() => {
    const listenerParams = {
      message: (messageEvent) => {
        if (messageEvent.message.users.find((e) => { return e._id == userData._id })) {
          getAllRooms()
          console.log('roomer')
        }
      }
    }
    pubnub.addListener(listenerParams);
    pubnub.subscribe({ channels: ['homepage'] });
    return () => {
      pubnub.unsubscribe({ channels: ['homepage'] })
      pubnub.removeListener(listenerParams)
      console.log('unmounted')
    }
  }, [pubnub]);

  // useEffect(() => {
  //   const listenerParams = {
  //     message: (messageEvent) => {
  //         if(messageEvent.message.senderId!==userData._id){
  //         console.log('it works')
  //         getSingleMessage(messageEvent.message._id)
  //       }
  //     }
  //   }
  //   pubnub.addListener(listenerParams);
  //   pubnub.subscribe({ channels: [chatId] });
  //   return () => {
  //     pubnub.unsubscribe({ channels: [chatId]})
  //     pubnub.removeListener(listenerParams)
  //     console.log('unmounted')
  //   }
  // }, [pubnub]);





  console.log(messages)




  console.log(chatRoom)
  const messageRef = useRef(null)
  return (
    <>

      <div className=" d-flex justify-content-center position-relative" style={{ height: "90vh" }}>


        <div className="row w-100">
          <div className={`darkpurple col-md-4 ${chatId && 'd-md-block  d-none'}`} >
            <div className="d-flex justify-content-between my-2">
              <h3 className="text-start px-3 darkpurple">Users</h3>
              <button onClick={() => { modal.current.click(); getAllUsers() }} style={{ backgroundColor: '#ffffff', color: '#4E0D3A' }} className="mx-2 btn rounded-circle border">

                <i class="fa-solid fa-user-plus py-2"></i>
              </button>

            </div>

            {filteredRoom.map((e) => {
              return <>
                <Link style={{ textDecoration: 'none', height: '15%', border: '1px solid white' }} className='card mb-3 mx-3 shadow darkpurple' to={`/${e._id}`}>
                  <div class="row g-0" style={{ height: '100%', justifyContent: "space-between" }}>
                    <div class="col-3 d-flex justify-content-center align-items-center" >
                      <div className="container">
                        <div className="d-flex">
                          <i class="fa-solid fa-user px-2" style={{ fontSize: '50px' }}></i>
                        </div>
                      </div>
                    </div>
                    <div class="col-9 d-flex justify-content-end align-items-center">
                      <div class="p-2 mx-2">
                        {e.users.map((e) => {
                          if (e._id !== userData._id) {
                            return <h5 style={{ fontSize: '30px' }} class="card-title">{e.name}</h5>
                          }
                        })}

                      </div>
                    </div>
                  </div>

                </Link>
              </>
            })}

          </div>

          <div className={`col-md-8 ${!chatId && 'd-none'} d-md-block col-12 p-0`} style={{ backgroundColor: '#430D3A' }}>
            {/* <h1 className="text-center">chatbox</h1> */}
            {chatId && chatRoom && userData ? <><div className='chatbox' >
              <div className="card" style={{ height: '100%', backgroundColor: "#430D3A  " }}>
                <div className='chatarea' >
                  <div className="d-flex  border-bottom p-2 shadow align-items-center justify-content-between">

                    <div className='d-flex'>
                      <Link className=' d-flex justify-content-center align-items-center' style={{ textDecoration: 'none' }} to='/'> <i style={{ color: '#ffffff', cursor: 'pointer' }} class="fa-solid fa-arrow-left fa-lg d-flex justify-content-center align-items-center mx-2">

                      </i>
                      </Link>
                      <i class="fa-solid fa-user px-2" style={{ fontSize: '40px', color: '#ffffff' }}></i>
                      {chatRoom.users.length > 0 && <h4 style={{ color: '#ffffff' }} className='p-2'>{chatRoom.users.find((e) => { return e._id !== userData._id }).name}</h4>}
                    </div>
                    <div onClick={() => openDeleteModal.current.click()} style={{ cursor: 'pointer' }}>
                      <i class="fas fa-trash-alt fa-xl" style={{ color: "white" }}></i>
                    </div>
                  </div>
                  <div id="scrollbar6" className='p-2' >
                    {messages.map((e) => {
                      return <div className={`d-flex align-items-center ${e.senderId == userData._id ? 'justify-content-end' : 'justify-content-start'} m-1`}>
                        {e.senderId == userData._id && <div className="btn-group dropup">
                          <i data-bs-toggle="dropdown" class="fa-solid fa-ellipsis-vertical  fa-lg mx-1" style={{ color: "white" }}></i>
                          <ul class="dropdown-menu">
                            <div className="d-flex flex-column">
                              <span onClick={() => { openEditModal.current.click(); setmessageId(e._id); setcontent(e.content) }} style={{ color: "#430D3A" }} className="rounded p-1"><i class="fa-solid fa-pen-to-square"></i></span>

                              <span onClick={() => deleteMessage(e._id)} style={{ color: "#430D3A" }} className="rounded p-1"><i class="fa-solid fa-delete-left"></i></span>
                            </div>
                          </ul>
                        </div>}
                        <div style={{ backgroundColor: e.senderId == userData._id ? '#720d59' : 'white' }} className={`px-2 shadow rounded-4 border-1 border  d-flex justify-content-center align-items-center`}>
                          <span style={{ color: e.senderId == userData._id ? 'white' : '#720d59',overflowWrap:'anywhere'}} className='p-2 w-100'>{e.content}</span>
                        </div>
                      </div>
                    })}
                    <div ref={bottomRef}></div>


                  </div>



                </div>



              </div>
            </div>


              <form className='d-flex' style={{ width: '100%', height: '7%' }} onSubmit={(e) => { e.preventDefault(); sendMessage(chatRoom.users.find((e) => { return e._id !== userData._id })._id, chatId, content) }} >
                <input style={{ backgroundColor: '#430D3A' }} onChange={(e) => setContent(e.target.value)} value={content} type="text" placeholder='Type Your Text' className="myform-control" />
                <button disabled={sendingLoader || content == '' ? true : false} style={{ color: '#ffffff', borderColor: "white" }} className="btn"><i class={`fa-sharp fa-solid fa-paper-plane sending  ${sendingLoader && 'fa-fade'}`} ></i></button>

              </form></> :
              <div className="d-flex justify-content-center align-items-center h-100">
                <p>No Chat Selected</p>
              </div>
            }
          </div>
        </div>
      </div>



      <button ref={modal} hidden="true" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
    </>
  )
}

export default Home