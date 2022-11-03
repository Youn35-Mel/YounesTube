import { app } from "../firebase-config";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";

//documentation on getting data from firebase
// const querySnapshot = await getDocs(collection(db, "cities"));
// querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//   console.log(doc.id, " => ", doc.data());
// });

// fetch all docs from firebase and export the function where it will be collected on
//HomePage useffect
export const getAllFeeds = async (firestoreDb) => {
  const feeds = await getDocs(
    query(collection(firestoreDb, "videos"), orderBy("id", "desc"))
  );

  return feeds.docs.map((doc) => doc.data());
};

// CategoryWise Feeds
export const categoryFeeds = async (firestoreDb, categoryId) => {
  const feeds = await getDocs(
    query(
      collection(firestoreDb, "videos"),
      where("category", "==", categoryId),
      orderBy("id", "desc")
    )
  );

  return feeds.docs.map((doc) => doc.data());
};

// Get recommended feeds
export const recommendedFeed = async (firestoreDb, categoryId, videoId) => {
  const feeds = await getDocs(
    query(
      collection(firestoreDb, "videos"),
      where("category", "==", categoryId),
      where("id", "!=", videoId),
      orderBy("id", "desc")
    )
  );

  return feeds.docs.map((doc) => doc.data());
};

// useruploaded videos
export const userUploadedVideos = async (firestoreDb, userId) => {
  const feeds = await getDocs(
    query(
      collection(firestoreDb, "videos"),
      where("userId", "==", userId),
      orderBy("id", "desc")
    )
  );

  return feeds.docs.map((doc) => doc.data());
};

// fetch the user information user userId
//in order to get img profile for each video
//look at videopin file to see how its use
export const getUserInfo = async (firestoreDb, userId) => {
  const userRef = doc(firestoreDb, "users", userId); //needs database of users and userId

  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    return "No Such Document";
  }
};

// fetch the specific Video
export const getSpecificVideo = async (firestoreDb, videoId) => {
  const videoRef = doc(firestoreDb, "videos", videoId);

  const videoSnap = await getDoc(videoRef);
  if (videoSnap.exists()) {
    return videoSnap.data();
  } else {
    return "No Such Document";
  }
};

export const deleteVideo = async (fireStoreDb, videoId) => {
  await deleteDoc(doc(fireStoreDb, "videos", videoId));
};
