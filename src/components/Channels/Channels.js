import React, { useEffect, useState } from "react";
import { app } from "../../firebase-config";
import { getFirestore } from "firebase/firestore";
import { getAllFeeds } from "../../utils/fetchData";
import Spinner from "../../components/Spinner/Spinner";
import "../VideoPin/VideoPin.scss";
import "./Channel.scss";
//grid import
import VideoPin from "../VideoPin/VideoPin";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";

const Channels = ({ user }) => {
  //firestore database collect instance
  const firestoreDb = getFirestore(app);
  const [feeds, setFeeds] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [likeClicked, setLikeClicked] = useState(false);
  const [row, setRow] = useState(true);

  const changeFormat = (layout) => {
    layout === "module" ? setRow(false) : setRow(true);
  };

  useEffect(() => {
    //fetch the data
    getAllFeeds(firestoreDb).then((data) => {
      setLoading(true);
      setFeeds(data);
      setLoading(false);
      setLikeClicked(false);
    });
  }, [likeClicked]);

  if (loading) return <Spinner msg={"Loading your feeds/Videos"} />;

  return (
    <>
      <div className="search">
        <input
          type="text"
          className="search__search"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <div>
          <button onClick={() => changeFormat("module")}>
            <ViewModuleIcon />
          </button>
          <button
            id="quilt"
            onClick={() => {
              changeFormat("quilt");
            }}>
            <ViewQuiltIcon />
          </button>
        </div>
      </div>
      <div className={`${row ? "mainContainer" : "column"}`}>
        {feeds &&
          feeds
            .filter((video) => {
              return search.toLowerCase() === ""
                ? video
                : video.title.toLowerCase().includes(search) ||
                    video.title.toLowerCase().includes(search);
            })
            .map((data) => {
              return (
                <VideoPin
                  key={data.id}
                  data={data}
                  user={user}
                  setLikeClicked={setLikeClicked}
                  row={row}
                />
              );
            })}
      </div>
    </>
  );
};

export default Channels;
