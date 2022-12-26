import React from "react";
import "./PopupRemove.css"
import { TaskService } from '../services/TaskService'

const PopupRemove = (props) => {

    return (
        <div className="background" onClick={() => { props.setIsOpenRemove(false) }}>
            <div className="popup">
                <div className="popupname">{props.name}</div>
                <div className="popupcontent">{props.content}</div>
                <div className="popupbtns">
                    <div className="popupbtn" onClick={() => { TaskService().remove(props.id); props.data(); }}>
                        הסר לתמיד
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PopupRemove;
