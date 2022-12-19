import React from "react";
import "./ItemDone.css"
import done from "../assets/GUI/done.png"


const ItemDone = (props) => {
  return (
    <div className="item-done">
      <img src={done} alt="done" className="iconitem" />
      <div className="text">
        <div className="title">{props.name}</div>
        <div className="subtitle">{props.content}</div>
      </div>
    </div>
  );
}

export default ItemDone;
