import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function InputDialog({
  open,
  onSubmit,
  onClose,
  title,
  content,
  submitText,
  closeText,
  labelName,
  inputId,
  inputType,
  fullWidth,
  maxWidth,
  defaultValue,
}) {
  const [value, setValue] = useState("");
  const handleClose = onClose;

  const handleSubmit = () => {
    onSubmit(value);
    setValue(defaultValue);
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth={fullWidth}
      maxWidth={maxWidth || "md"}
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id={inputId || "name"}
          label={labelName}
          type={inputType || "text"}
          fullWidth
          onChange={(evt) => setValue(evt.target.value)}
          value={value}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary" variant="outlined">
          {closeText || "Đóng"}
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          {submitText || "OK"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
