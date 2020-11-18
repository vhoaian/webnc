import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import BoardItem from "./BoardItem";
import BoardNewItem from "./BoardNewItem";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const BoardList = ({ boards, handleEdit, handleDelete }) => {
  const classes = useStyles();

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        <Grid item key="add" xs={12} sm={6} md={4}>
          <BoardNewItem />
        </Grid>
        {boards.map((board) => (
          <Grid item key={board.id} xs={12} sm={6} md={4}>
            <BoardItem
              name={board.name}
              created_at={board.created_at}
              id={board.id}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BoardList;
