import React, { useContext } from 'react'
import ChatContext from './context/chatcontext'
import { useState,useEffect } from 'react'
const Modal = () => {
    const context = useContext(ChatContext)
    const { users, room, userData,createRoom } = context
    // console.log(users)
    // console.log(room)
    // const filterUser = users.filter((e) => { return e._id !== userData._id })

    // console.log(filterUser)


    // const anotherRoom = room.filter((e)=>{return e.users.some((el)=>{return el._id!==userData._id})})
    
    // console.log(anotherRoom)

    // const thirdArray = users.filter((elem) => {
    //     return room.map((ele) => {
    //         return ele.users.some((ol)=>{return elem._id!==ol._id})
    //     });
    // });

    const [filteredRoom, setFilteredRoom] = useState([])
    useEffect(() => {
        if(userData){
          const filter =room.filter((e) => { return e.users.some((ele) => { return ele._id == userData._id }) })
          setFilteredRoom(filter)
        }
      }, [userData,room])

    let theUsers =[]
    filteredRoom.map((e)=>{e.users.map((hero)=>{theUsers=[...theUsers,hero]})})
    console.log(theUsers)

    let thirdArray =[]
    thirdArray= users.filter((e)=>{return theUsers.every((hero)=>{return e._id!==hero._id})})
    thirdArray =thirdArray.filter((e)=>{return e._id!==userData._id})
    



    return (
        <>



            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5 primarycolor" id="exampleModalLabel">Tap To Chat</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form className="d-flex">
                                <input placeholder='Search for Users' type="text" className="form-control btn-primaryinput" />
                                <button className="btn btn-primarycolor"><i class="fa-solid fa-magnifying-glass"></i></button>
                            </form>
                            <div style={{ overflow: 'auto', height: '300px' }}>
                                {thirdArray.map((e) => {
                                    return <div onClick={()=>createRoom(e._id)} className="d-flex justify-content-between primarycolor p-2 rounded my-2" style={{ border: '1px solid #4E0D3A' }}>
                                        <div className='d-flex align-items-center'>
                                            <i class="fa-solid fa-user px-2" style={{ fontSize: '40px', color: '#720D5D' }}></i>
                                            <div className="d-flex flex-column justify-content-center">
                                                <span>{e.fullname}</span>
                                                <span style={{color:'#c86eac'}}>{e.email}</span>
                                            </div>
                                        </div>
                                        <button className="btn btn-primarycolor">
                                            <i class="fa-solid fa-user-plus py-2"></i>

                                        </button>

                                    </div>
                                })}
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primarycolor" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primarycolor">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Modal