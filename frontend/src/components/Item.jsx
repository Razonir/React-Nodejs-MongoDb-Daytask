import React from "react";
import "./Item.css"
import not from "../assets/GUI/not.png"

const Item = (props) => {


  return (
    <div className="item">
      <div className="action" style={{opacity: props.op}}>+</div>
      <img src={not} alt="daytask" className="iconitem" />
      <div className="text">
        <div className="title">{props.name}</div>
        <div className="subtitle">{props.content}</div>
      </div>
    </div>
  );
}

export default Item;
