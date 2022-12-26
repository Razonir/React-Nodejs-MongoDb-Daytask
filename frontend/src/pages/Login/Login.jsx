import React from "react";
import { useState } from "react";
import "./Login.css"
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PopupReset from "../../components/PopupReset";
import img3d from "../../assets/GUI/3d.jpg";
import { baseUrl } from "../../services/url";
import { useEffect } from "react";
import { UserService } from "../../services/UserService";

const Login = () => {
    const [full, setFull] = useState(false)
    const [signIn, setSignIn] = useState(true)
    const [signUp, setSignUp] = useState(true)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const [validated, setValidated] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    const handleSignUp = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
        } else {
            try {
                let res = await fetch(baseUrl + "/user/signup", {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    }),
                });
                let resJson = await res.json();
                if (res.status === 200) {
                    try {
                        let res = await fetch(baseUrl + "/user/contact", {
                            method: "POST",
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                phone: email,
                                content: 'משתמש נרשם',
                                url: "daytask app"
                            }),
                        });
                        let resJson = await res.json();
                    } catch (err) {
                        console.log(err);
                    }

                    let res = await fetch(baseUrl + "/user/login", {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            email: email,
                            password: password
                        }),

                    });
                    resJson = await res.json();
                    localStorage.setItem('token', resJson.token)
                    setEmail("");
                    setPassword("");
                    setMessage(resJson.message);
                    window.location = '/home'

                } else {
                    setMessage(resJson.message);
                }
            } catch (err) {
                setMessage("תקלה במכשיר שלך, רענן את הדף ונסה שוב");
                event.preventDefault();
                event.stopPropagation();
                console.log(err);
            }
        }
        setValidated(true);
        event.preventDefault();
        event.stopPropagation();
    };


    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
        } else {
          try {
            let res = await fetch(baseUrl + "/user/login", {
              method: "POST",
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: email,
                password: password
              }),
      
            });
            let resJson = await res.json();
            if (res.status === 200) {
              localStorage.setItem('token', resJson.token)
              setMessage(resJson.message);
              window.location = '/home'
      
            } else {
              setMessage(resJson.message);
            }
          } catch (err) {
            setMessage("תקלה במכשיר שלך, רענן את הדף ונסה שוב");
            event.preventDefault();
            event.stopPropagation();
            console.log(err);
          }
        }
        setValidated(true);
        event.preventDefault();
        event.stopPropagation();
      };
      
      useEffect(() => {
        if (localStorage.getItem('token') != undefined) {
          window.location = '/';
        }

      }, [])
      
    return (
        <div className="loginpage">
            <img src={img3d} alt="3dimg" style={{ maxWidth: '40%' }} />
            {full || <div className="login" onClick={() => { setSignIn(false); setFull(true) }}>התחבר</div>}
            {signIn ||
                <div >
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <FloatingLabel controlId="floatingInput" label="דואר אלקטרוני">
                            <Form.Control required type="email" placeholder="דואר" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword" label="סיסמא">
                            <Form.Control required type="password" placeholder="סיסמא" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <div onClick={() => { setIsOpen(true); }}>שחכתי סיסמא</div>

                        </FloatingLabel>
                        <Button type="submit">התחבר</Button>
                    </Form>
                    {message}
                </div>

            }
            {full || <div className="signup" onClick={() => { setSignUp(false); setFull(true) }}>הירשם</div>}
            {signUp ||
                <div >
                    <Form noValidate validated={validated} onSubmit={handleSignUp}>
                        <FloatingLabel controlId="floatingInput" label="דואר אלקטרוני">
                            <Form.Control required type="email" placeholder="דואר" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword" label="סיסמא">
                            <Form.Control required type="password" placeholder="סיסמא" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </FloatingLabel>
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="אישור דיוור "
                            required
                        />
                        <Button type="submit">הירשם</Button>
                        {message}
                    </Form>
                </div>
            }
            {!full || <div onClick={() => { setSignIn(true); setSignUp(true); setFull(false) }}>חזור</div>}
            {isOpen && <PopupReset
                setIsOpen={setIsOpen}
            />}
        </div>
    );
}

export default Login;
