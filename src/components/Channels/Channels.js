import React, { useEffect, useState } from "react";
import { app } from "../../firebase-config";
import { getFirestore } from "firebase/firestore";
import { getAllFeeds } from "../../utils/fetchData";
import Spinner from "../../components/Spinner/Spinner";
import "../VideoPin/VideoPin.scss";
//grid import
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import VideoPin from "../VideoPin/VideoPin";

const Channels = ({ user }) => {
  //firestore database collect instance
  const firestoreDb = getFirestore(app);
  const [feeds, setFeeds] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //fetch the data
    getAllFeeds(firestoreDb).then((data) => {
      setLoading(true);
      setFeeds(data);
      setLoading(false);
    });
    console.log(feeds);
  }, []);

  if (loading) return <Spinner msg={"Loading your feeds/Videos"} />;

  //grid code for Item
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(10),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  return (
    <ul className="channels__High">
      {feeds && // why are putting feeds && feeds.map?
        feeds.map((data) => {
          return <VideoPin key={data.id} data={data} user={user} />;
        })}
    </ul>
  );
};

export default Channels;

{
  /* <div className="map-database">
  {feeds.map((data) => {
    <VideoPin key={data.id} data={data} />;
  })}
</div> */
}
{
  /* <Box sx={{ width: "100%" }}>
  <div className="section">
    <Grid
      container
      rowSpacing={5}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={6}>
        <Item>1</Item>
      </Grid>
      <Grid item xs={6}>
        <Item>2</Item>
      </Grid>
      <Grid item xs={6}>
        <Item>3</Item>
      </Grid>
      <Grid item xs={6}>
        <Item>4</Item>
      </Grid>
    </Grid>{" "}
  </div>
  <div className="section">
    <Grid
      container
      rowSpacing={5}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={6}>
        <Item>1</Item>
      </Grid>
      <Grid item xs={6}>
        <Item>2</Item>
      </Grid>
      <Grid item xs={6}>
        <Item>3</Item>
      </Grid>
      <Grid item xs={6}>
        <Item>4</Item>
      </Grid>
    </Grid>{" "}
  </div>
</Box> */
}
