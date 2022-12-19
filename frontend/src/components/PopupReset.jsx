import React ,{useState} from "react";
import "./Popup.css"
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { baseUrl } from "../services/url";


const PopupReset = (props) => {

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [validated, setValidated] = useState(false);


    const handlePassword = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
        } else {
            try {
                let res = await fetch(baseUrl + "/user/reset", {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: email
                    }),
                });
                let resJson = await res.json();
                if (res.status === 200) {
                    setEmail("");
                    setMessage(resJson.message);
                } else {
                    setMessage(resJson.message);
                }
            } catch (err) {
                setMessage("תקלה בשליחה");
                event.preventDefault();
                event.stopPropagation();
                console.log(err);
            }
        }
        setValidated(true);
        event.preventDefault();
        event.stopPropagation();
    };


    return (
        <div className="background">
            <div className="add">
                <Form noValidate validated={validated} onSubmit={handlePassword}>
                    <FloatingLabel controlId="floatingInput" label="דואר אלקטרוני">
                        <Form.Control required type="email" placeholder="דואר אלקטרוני" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </FloatingLabel>
                    <Button type="submit">שכחתי סיסמא</Button>
                    {message}
                </Form>
                <Button className="back" onClick={() => {props.setIsOpen(false)}} style={{marginTop: "10px"}}>חזור</Button>

            </div>
        </div>
    );
}

export default PopupReset;
