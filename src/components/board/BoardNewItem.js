import React from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    minHeight: "250px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: "url('/plus.png')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    border: "1px gray dashed",
    backgroundSize: "40%",
    "&:hover": {
      backgroundColor: "rgba(1, 0, 0, 0.1)",
    },
    "&:hover > a": {
      visibility: "visible",
    },
    "& > a": {
      visibility: "hidden",
    },
  },
}));

const BoardNewItem = () => {
  const classes = useStyles();
  return (
    <Card className={classes.card} elevation={0}>
      <Button
        component={Link}
        to="/board/new"
        color="primary"
        variant="contained"
        startIcon={<AddIcon />}
      >
        Tạo bảng mới
      </Button>
    </Card>
  );
};

export default BoardNewItem;
