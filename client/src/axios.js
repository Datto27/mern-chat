import axios from "axios"

const instance = axios.create({
  baseURL: "https://mern-chat-dg.herokuapp.com/"
})

export default instance