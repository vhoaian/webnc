import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Container,
  FormControlLabel,
  makeStyles,
  Switch,
} from "@material-ui/core";
import socketIOClient from "socket.io-client";
import boardService from "../../services/boardService";
import cardService from "../../services/cardService";
import InputDialog from "../shared/InputDialog";
import Column from "./Column";
import { apiLocation } from "../../config.json";
import authService from "../../services/authService";
import userService from "../../services/userService";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
}));

const socket = socketIOClient(apiLocation, {
  transports: ["websocket"],
});

export default function Board() {
  const classes = useStyles();
  const [board, setBoard] = useState(null);
  const [currentCard, setCurrentCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [isNewCardOpened, setIsNewCardOpen] = useState(false);
  const [isEditCardOpened, setIsEditCardOpen] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [type, setType] = useState(null);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    boardService
      .getBoard(id)
      .then((result) => {
        setBoard(result.data);
        setIsSharing(result.data.is_sharing);
        return result.data.created_by;
      })
      .then((id) => userService.getAvatarSrc(id))
      .then((response) => {
        setAvatar(response);
      })
      .then((_) => cardService.getAllCards(id))
      .then((result) => {
        setCards(result.data);
        setIsLoading(false);
      })
      .catch((error) => {
        alert("Tải bảng thất bại do bảng không tồn tại hoặc chưa được chia sẻ");
        setIsLoading(false);
      });
    socket.emit("join", {
      board_id: id,
    });
    socket.on("update", () => {
      cardService.getAllCards(id).then((result) => {
        setCards(result.data);
      });
    });
  }, [id]);

  function onDrop(ev) {
    ev.preventDefault();
    let card_id = parseInt(ev.dataTransfer.getData("text"));
    if (ev.target.dataset.type) {
      const newType = parseInt(ev.target.dataset.type);
      const card = cards.find((card) => card.id === card_id);
      handleMoveCard(card, newType);
    }
  }

  function allowDrop(ev) {
    ev.preventDefault();
  }

  function handleClickNewCard(type) {
    setIsNewCardOpen(true);
    setType(type);
  }

  function handleSubmitNewCard(content) {
    setIsNewCardOpen(false);
    cardService
      .addNewCard(id, {
        content,
        type,
      })
      .then((result) => {
        setCards([result.data, ...cards]);
        socket.emit("change", { board_id: id });
      });
  }

  function handleClickEditCard(id) {
    setIsEditCardOpen(true);
    setCurrentCard(cards.find((card) => card.id === id));
  }

  function handleSubmitEditCard(content) {
    setIsEditCardOpen(false);
    cardService
      .updateCard(id, currentCard.id, {
        content,
      })
      .then((result) => {
        const _cards = [...cards];
        _cards.find((card) => card.id === currentCard.id).content = content;
        setCards(_cards);
        socket.emit("change", { board_id: id });
      });
  }

  function handleDeleteCard(card_id) {
    cardService.deleteCard(id, card_id).then((result) => {
      const _cards = cards.filter((card) => card.id !== card_id);
      setCards(_cards);
      socket.emit("change", { board_id: id });
    });
  }

  function handleMoveCard(card, newType) {
    if (card.type === newType) return;
    const oldType = card.type;
    const _cards = [...cards];
    _cards.find((_card) => _card.id === card.id).type = newType;
    setCards(_cards);
    cardService
      .updateCard(id, card.id, {
        type: newType,
      })
      .then((result) => {
        socket.emit("change", { board_id: id });
      })
      .catch((error) => {
        _cards.find((_card) => _card.id === card.id).type = oldType;
        setCards([..._cards]);
      });
  }

  function handleChangeSharing() {
    boardService
      .updateBoard(id, {
        is_sharing: !isSharing,
      })
      .then((result) => {
        setIsSharing(result.data.is_sharing);
        // const _cards = [...cards];
        // _cards.find((card) => card.id === currentCard.id).content = content;
        // setCards(_cards);
        // socket.emit("change", { board_id: id });
      });
  }
  return (
    <Container component="main">
      <CssBaseline />
      <div style={{ margin: 20 }}>
        {board && authService.getCurrentUser().id === board.created_by ? (
          <FormControlLabel
            style={{ float: "right" }}
            control={
              <Switch
                checked={isSharing}
                onChange={handleChangeSharing}
                name="isSharing"
                color="primary"
              />
            }
            labelPlacement="start"
            label={isSharing ? "Đang chia sẻ" : "Đã khoá chia sẻ"}
          />
        ) : null}
        <div style={{ display: "flex" }}>
          <Avatar src={avatar} style={{ height: 70, width: 70 }} />
          <h2 style={{ margin: 20 }}>{board ? board.name : null}</h2>
        </div>
      </div>
      <div className={classes.paper}>
        <Column
          onDrop={onDrop}
          onDragOver={allowDrop}
          type={1}
          isLoading={isLoading}
          handleClickNewCard={handleClickNewCard}
          cards={cards.filter((card) => card.type === 1)}
          columnName="Went well"
          onDoubleClick={handleClickEditCard}
          handleDeleteCard={handleDeleteCard}
        />
        <Column
          onDrop={onDrop}
          onDragOver={allowDrop}
          type={2}
          isLoading={isLoading}
          handleClickNewCard={handleClickNewCard}
          cards={cards.filter((card) => card.type === 2)}
          columnName="To improve"
          onDoubleClick={handleClickEditCard}
          handleDeleteCard={handleDeleteCard}
        />
        <Column
          onDrop={onDrop}
          onDragOver={allowDrop}
          type={3}
          isLoading={isLoading}
          handleClickNewCard={handleClickNewCard}
          cards={cards.filter((card) => card.type === 3)}
          columnName="Action Items"
          onDoubleClick={handleClickEditCard}
          handleDeleteCard={handleDeleteCard}
        />
      </div>
      <InputDialog
        open={isNewCardOpened}
        onSubmit={handleSubmitNewCard}
        onClose={() => setIsNewCardOpen(false)}
        title="Thêm thẻ mới"
        content="Nhập nội dung thẻ muốn tạo"
        submitText="Tạo thẻ"
        labelName="Nội dung thẻ"
        fullWidth
        maxWidth="sm"
        defaultValue=""
      />
      <InputDialog
        open={isEditCardOpened}
        onSubmit={handleSubmitEditCard}
        onClose={() => setIsEditCardOpen(false)}
        title="Sửa nội dung thẻ"
        content="Nhập nội dung mới cho thẻ"
        submitText="Lưu thẻ"
        labelName="Nội dung thẻ"
        fullWidth
        maxWidth="sm"
        defaultValue={currentCard ? currentCard.content : ""}
      />
    </Container>
  );
}
