import React, { useState, useEffect } from 'react'
import chatStyle from  "../css/Chat.module.css"
import axios from "axios"

function Chat(props) {

  const[email, setEmail] = useState(props.useremail)

  const[users, setUsers] = useState([])

  useEffect(()=>{
    axios.get("http://localhost:8080/all-users")
    .then((res)=>{
      setUsers(res.data.filter((user)=> user.name!=props.username))
    })
  }, [])

  return (
    <>
        <div id={chatStyle.main}>
            <h2>Welcome {props.username}</h2>


            <h2>All users</h2>
            <div id={chatStyle.users}>
              
              {users.map((user, index)=> <div key={index} className={chatStyle.user}>
                    {user.name}
              </div>)}
            </div>

            <div id={chatStyle.chat}>
    
            </div>
        </div>
    </>
  )
}

export default Chat