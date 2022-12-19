import "./Header.css";
import CIcon from "../../assets/GUI/icon.png";
import Star from "../../assets/GUI/star.svg";
import React, { useState } from "react";
import { Link } from 'react-router-dom';

function Header() {

    //menu
    const [left, setLeft] = useState("-100%");

    const menu = () => {
        if (left == "-100%") setLeft("0");
        else setLeft("-100%")
    };


    async function logout() {
        localStorage.clear()
        window.location = '/';
    }

    return (
        <div>
            <div className="menu" style={{ left: left }} onClick={menu}>
                     <Link to="/home" className="link">בית</Link>
                     <Link to="/history"  className="link">היסטוריה</Link>
                    <Link to="/contact" className="link">צור קשר</Link>
                     <Link to="/setting" className="link">הגדרות</Link>
                    <div className="link" onClick={() => logout()}>התנתק</div>
            </div>
            <div className="top">
                <div className="col" onClick={menu}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="icon"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
                        />
                    </svg>
                </div>
                <div className="col">
                    <img src={CIcon} alt="" className="user" />
                    <div className="morning">יום טוב!!</div>
                </div>
                <div className="col">
                    <a href="https://www.linkedin.com/in/nir-razo" >
                        <img src={Star} alt="" className="icon" />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Header