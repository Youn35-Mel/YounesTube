import React, { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { fetchUser } from "../../utils/fetchUser";

/// to  be tested
const Saved = ({ user }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedShows);
    });
  }, [user?.email]);

  return <div></div>;
};

export default Saved;
