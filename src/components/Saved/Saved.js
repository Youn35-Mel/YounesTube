import React, { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { fetchUser } from "../../utils/fetchUser";
import { useParams } from "react-router-dom";

/// to  be tested
const Saved = ({ user }) => {
  const { userId } = useParams();
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    onSnapshot(doc(db, "videos", `${userId}`), (doc) => {
      setFeeds(doc.data()?.Saved);
    });
  }, [userId]);

  return (
    <div>
      {feeds &&
        feeds.map((item) => {
          console.log(item);
        })}
    </div>
  );
};

export default Saved;
