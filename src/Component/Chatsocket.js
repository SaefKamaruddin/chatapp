import React, { useState, useEffect } from "react";
import Socket from "../utils/socket";

function Chatsocket() {
  const [user, setUser] = useState();
  const [users, displayUsers] = useState();

  useEffect(() => {
    Socket.emit("NEW_USER");

    Socket.on("GET_CURRENT_USER", user => {
      console.log(user);
      document.write(user.username);
    });

    Socket.on("UPDATE_USER_LIST", users => {
      console.log(users);
    });
  }, []);

  return (
    <div>
      <form>
        <ul></ul>
      </form>
    </div>
  );
}

export default Chatsocket;
