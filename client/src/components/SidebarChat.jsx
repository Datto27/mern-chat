import React from 'react'
import "./sidebarChat.css"
import { Avatar } from '@mui/material'
import { useGlobalContext } from '../context'


const SidebarChat = ({room}) => {
  const {setCurrRoom} = useGlobalContext()

  return (
    <div className='sidebarChat' onClick={() => setCurrRoom(room._id)}>
      <Avatar src={room.imageUrl} />
      <div className="sidebarChatInfo">
        <h2>{room.name}</h2>
        <p>this is the  last message</p>
      </div>
    </div>
  )
}

export default SidebarChat
