import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import {API_URL} from "../config"
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";
import { useGlobalContext } from '../context';

const Home = () => {
  const navigate = useNavigate()
  let {user, setUser} = useGlobalContext()

  useEffect(() => {
    // check if user exists or navigate on /login
    // console.log(Object.keys(user).length)
    axios.get(`${API_URL}/auth/login/success`, {withCredentials:true})
      .then((response) => {
        console.log(response.data)
        if (response.data.error) {
          navigate("/login")
        }
        setUser(response.data[0])
      })
      .catch(err => {
        console.log("can not get current user")
        navigate("/login")
      })
  }, [])

  return (
    <div className="homePage">
      <Sidebar user={user} />
      <Chat />
    </div>
  )
}

export default Home
