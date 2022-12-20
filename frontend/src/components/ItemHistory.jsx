import React from "react";
import "./ItemHistory.css"

import done from "../assets/GUI/done.png"
import { useState } from "react";

const ItemHistory = (props) => {


  return (
    <div className="item-done">
      <img src={done} alt="done" className="iconitem" />
      <div className="text">
        <div className="title">{props.name}</div>
        <div className="subtitle">{props.content}</div>
      </div>
        <div className="date">{props.date}</div>
      </div>
  );
}

export default ItemHistory;
