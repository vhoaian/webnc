import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

import BoardList from "../board/BoardList";
import { CircularProgress } from "@material-ui/core";
import boardService from "../../services/boardService";
import InputDialog from "../shared/InputDialog";
import AlertDialog from "../shared/AlertDialog";

export default function Home() {
  const [boards, setBoards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openInputDialog, setOpenInputDialog] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);

  const [currentSelectedBoard, setCurrentSelectedBoard] = useState(null);
  const handleEdit = (id) => {
    setOpenInputDialog(true);
    setCurrentSelectedBoard(boards.find((board) => board.id === id));
  };
  const handleDelete = (id) => {
    setOpenAlertDialog(true);
    setCurrentSelectedBoard(boards.find((board) => board.id === id));
  };
  const handleCloseInputDialog = () => setOpenInputDialog(false);
  const handleCloseAlertDialog = () => setOpenAlertDialog(false);
  const handleSubmitInputDialog = (content) => {
    if (content !== currentSelectedBoard.name) {
      boardService.updateBoard(currentSelectedBoard.id, {
        name: content,
      });
      const _boards = [...boards];
      _boards.find(
        (board) => board.id === currentSelectedBoard.id
      ).name = content;
      setBoards(_boards);
    }
    setOpenInputDialog(false);
  };
  const handleSubmitAlertDialog = () => {
    boardService.deleteBoard(currentSelectedBoard.id);
    const _boards = boards.filter(
      (board) => board.id !== currentSelectedBoard.id
    );
    setBoards(_boards);
    setOpenAlertDialog(false);
  };

  useEffect(() => {
    boardService.getAllBoards().then((result) => {
      setBoards(result.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <BoardList
          boards={boards}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
        <CircularProgress style={{ display: isLoading ? "block" : "none" }} />
        <InputDialog
          open={openInputDialog}
          onClose={handleCloseInputDialog}
          onSubmit={handleSubmitInputDialog}
          title={`Cập nhật bảng`}
          content={`Nhập tên mới cho bảng:`}
          submitText="Cập nhật"
          labelName="Nhập tên bảng"
          fullWidth
          maxWidth="sm"
          defaultValue={currentSelectedBoard ? currentSelectedBoard.name : ""}
        />
        <AlertDialog
          open={openAlertDialog}
          onSubmit={handleSubmitAlertDialog}
          onClose={handleCloseAlertDialog}
          title="Xoá bảng"
          content={`Xác nhận xoá bảng ${
            currentSelectedBoard ? currentSelectedBoard.name : ""
          }?`}
          submitText="Xác nhận"
        />
      </main>
    </React.Fragment>
  );
}
