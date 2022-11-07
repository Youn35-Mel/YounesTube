import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase-config";
import ChatMessage from "../ChatMessage/ChatMessage";
import Message from "../Message/Message";
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
// import "./Chat.scss";

const style = {
  main: `flex flex-col p-[10px]`,
};
const Chat = () => {
  const [user] = useAuthState(auth);
  // console.log(user);
  // const scroll = useRef();
  // const [messages, setMessages] = useState(null);

  // useEffect(() => {
  //   const articleRef = collection(db, "messages");
  //   const q = query(articleRef, orderBy("createdAt", "desc"));
  //   onSnapshot(q, (snapshot) => {
  //     const messages = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setMessages(messages);
  //     // console.log(messages);
  //   });
  // }, []);

  ////
  const [messages, setMessages] = useState([]);
  const scroll = useRef();

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, []);

  if (!messages) {
    return <h1>LoDING..</h1>;
  }
  return (
    <>
      <main className={style.main}>
        {messages &&
          messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
      </main>
      {/* Send Message Compoenent */}
      <ChatMessage scroll={scroll} />
      <span ref={scroll}></span>
    </>

    // <>
    //   <div className="msgs">
    //     {messages &&
    //       messages.map((message) => {
    //         return (
    //           <div
    //             key={message.id}
    //             className={`msg ${
    //               message.uid === user.uid ? "sent" : "received"
    //             }`}>
    //             <img className="msg-user" src={message.photoURL} alt="" />
    //             <p>{message.text}</p>
    //             <p>{message.userName}</p>
    //           </div>
    //         );
    //       })}
    //   </div>
    //   <ChatMessage scroll={scroll} />
    //   <div ref={scroll}></div>
    // </>
  );
};

export default Chat;
