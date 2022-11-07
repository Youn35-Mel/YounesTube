import { db, auth } from "../../firebase-config";
import React, { useState, useEffect, useRef } from "react";
import { Timestamp, collection, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
const style = {
  form: `h-14 w-full max-w-[728px]  flex text-xl absolute bottom-0`,
  input: `w-full text-xl p-3 bg-gray-900 text-white outline-none border-none`,
  button: `w-[20%] bg-green-500`,
};

const ChatMessage = ({ scroll }) => {
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input === "") {
      alert("Please enter a valid message");
      return;
    }
    const { uid, displayName } = auth.currentUser;
    await addDoc(collection(db, "messages"), {
      text: input,
      name: displayName,
      uid,
      timestamp: Timestamp.now().toDate(),
    });
    setInput("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <form onSubmit={sendMessage} className={style.form}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={style.input}
        type="text"
        placeholder="Message"
      />
      <button className={style.button} type="submit">
        Send
      </button>
    </form>
  );
};
//   const [msg, setMsg] = useState("");
//   const [user] = useAuthState(auth);

//   console.log(user);

//   const sendMessage = async (e) => {
//     e.preventDefault();

//     await addDoc(collection(db, "messages"), {
//       text: msg,
//       photoURL: user.photoURL,
//       uid: user.uid,
//       createdAt: Timestamp.now().toDate(),
//       userName: user.displayName,
//     });
//     setMsg("");
//     scroll.current.scrollIntoView({ behavior: "smooth" });
//   };
//   return (
//     <div>
//       <form onSubmit={sendMessage}>
//         <div className="sendMsg">
//           <input
//             style={{
//               width: "78%",
//               fontSize: "15px",
//               fontWeight: "550",
//               marginLeft: "5px",
//               marginBottom: "-3px",
//             }}
//             placeholder="Message..."
//             type="text"
//             value={msg}
//             onChange={(e) => setMsg(e.target.value)}
//           />
//           <button
//             style={{
//               width: "18%",
//               fontSize: "15px",
//               fontWeight: "550",
//               margin: "4px 5% -13px 5%",
//               maxWidth: "200px",
//             }}
//             type="submit">
//             Send
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

export default ChatMessage;
