import React, { useContext, useEffect } from 'react'
import ChatContext from './context/chatcontext'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import Pusher from 'pusher-js'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Pubnub from 'pubnub'
const Chat = () => {
    var pusher = new Pusher('694998ead2a51a43232d', {
        cluster: 'ap1'
    });

    var pubnub = new Pubnub({
        publishKey: "pub-c-e5c44449-a3cf-4996-a063-f7285380f338",
        subscribeKey: "sub-c-bda7266f-a825-4795-8563-c2837f58e4e1",
        userId: 'xyz'
    });
    // pubnub.unsubscribeAll()


    




    const context = useContext(ChatContext)
    const { room, getAllRooms, userData, messages, getAllMessages, sendMessage, sendingLoader } = context
    const [chatRoom, setchatRoom] = useState(null)
    const params = useParams()
    useEffect(() => {

        getAllRooms()
        getAllMessages(params.id)

    }, [])

    useEffect(() => {
        if (room) {
            const specificRoom = room.find((e) => { return e._id == params.id })
            setchatRoom(specificRoom)
        }
    }, [room])


    // useEffect(() => {
    //     if (userData) {
    //         var channel = pusher.subscribe(params.id);
    //         channel.bind(params.id, (data) => {
    //             if (data.senderId !== userData._id) {
    //                 getAllMessages(params.id)
    //             }
    //         })
    //     }

    // }, [userData])

    console.log(messages)

    const token = localStorage.getItem('authToken')


    const [content, setContent] = useState("")


    console.log(messages)


    console.log(chatRoom)

    const bottomRef = useRef(null);

    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    
    

    // useEffect(() => {
    //     if (userData) {
    //         var pubnub = new Pubnub({
    //             publishKey: "pub-c-e5c44449-a3cf-4996-a063-f7285380f338",
    //             subscribeKey: "sub-c-bda7266f-a825-4795-8563-c2837f58e4e1",
    //             userId: userData._id
    //         });

    //         pubnub.unsubscribeAll()

    //         const listener = {
    //             status: (statusEvent) => {
    //                 if (statusEvent.category === "PNConnectedCategory") {
    //                     console.log("Connected");
    //                 }
    //             },
    //             message: (messageEvent) => {
    //                 if (messageEvent.message.senderId !== userData._id &&messageEvent.message.roomId==params.id) {
    //                     getAllMessages(params.id)
    //                 }
    //             }
    //         };
    //         pubnub.addListener(listener);

    //         // subscribe to a channel
    //         pubnub.subscribe({
    //             channels: [params.id],
    //         });

    //     }
    // }, [userData,params.id])


    useEffect(() => {
        const listenerParams = { message: (messageEvent)=>{
            if (messageEvent.message.senderId !== userData._id) {
                                    getAllMessages(params.id)
        } }}
        pubnub.addListener(listenerParams);
        pubnub.subscribe({channels: [params.id] });        
        return () => {
            pubnub.unsubscribe({channels: [params.id] })
            pubnub.removeListener(listenerParams)
        }
      }, [pubnub, params.id]);


    

  


    return (
        <>
        
            {chatRoom && <div className='px-3 mt-3 ' style={{ position: 'absolute', height: '80%', width: '100%' }}>
                <div className="card" style={{ height: '100%',backgroundColor:"#430D3A  "}}>
                    <div style={{ height: '100%' }}>
                        <div className="d-flex  border-bottom p-2 shadow align-items-center">
                            <Link className=' d-flex justify-content-center align-items-center' style={{textDecoration:'none'}} to='/'> <i style={{ color: '#ffffff', cursor: 'pointer' }} class="fa-solid fa-arrow-left fa-lg d-flex justify-content-center align-items-center mx-2">

                            </i>
                            </Link>
                            <i class="fa-solid fa-user px-2" style={{fontSize:'40px',color:'#ffffff'}}></i>
                            <h4 style={{ color: '#ffffff' }} className='p-2'>{chatRoom.users.find((e) => { return e._id !== userData._id }).name}</h4>
                        </div>
                        <div id="scrollbar6" className='p-2' style={{ height: '85%', overflowY: 'scroll' }}>
                            {messages.map((e) => {
                                return <div className={`d-flex ${e.senderId == userData._id ? 'justify-content-end' : 'justify-content-start'} m-1`}>
                                    <div style={{ width: 'max-content', backgroundColor: e.senderId == userData._id ? '#720d59' : 'white' }} className={`px-2 shadow rounded-pill border-1 border  d-flex justify-content-center align-items-center`}>
                                        <span style={{ color: e.senderId == userData._id ? 'white' : '#720d59' }} className='p-2'>{e.content}</span>
                                    </div>
                                </div>
                            })}
                            <div ref={bottomRef}></div>


                        </div>



                    </div>



                </div>
            </div>}


            <form className='d-flex' style={{ position: 'absolute', width: '100%', bottom: '0px', padding: "10px" }} onSubmit={(e) => { e.preventDefault(); sendMessage(chatRoom.users.find((e) => { return e._id !== userData._id })._id, params.id, content) }}>
                <input style={{backgroundColor:'#430D3A'}} onChange={(e) => setContent(e.target.value)} value={content} type="text" placeholder='Type Your Text' className="myform-control mx-2" />
                <button disabled={sendingLoader ? true : false} style={{color:'#ffffff',borderColor:"white"}} className="btn mx-2"><i class={`fa-sharp fa-solid fa-paper-plane sending ${sendingLoader && 'fa-fade'}`}></i></button>

            </form>
        </>
    )
}

export default Chat