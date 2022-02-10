import React, { useState, useEffect, useRef } from 'react'
import "./chat.css"
import axios from 'axios'
import {API_URL} from "../config"
import {Avatar, IconButton} from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoodIcon from '@mui/icons-material/Mood';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import {useGlobalContext} from "../context"

const Chat = () => {
  let {user, messages, currRoom} = useGlobalContext()
  const [roomInfo, setRoomInfo] = useState("")
  const messagesRef = useRef()
  const [newMsg, setNewMsg] = useState({
    text: "",
    user: user?.username, 
    userEmail: user?.email, 
    room: currRoom
  })

  useEffect(() => {
    // user da chatRoom kovel tsvlilebaze xelaxla gatsera
    setNewMsg({
      ...newMsg,
      user: user?.username, 
      userEmail: user?.email, 
      room: currRoom
    })
    if (currRoom) {
      axios.get(`${API_URL}/api/rooms/specific-room/${currRoom}`)
        .then(response => {
          // console.log(response.data)
          setRoomInfo(response.data[0])
        })
        .catch(err => {
          console.log("No room data taken")
      })
    }
  }, [user, currRoom])
  // // get current chat room info, (moved into another useEffect (up))
  // useEffect(() => {
  //   // console.log(currRoom)
  //   if (currRoom) {
  //     axios.get(`http://localhost:4000/api/rooms/specific-room/${currRoom}`)
  //       .then(response => {
  //         // console.log(response.data)
  //         setRoomInfo(response.data[0])
  //       })
  //       .catch(err => {
  //         console.log("No room data taken")
  //     })
  //   }
  // }, [currRoom, user])

  useEffect(() => {
    // messages kovel ganaxlebaze messages body-is scroll-is simaglis 
    // tsamogheba da bottom-ze chsvla
    // console.log("ref:  ", messagesRef.current.scrollHeight)
    messagesRef.current.addEventListener("DOMNodeInserted", e => {
      const {currentTarget: target} = e
      // ref.scroll-s vutser am messagesRef.target.scrollHeight-s top-dan
      target.scroll({top: target.scrollHeight, behavior: "smooth"})
    })
  }, [messages])

  const sendMessage = (e) => {
    e.preventDefault()
    // console.log(newMsg)
    axios.post(`${API_URL}/api/messages/new`, {newMsg}).then(reponse => {
      // console.log(reponse.data)
      setNewMsg({...newMsg, text:""})
    })
  }

  return (
    <div className='chat'>
      <div className="chatHeader">
        <Avatar src={roomInfo?.imageUrl} />
        <div className="chatHeaderInfo">
          <h3>{roomInfo?.name}</h3>
          <p>last seen at...</p>
        </div>
        <div className="chatHeaderRight">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chatBody" ref={messagesRef}>
        <p className='chatMsg'>
          <span className='msgAuthor'>Bilal</span>
          this is message
          <span className="msgTimestamp">
            {new Date().toUTCString()}
          </span>
        </p>
        {messages?.map((msg, i) => {
          return (
            <div key={i} className={`chatMsg ${user.username==msg.user&&"sended__msg"}`}>
              <span className='msgAuthor'>{msg.user}</span>
              {msg.text}
              <p className="msgTimestamp">
                {new Date().toUTCString()}
              </p>
            </div>
          )
        })}
      </div>
      <div className="chatFooter">
        <IconButton><MoodIcon/></IconButton>
        <form>
          <input type="text" placeholder='type message'
            value={newMsg.text}
            onChange={(e) => setNewMsg({...newMsg, text:e.target.value})} />
          {newMsg.text.length > 0 && (
            // <button onClick={sendMessage}>Send</button> 
            <IconButton onClick={sendMessage}>
              <SendIcon />
            </IconButton>
          )}
        </form>
        <IconButton><MicIcon/></IconButton>
      </div>
    </div>
  )
}

export default Chat