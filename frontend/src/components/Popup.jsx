import React from "react";
import "./Popup.css"
import { TaskService} from '../services/TaskService'

const Popup = (props) => {

    return (
        <div className="background" onClick={() => { props.setIsOpen(false) }}>
            <div className="popup">
                <div className="popupname">{props.name}</div>
                <div className="popupcontent">{props.content}</div>
                <div className="popupbtns">
                    <div className="popupbtn" onClick={() => { TaskService().remove(props.id); props.data(); }}>
                        הסר לתמיד
                    </div>
                    <div className="popupbtn" onClick={() => { TaskService().done(props.id); props.data(); }}>
                        בוצע
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Popup;
