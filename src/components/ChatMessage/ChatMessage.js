import { db, auth } from "../../firebase-config";
import React, { useState, useEffect, useRef } from "react";
import { Timestamp, collection, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const ChatMessage = ({ scroll }) => {
  const [msg, setMsg] = useState("");
  const [user] = useAuthState(auth);

  console.log(user);

  const sendMessage = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "messages"), {
      text: msg,
      photoURL: user.photoURL,
      uid: user.uid,
      createdAt: Timestamp.now().toDate(),
      userName: user.displayName,
    });
    setMsg("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div>
      <form onSubmit={sendMessage}>
        <div className="sendMsg">
          <input
            style={{
              width: "78%",
              fontSize: "15px",
              fontWeight: "550",
              marginLeft: "5px",
              marginBottom: "-3px",
            }}
            placeholder="Message..."
            type="text"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button
            style={{
              width: "18%",
              fontSize: "15px",
              fontWeight: "550",
              margin: "4px 5% -13px 5%",
              maxWidth: "200px",
            }}
            type="submit">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatMessage;
