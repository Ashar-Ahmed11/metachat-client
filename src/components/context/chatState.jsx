import React, { useEffect } from 'react'
import ChatContext from './chatcontext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRef} from 'react'
import { getToken } from "../../firebaseInit";
import { useParams } from 'react-router-dom'
const ChatState = (props) => {
  const bottomRef = useRef(null);

  const [counter, setcounter] = useState(22)
  const history = useNavigate()
  const [error, seterror] = useState(null)
  const [userData, setuserData] = useState(null)
  const [progress, setprogress] = useState(0)


  const fetchUser = async () => {
    const url = 'https://fine-pink-puffer-boot.cyclic.app/api/v1/auth/getuser'
    const token = localStorage.getItem('authToken')
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        "auth-token": token
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    });
    const data = await response.json();
    const notificationData = await getToken();
    notificationController(notificationData)
    setuserData(data)

  }

  console.log(userData)

  const login = async (data) => {
    setprogress(25)
    const url = 'https://fine-pink-puffer-boot.cyclic.app/api/v1/auth/login'
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ email: data.email, password: data.password }), // body data type must match "Content-Type" header
    });
    const token = await response.json();
    setprogress(100)
    if (token.error) {
      seterror(token.error)
      setTimeout(() => {
        seterror(null)
      }, 1000);
    }
    else {
      localStorage.setItem('authToken', token.authToken)
      history('/')
    }
    console.log(token)
  }


  const [room, setRoom] = useState([])
  const getAllRooms = async () => {
    setprogress(25)
    const authToken = localStorage.getItem('authToken')
    console.log(authToken)
    const url = 'https://fine-pink-puffer-boot.cyclic.app/api/v1/room/getallroom'
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      // body data type must match "Content-Type" header
    });
    const token = await response.json();
    setRoom(token)

    setprogress(100)
  }

  const [messages, setMessages] = useState([])

  
const [messagesCurrentLength, setmessagesCurrentLength] = useState(null)

  const getAllMessages = async (roomId) => {
    console.log('hello it ran')
    setprogress(25)
    const authToken = localStorage.getItem('authToken')

    const url = `http://localhost:4000/api/v1/message/getallmessages/${roomId}`
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      // body data type must match "Content-Type" header
    });
    const token = await response.json();
    
    setMessages(token)
    setprogress(100)
    bottomRef.current?.scrollIntoView({behavior:'smooth'});

    

  }
  
  useEffect(() => {
    if(messages.length>messagesCurrentLength){
    bottomRef.current?.scrollIntoView({behavior:'smooth'});
  }
  if(messages.length<messagesCurrentLength){
    return
  }
  else{
    setmessagesCurrentLength(messages.length)
  }
  }, [messages.length])

  const [sendingLoader, setSendingLoader] = useState(false)
  const sendMessage = async (recieverId, roomId, content) => {
    setprogress(25)
    const authToken = localStorage.getItem('authToken')
    setSendingLoader(true)
    const url = `https://fine-pink-puffer-boot.cyclic.app/api/v1/message/createmessage/${recieverId}/${roomId}`
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      // body data type must match "Content-Type" header,
      body: JSON.stringify({ content: content })
    });
    const token = await response.json();
    console.log(token)
    setMessages([...messages, token])
    setmessagesCurrentLength(messages.length)

    setSendingLoader(false)
    setprogress(100)

  }
  const modal = useRef(null)


  // https://fine-pink-puffer-boot.cyclic.app/api/v1/room/getallusers


  // const [sendingLoader, setSendingLoader] = useState(false)
  const [users, setUsers] = useState([])
  const getAllUsers = async () => {
    setprogress(25)
    const authToken = localStorage.getItem('authToken')

    const url = `https://fine-pink-puffer-boot.cyclic.app/api/v1/room/getallusers`
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer"
    });
    const token = await response.json();

    setUsers(token)
    setprogress(100)

  }
  const createRoom = async (userId) => {
    setprogress(25)
    const authToken = localStorage.getItem('authToken')

    const url = `https://fine-pink-puffer-boot.cyclic.app/api/v1/room/createroom/${userId}`
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer"
    });
    const token = await response.json();

    setRoom([...room, token])

    setprogress(100)
  }
  // const params = useParams()

  const deleteRoom = async (roomId) => {
    const authToken = localStorage.getItem('authToken')
    setprogress(25)
    const url = `https://fine-pink-puffer-boot.cyclic.app/api/v1/room/deleteroom/${roomId}`
    const response = await fetch(url, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer"
    });
    const token = await response.json();
    console.log(token)
    history('/')
    const filteredRoom = room.filter((e) => { return e._id !== token._id })
    setRoom(filteredRoom)

    setprogress(100)
    // console.log(roomId)


  }


  const openDeleteModal = useRef(null)
  const signup = async (credentials) => {
    setprogress(25)
    const url = `https://fine-pink-puffer-boot.cyclic.app/api/v1/auth/signup`
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ fullname: `${credentials.firstname} ${credentials.lastname}`, email: credentials.email, password: credentials.password }),
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer"
    });
    const token = await response.json();
    setprogress(100)
    if (token.error) {
      seterror(token.error)
      setTimeout(() => {
        seterror(null)
      }, 1000);
    }
    else {
      localStorage.setItem('authToken', token.authToken)
      history('/')
    }
  }

  const deleteMessage = async (messageId) => {
    const authToken = localStorage.getItem('authToken')
    const url = `https://fine-pink-puffer-boot.cyclic.app/api/v1/message/deletemessage/${messageId}`
    const response = await fetch(url, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        "auth-token":authToken
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer"
    });
    const token = await response.json();
    const filteredMessages = messages.filter((e)=>{return e._id!==token._id})
    setMessages(filteredMessages)
  }
  const getSingleMessage = async (messageId) => {
    const authToken = localStorage.getItem('authToken')
    const url = `https://fine-pink-puffer-boot.cyclic.app/api/v1/message/singlemessage/${messageId}`
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        "auth-token":authToken
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer"
    });
    const token = await response.json();
    // const filteredMessages = messages.filter((e)=>{return e._id!==token._id})
    // setMessages(filteredMessages)
    let filteredMessages
    for (let index = 0; index < messages.length; index++) {
      const element = messages[index];
      if(element._id==token._id){
        filteredMessages=index
      }
      
    }
    messages[filteredMessages].content=token.content
    setMessages([...messages])
  }


  const [messageId, setmessageId] = useState('')
  const [content, setcontent] = useState('')

  const editMessage = async (content) => {
    const authToken = localStorage.getItem('authToken')
    const url = `https://fine-pink-puffer-boot.cyclic.app/api/v1/message/editmessage/${messageId}`
    const response = await fetch(url, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        "auth-token":authToken
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:JSON.stringify({content:content}),
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer"
    });
    const token = await response.json();
    let filteredMessages
    for (let index = 0; index < messages.length; index++) {
      const element = messages[index];
      if(element._id==token._id){
        filteredMessages=index
      }
      
    }
    messages[filteredMessages].content=token.content
    setMessages([...messages])
  }

  const notificationController=async(tokenId)=>{
    setprogress(25)
    const authToken = localStorage.getItem('authToken')
    const url = `https://fine-pink-puffer-boot.cyclic.app/api/v1/auth/notificationcontroller/${tokenId}`
    const response = await fetch(url, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        "auth-token":authToken
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:JSON.stringify({content:content}),
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer"
    });
    const token = await response.json();
    console.log('THE API RAN',token)
    setprogress(100)
  }

  const openEditModal = useRef(null)


  const [navHider, setnavHider] = useState(false)

  return (
    <ChatContext.Provider value={{ navHider,setnavHider,setMessages,bottomRef,getSingleMessage,notificationController,content,setcontent,setmessageId,editMessage,openEditModal,deleteMessage,signup, setprogress, progress, deleteRoom, openDeleteModal, createRoom, users, getAllUsers, modal, sendingLoader, sendMessage, messages, setMessages, getAllMessages, counter, setcounter, login, error, seterror, userData, fetchUser, room, getAllRooms }}>
      {props.children}
    </ChatContext.Provider>
  )
}

export default ChatState