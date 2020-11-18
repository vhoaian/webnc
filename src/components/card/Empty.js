import React from "react";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const Empty = ({ handleClickNewCard, type }) => {
  return (
    <Button
      color="primary"
      variant="outlined"
      style={{
        fontSize: "1.2em",
        margin: 5,
      }}
      startIcon={<AddIcon />}
      onClick={() => handleClickNewCard(type)}
    >
      Tạo thẻ mới
    </Button>
  );
};

export default Empty;
