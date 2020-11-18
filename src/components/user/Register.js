import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Link, Redirect } from "react-router-dom";
import authService from "../../services/authService";
import userService from "../../services/userService";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    minWidth: 120,
  },
}));

export default function Register() {
  const classes = useStyles();
  const [profile, setProfile] = useState({
    name: "",
    dob: new Date().toJSON().slice(0, 10),
    gender: 0,
    email: "",
    address: "",
    phone: "",
    username: "",
  });
  if (authService.getCurrentUser()) return <Redirect to="/" />;

  const handleSubmit = (event) => {
    event.preventDefault();
    userService
      .addNewUser({
        ...profile,
        password: document.getElementById("password").value,
      })
      .then((response) => {
        authService.loginWithJwt(response.data.token);
        window.location = "/";
      })
      .catch((error) => alert("Đăng ký thất bại. Tài khoản đã tồn tại."));
  };

  const handleChange = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Đăng ký
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            required
            id="username"
            label="Tên đăng nhập"
            name="username"
            value={profile.username}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Họ tên"
            name="name"
            value={profile.name}
            onChange={handleChange}
          />
          <FormControl
            required
            variant="outlined"
            margin="normal"
            className={classes.formControl}
          >
            <InputLabel id="gender-label">Giới tính</InputLabel>
            <Select
              labelId="gender-label"
              id="gender"
              name="gender"
              label="Gender"
              defaultValue={0}
              value={profile.gender}
              onChange={handleChange}
            >
              <MenuItem value={0}>Bí mật</MenuItem>
              <MenuItem value={1}>Nam</MenuItem>
              <MenuItem value={2}>Nữ</MenuItem>
            </Select>
          </FormControl>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email"
            name="email"
            type="email"
            value={profile.email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="address"
            label="Địa chỉ"
            name="address"
            value={profile.address}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="phone"
            label="Số điện thoại"
            name="phone"
            type="number"
            value={profile.phone}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="dob"
            label="Ngày sinh"
            name="dob"
            InputLabelProps={{
              shrink: true,
            }}
            type="date"
            value={profile.dob}
            onChange={handleChange}
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
            onClick={handleSubmit}
          >
            Đăng ký
          </Button>
          <span>Nếu bạn chưa có tài khoản, </span>
          <Link to="/login" variant="body2">
            nhấn vào đây để đăng nhập!
          </Link>
        </form>
      </div>
    </Container>
  );
}
