import React, { useEffect, useState } from "react";
import { Avatar, Chip } from "@material-ui/core";
import userService from "../../services/userService";

const Card = ({ card, onDoubleClick, onDelete }) => {
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.dataset.id);
  }
  function handleDoubleClick() {
    onDoubleClick(card.id);
  }
  function handleDelete() {
    onDelete(card.id);
  }
  const [avatar, setAvatar] = useState(null);
  useEffect(() => {
    userService.getAvatarSrc(card.created_by).then((response) => {
      setAvatar(response);
    });
  }, [card.created_by]);
  return (
    <Chip
      avatar={<Avatar src={avatar} />}
      label={card.content}
      color="primary"
      style={{
        fontSize: "1.2em",
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
        margin: 5,
      }}
      onDelete={handleDelete}
      draggable
      data-id={card.id}
      onDragStart={drag}
      onDoubleClick={handleDoubleClick}
    />
  );
};

export default Card;
