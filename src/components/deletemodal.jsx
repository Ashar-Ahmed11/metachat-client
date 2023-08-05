import React, { useContext } from 'react'
import ChatContext from './context/chatcontext'
import { useParams } from 'react-router-dom'
const DeleteModal = () => {
    const context = useContext(ChatContext)
    const {openDeleteModal,deleteRoom} = context
    const params = useParams()
  return (
    <>
<button hidden="true" ref={openDeleteModal} type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#deletemodal">
  Launch static backdrop modal
</button>


<div class="modal fade" id="deletemodal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog  modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 style={{color:"black"}} class="modal-title fs-5" id="staticBackdropLabel">Are you sure?</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p className='p-3 text-warning-emphasis bg-warning-subtle border border-warning-subtle rounded-3'>Note that this chat will be deleted from the receiver as well!</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button"  data-bs-dismiss="modal" onClick={()=>deleteRoom(params.chatId)} class="btn btn-danger">Delete</button>
      </div>
    </div>
  </div>
</div>
</>
  )
}

export default DeleteModal