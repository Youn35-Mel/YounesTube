import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../utils/fetchData";
import spaceVideo from "../../assets/video/Earth.mp4";
import "./Home.scss";
import { db } from "../../firebase-config";
import People from "../People/People";
const Home = () => {
  // const firestoreDb = getFirestore(app);
  const [feeds, setFeeds] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //fetch the data
    getAllUsers(db).then((data) => {
      setLoading(true);
      setFeeds(data);
      setLoading(false);
    });
  }, []);
  return (
    <>
      <video className="video" autoPlay loop muted id="video">
        <source src={spaceVideo} type="video/mp4" />
      </video>
      <div className="account-lists">
        {feeds && // why are putting feeds && feeds.map?
          feeds.map((data) => {
            return <People key={data.id} data={data} />;
          })}
      </div>
    </>
  );
};

export default Home;
