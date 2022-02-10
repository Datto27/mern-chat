import React, {createContext, useContext, useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios"
import {API_URL} from "./config"
import Pusher from "pusher-js"

const AppContext = createContext()

export const AppProvider = ({children}) => {
  // const navigate = useNavigate()
  const [user, setUser] = useState({})
  const [messages, setMessages] = useState([])
  const [currRoom, setCurrRoom] = useState("") // roomId for get messages with specific room

  useEffect(() => {
    axios.get(`${API_URL}/auth/login/success`, {withCredentials:true})
      .then((response) => {
        // console.log(response.data)
        setUser(response.data[0])
      })
      .catch(err => {
        console.log("can not get current user")
      })
  }, [])
  // console.log(user)

  useEffect(() => {
    // console.log(currRoom)
    if (currRoom) {
      axios.get(`${API_URL}/api/messages/get-by-room/${currRoom}`)
        .then((response) => {
          // console.log(response.data)
          setMessages(response.data)
        })
    }
  }, [currRoom])

  useEffect(() => {
    let pusher = new Pusher('66efff2d00a36982d2fc', {
      cluster: 'eu'
    });
    let channel = pusher.subscribe('messages');
    channel.bind('inserted', function(data) {
      // alert(JSON.stringify(data));
      // console.log(data)
      setMessages([...messages, data])
    });
    // cleanup function
    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }
  }, [messages])

  return (
    <AppContext.Provider value={{user, setUser, messages, currRoom, setCurrRoom}}>
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}
