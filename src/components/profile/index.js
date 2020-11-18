import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  Avatar,
  Button,
  Container,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import userService from "../../services/userService";
import authService from "../../services/authService";
import { Redirect } from "react-router-dom";
import ImageUploader from "react-images-upload";
import { apiLocation } from "../../config.json";

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

const currentUser = authService.getCurrentUser();

export default function Profile() {
  const classes = useStyles();
  const [profile, setProfile] = useState({
    name: "",
    dob: new Date().toJSON().slice(0, 10),
    gender: 0,
    email: "",
    address: "",
    phone: "",
    avatar: "",
  });

  useEffect(() => {
    if (currentUser) {
      userService
        .getUser(currentUser.id)
        .then((result) => {
          const {
            name,
            dob,
            gender,
            email,
            address,
            phone,
            avatar,
          } = result.data;
          setProfile({
            name,
            dob: new Date(dob).toJSON().slice(0, 10),
            gender,
            email: email ? email : "",
            address: address ? address : "",
            phone: phone ? phone : "",
            avatar: avatar ? avatar : "",
          });
        })
        .catch((error) => {});
    }
  }, []);

  const handleChange = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  };

  const handleSave = (event) => {
    event.preventDefault();
    userService
      .updateUser(currentUser.id, {
        ...profile,
        dob: new Date(profile.dob),
      })
      .then((response) => alert("Cập nhật thành công"))
      .catch((error) => alert("Cập nhật thất bại"));
  };

  const handleUploadAvatar = (picture) => {
    if (!picture || picture.length !== 1) return;
    userService.updateAvatar(currentUser.id, picture[0]).then((respone) => {
      setProfile({ ...profile, avatar: respone.data.avatar });
    });
  };

  if (!currentUser) return <Redirect to="/" />;
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        {profile.avatar ? (
          <Avatar
            src={`${apiLocation}/${profile.avatar}`}
            alt="Ảnh đại diện"
            style={{ height: 200, width: 200 }}
          />
        ) : (
          <Avatar
            style={{ height: 200, width: 200, backgroundColor: "purple" }}
          >
            {profile.name}
          </Avatar>
        )}
        <ImageUploader
          buttonText="Chọn ảnh đại diện"
          label="Không chọn ảnh vượt quá 1MB"
          onChange={handleUploadAvatar}
          imgExtension={[".jpg"]}
          maxFileSize={1048576}
          fileSizeError="Kích thước ảnh quá lớn"
          fileTypeError="Chỉ chấp nhận định dạng ảnh jpg"
          singleImage={true}
        />
        <form className={classes.form} noValidate>
          <TextField
            margin="normal"
            fullWidth
            id="username"
            label="Tên đăng nhập"
            name="username"
            InputProps={{
              readOnly: true,
            }}
            variant="filled"
            defaultValue={currentUser.username}
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSave}
          >
            Lưu thông tin
          </Button>
        </form>
      </div>
    </Container>
  );
}
