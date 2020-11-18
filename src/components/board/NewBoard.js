import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import boardService from "../../services/boardService";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    alignSelf: "center",
  },
}));

export default function NewBoard() {
  const classes = useStyles();
  const history = useHistory();
  const handlePost = (event) => {
    event.preventDefault();
    boardService
      .addNewBoard(document.getElementById("name").value)
      .then(function (response) {
        history.push(`/board/${response.data.id}`);
      })
      .catch(function (error) {});
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Thêm bảng mới
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Tên bảng"
            name="name"
            autoFocus
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handlePost}
          >
            Tạo bảng
          </Button>
        </form>
      </div>
    </Container>
  );
}
