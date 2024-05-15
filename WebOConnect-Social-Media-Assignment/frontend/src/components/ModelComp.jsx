import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function ModelComp() {
  const [open, setOpen] = React.useState(false);

  const token = localStorage.getItem("token");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);

    const uploadedFile = formData.get('file'); 
    const description = formJson.name;

    formData.append("media_url", uploadedFile);
    formData.append("content", formJson);

    fetch("http://localhost:8080/user-post", {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    }).then((res) => res.json()).then((data) => {
      alert(data.message)
    }).catch((err) => {
      console.log(err, "------------------err")
    })
    handleClose();
  };


  return (
    <React.Fragment>
      <Button
        variant="contained"
        style={{ backgroundColor: "blue", marginLeft: 20 }}
        onClick={handleClickOpen}
      >
        <AddIcon sx={{ color: "white" }} />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleFormSubmit,
        }}
      >
        <DialogTitle>Add Post</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: 'black' }}>
            Enter the description of your post
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContentText>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            sx={{ marginTop: 1 }}
          >
            Upload file
            <VisuallyHiddenInput type="file" name="file" />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Upload</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
