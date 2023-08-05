import React, { useContext } from 'react'
import ChatContext from './context/chatcontext'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
const EditModal = () => {
    const context = useContext(ChatContext)
    const {openEditModal,deleteRoom,editMessage,content,setcontent} = context
    const params = useParams()
  return (
    <>
<button hidden="true" ref={openEditModal} type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#deletion">
  Launch static backdrop modal
</button>


<div class="modal fade" id="deletion" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog  modal-dialog-centered">
    <div class="modal-content">
      
      <div class="modal-body">
       <input value={content} onChange={(e)=>setcontent(e.target.value)} style={{borderColor:'#430D3A',borderRight:"none",borderLeft:"none",borderTop:"none"}} type="text" className="form-control rounded-0 text-center" />
      </div>
      <div class="modal-footer d-flex justify-content-center">
        <div className="d-flex justify-content-center">
        <button type="button" class="btn btn-secondary mx-1" data-bs-dismiss="modal">Cancel</button>
        <button onClick={()=>editMessage(content)} type="button"  data-bs-dismiss="modal" class="btn btn-primary">Edit</button>
        </div>
      </div>
    </div>
  </div>
</div>
</>
  )
}

export default EditModal