import React, { useEffect, useState } from 'react'
import "./sidebar.css"
import axios from 'axios';
import {API_URL} from "../config"
import { IconButton, Avatar } from '@mui/material';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import LogoutIcon from '@mui/icons-material/Logout';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import SidebarChat from './SidebarChat';
import { useGlobalContext } from '../context';



const Sidebar = ({user}) => {
  const [rooms, setRooms] = useState([])
  const [showRooms, setShowRooms] = useState(false)
  const {setCurrRoom} = useGlobalContext()

  useEffect(() => {
    axios.get(`${API_URL}/api/rooms/get-all`)
      .then((response) => {
        // console.log(response.data[0]._id)
        setRooms(response.data)
        setCurrRoom(response.data[0]._id)
      })
  }, [])

  const logout = () => {
    window.open(`${API_URL}/auth/logout`, "_self")
  }

  return (
    <div className='sidebar'>
      <div className="sidebarHeader">
        <div className='sidebarHeader__left'>
          <Avatar className="avatar" src={user?.avatar} />
          <div className="userInfo">
            <h3 className="username">{user?.username}</h3>
            <p className="email">{user?.email}</p>
          </div>
        </div>
        <div className="sidebarHeader__right">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton onClick={logout}>
            <LogoutIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebarSearch">
        <div className="sidebarSearchContainer">
          <SearchIcon />
          <input type="text" placeholder='search or start new chat' />
        </div>
      </div>
      <h5 className='showRooms__btn'
        onClick={() => setShowRooms(!showRooms)}>
        show  rooms
      </h5>
      {/* showRooms style is seted in index.css */}
      <div className={`sidebarChats ${showRooms && "showRooms"}`}>
        {showRooms && rooms?.map((room, i) => {
          return <SidebarChat key={i} room={room} />
        })}
      </div>
    </div>
  )
}

export default Sidebar
