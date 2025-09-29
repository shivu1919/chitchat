import React, { useState, useEffect } from 'react'
import chatStyle from "../css/Chat.module.css"
import axios from "axios"

function Chat(props) {

  const [email, setEmail] = useState(props.useremail)

  const [users, setUsers] = useState([])
  const [friend, setFriend] = useState('')

  const [msgs, setMsgs] = useState([])

  const [sender, setSender] = useState(props.useremail)
  const [receiver, setReceiver] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    axios.get("http://localhost:8080/all-users")
      .then((res) => {
        setUsers(res.data.filter((user) => user.name != props.username))
      })
  }, [])


  useEffect(()=>{
    axios.post(`http://localhost:8080/check-msg?sender=${sender}&receiver=${receiver}`)
    .then((res)=>{
      console.log("new data fetched")
      setMsgs(res.data)
    })
  }, [receiver, message])


  function sendMessage() {
    axios.post(`http://localhost:8080/send-msg?sender=${sender}&receiver=${receiver}&msg=${message}&time=${new Date().getHours() + " : " + new Date().getMinutes()}`)
    setMessage('')
  }

  return (
    <>
      <div id={chatStyle.main}>
        <h2>Welcome {props.username}</h2>


        <h2>All users</h2>
        <div id={chatStyle.users}>

          {users.map((user, index) => <div onClick={() => {
            setFriend(user.name)
            setReceiver(user.email)
            
          }} key={index} className={chatStyle.user}>
            {user.name}
          </div>)}
        </div>

        <div id={chatStyle.chat}>
          <div id={chatStyle.friend}>
            {friend}
            <hr />
          </div>

          <div id={chatStyle.msgs}>
            {msgs.map((item, index) => <div key={index}>
              <p>{item.msg}</p>
            </div>)}
          </div>

          <div id={chatStyle.sender}>
            <input
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={(event) => {
                if (event.key == "Enter") {
                  sendMessage()
                }
              }}

            ></input>
          </div>
        </div>
      </div>
    </>
  )
}

export default Chat