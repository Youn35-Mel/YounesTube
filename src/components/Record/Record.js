import React, { useEffect } from "react";
import { useRecordWebcam } from "react-record-webcam";
import { db, storage } from "../../firebase-config";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
  listAll,
  list,
  deleteObject,
} from "firebase/storage";
var FileSaver = require("file-saver");

const OPTIONS = {
  fileName: "test",
  mimeType: "video/mp4",
  width: 1920,
  height: 1080,
  disableLogs: true,
};
const Record = () => {
  const recordWebcam = useRecordWebcam(OPTIONS);

  const saveFile = async () => {
    const blob = await recordWebcam.getRecording();
    //
    console.log(blob);
    const sotrageRef = ref(storage, `record`);
    console.log(`/Users/younesmel/downloads/test`);
    // recordWebcam.download();
    const uploadTask = uploadBytesResumable(sotrageRef, blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          // const myFile = new File(blob, "demo.mp4", { type: "video/mp4" });
          // FileSaver.saveAs(myFile, "demo.mp4");
          FileSaver.saveAs(blob, "./demo.mp4");
        });
      }
    );
  };

  // useEffect(() => {
  //   recordWebcam.open();
  // }, []);

  return (
    <div>
      <p>Camera status: {recordWebcam.status}</p>
      <button onClick={recordWebcam.open}>Open camera</button>
      <button onClick={recordWebcam.start}>Start recording</button>
      <button onClick={recordWebcam.stop}>Stop recording</button>
      <button onClick={recordWebcam.retake}>Retake recording</button>
      {/* <button onClick={recordWebcam.download}>Download recording</button> */}
      <button onClick={saveFile}>Save file to server</button>
      <video ref={recordWebcam.webcamRef} autoPlay muted />
      <video ref={recordWebcam.previewRef} autoPlay muted loop />
    </div>
  );
};

export default Record;
