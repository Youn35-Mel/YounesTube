import * as React from "react";
import "./ProfileItem.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import { pink } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import { deleteVideo } from "../../utils/fetchData";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const ProfileItem = ({ item, deleteProfileVideo }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div
      onClick={() => {
        // props.sideClickHandler(props.user.id);
      }}>
      <li className="video-list__item">
        <button onClick={handleOpen} className="video-list__delete">
          <DeleteIcon />
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Delete
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Are you sure you want to delete this video?
            </Typography>
            <IconButton aria-label="delete">
              <DeleteIcon
                sx={{ color: pink[500] }}
                onClick={() => deleteProfileVideo(item.id)}
              />
            </IconButton>
          </Box>
        </Modal>
        <video className="video-list__img" src={item?.videoUrl}></video>
        <div className="video-list__title-name-container">
          <h3 className="video-list__title">{item.title}</h3>
          <p className="video-list__channel"> {item.description}</p>
        </div>
      </li>
    </div>
  );
};

export default ProfileItem;
