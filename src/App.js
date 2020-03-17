import React, { useState, useEffect } from "react";
import "./App.css";
import Socket from "./utils/socket";

function App() {
  const [text, setText] = useState("");
  const [list, setList] = useState([]);
  const [currentuser, setUser] = useState("");
  const [displayUsers, setDisplayUsers] = useState([]);
  const [displayChat, setDisplayChat] = useState([]);

  useEffect(() => {
    Socket.emit("NEW_USER");

    Socket.on("GET_CURRENT_USER", user => {
      console.log(user);
      setUser(user.username);
    });

    Socket.on("UPDATE_USER_LIST", users => {
      console.log(users);
      const newUserList = users.map(dispNames => dispNames.username);
      setDisplayUsers(newUserList);

      Socket.on("RECEIVE_BROADCAST", data => {
        console.log(data);
        setDisplayChat(previousDisplayMessage => {
          return [...previousDisplayMessage, data];
        });
      });
    });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    Socket.emit("BROADCAST_MESSAGE", {
      username: currentuser,
      message: text,
      timestamp: Date.now()
    });

    const newList = [...list, text];
    setList(newList);
    setText("");
  };
  return (
    <div className="App">
      <div className="msgboard">
        {displayChat.map(item => {
          console.log(item);
          return (
            <div className="Chatbox">
              <div className="username">{item.username}</div>
              <div className="message">{item.message}</div>
            </div>
          );
        })}
      </div>
      <form id="sendMsg" onSubmit={handleSubmit}>
        <input
          placeholder="ChaTs"
          form="sendMsg"
          cols="150"
          rows="4"
          maxLength="500"
          wrap="hard"
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
        ></input>
        <div>
          <input type="submit" />
        </div>
      </form>
      <div>
        <ul>{displayUsers}</ul>
      </div>
    </div>
  );
}

export default App;
