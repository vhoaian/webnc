import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link, Redirect } from "react-router-dom";
import authService from "../../services/authService";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const [username, setUsername] = useState("");

  const handleClickLogin = (event) => {
    event.preventDefault();
    authService
      .login(username, document.getElementById("password").value)
      .then((_) => (window.location = "/"));
  };

  const handleUsernameChanged = (event) => {
    setUsername(event.target.value);
  };

  const responseFacebook = ({ accessToken, id, name, email, picture }) => {
    authService
      .loginFacebook({
        token: accessToken,
        id,
        name,
        email,
        pictureUrl: picture.data.url,
      })
      .then((_) => (window.location = "/"));
  };

  const responseGoogle = ({ accessToken, profileObj }) => {
    if (!accessToken) return;
    authService
      .loginGoogle({
        token: accessToken,
        id: profileObj.googleId,
        name: profileObj.name,
        email: profileObj.email,
        pictureUrl: profileObj.imageUrl,
      })
      .then((_) => (window.location = "/"));
  };

  if (authService.getCurrentUser()) return <Redirect to="/" />;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Đăng nhập
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            onChange={handleUsernameChanged}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleClickLogin}
          >
            Đăng nhập
          </Button>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <FacebookLogin
              appId="415162146534658"
              // autoLoad={true}
              fields="name,email,picture"
              callback={responseFacebook}
              textButton="Đăng nhập với Facebook"
              buttonStyle={{ margin: 10 }}
            />
            <GoogleLogin
              clientId="685388383345-cgbob49r2bicn64lvkn75854746fqpee.apps.googleusercontent.com"
              buttonText="Đăng nhập với Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
              style={{ margin: 10 }}
            />
            <div style={{ margin: 10 }}>
              <span>Nếu chưa có tài khoản, </span>
              <Link to="/register">nhấn vào đây để đăng ký!</Link>
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
}
