import { CircularProgress } from "@material-ui/core";
import React from "react";
import Card from "../card";
import Empty from "../card/Empty";

export default function Column({
  onDrop,
  onDragOver,
  handleClickNewCard,
  cards,
  isLoading,
  columnName,
  type,
  onDoubleClick,
  handleDeleteCard,
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px gray dashed",
        padding: 20,
        paddingTop: 5,
        paddingBottom: 50,
        alignItems: "center",
      }}
      data-type={type}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <h3>{columnName}</h3>
      <Empty handleClickNewCard={handleClickNewCard} type={type} />
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          onDoubleClick={onDoubleClick}
          onDelete={handleDeleteCard}
        />
      ))}
      <CircularProgress style={{ display: isLoading ? "block" : "none" }} />
    </div>
  );
}
