import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase-config";
import ChatMessage from "../ChatMessage/ChatMessage";
import Login from "../../Pages/Login/Login";
import React, { useState, useEffect, useRef } from "react";
import { db } from "../../firebase-config";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "./Chat.scss";
const Chat = () => {
  const [user] = useAuthState(auth);
  console.log(user);
  const scroll = useRef();
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    const articleRef = collection(db, "messages");
    const q = query(articleRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messages);
      // console.log(messages);
    });
  }, []);

  if (!messages) {
    return <h1>LoDING..</h1>;
  }
  return (
    <>
      <div className="msgs">
        {messages &&
          messages.map((message) => {
            return (
              <div
                key={message.id}
                className={`msg ${
                  message.uid === user.uid ? "sent" : "received"
                }`}>
                <img className="msg-user" src={user.photoURL} alt="" />
                <p>{message.text}</p>
              </div>
            );
          })}
      </div>
      <ChatMessage scroll={scroll} />
      <div ref={scroll}></div>
    </>
  );
};

export default Chat;
