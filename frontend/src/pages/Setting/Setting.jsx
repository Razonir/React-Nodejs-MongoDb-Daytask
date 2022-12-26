import React, { useState } from "react";
import "./Setting.css";
import Header from "../../Layout/Header/Header";
import { Link } from "react-router-dom";
import { UserService } from "../../services/UserService";
const Setting = () => {

    async function logout() {
        localStorage.clear()
        window.location = '/';
    }

    return (
        <div className="full">
            <Header />
            <div className="content">
                <div className="setting">
                <div  className="link" onClick={() => {UserService().remove(); logout();} }>מחק משתמש</div>
                <div  className="link" onClick={() => {UserService().remove(); logout();} }>מחק היסטוריה</div>
                <Link to="/contact" className="link">צור קשר</Link>
                <div  className="link" onClick={() => logout()}>התנתק</div>
                </div>
            </div>
        </div>
    );
}

export default Setting;
