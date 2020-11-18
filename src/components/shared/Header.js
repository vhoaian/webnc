import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import authService from "../../services/authService";
import { Link } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

const Header = ({ user }) => {
  const classes = useStyles();
  const handleLogout = () => {
    authService.logout();
    window.location = "/";
  };
  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar className={classes.toolbar}>
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          className={classes.toolbarTitle}
          component={Link}
          to={"/"}
        >
          Board
        </Typography>

        {user ? (
          <React.Fragment>
            <Button
              component={Link}
              to="/profile"
              variant="contained"
              color="primary"
              className={classes.link}
              startIcon={<PersonIcon />}
            >
              Hồ sơ
            </Button>
            <Button
              onClick={handleLogout}
              color="primary"
              variant="outlined"
              className={classes.link}
              startIcon={<ExitToAppIcon />}
            >
              Đăng xuất
            </Button>
          </React.Fragment>
        ) : (
          <Button
            component={Link}
            to="/login"
            color="primary"
            variant="outlined"
            className={classes.link}
            startIcon={<PersonIcon />}
          >
            Đăng nhập
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
