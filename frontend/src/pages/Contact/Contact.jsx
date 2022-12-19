import React, { useState } from "react";
import "./Contact.css";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Header from "../../Layout/Header/Header";
import { baseUrl } from "../../services/url";
const Contact = () => {


    const [phone, setPhone] = useState("");
    const [content, setContent] = useState("");
    const [message, setMessage] = useState("");

    const [validated, setValidated] = useState(false);


    const handleSend = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
        } else {
            try {
                let res = await fetch(baseUrl + "/user/contact", {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        phone: phone,
                        content: content,
                        url: "daytask app"
                    }),
                    
                });
                let resJson = await res.json();
                if (res.status === 200) {
                    setPhone("");
                    setContent("");
                    setMessage(resJson.message);

                } else {
                    setMessage(resJson.message);
                }
            } catch (err) {
                setMessage("לא נשלח נסה שוב");
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
        <div className="full">
            <Header />
            <div className="content">
            <h1>צור קשר/דיווח על תקלה</h1>

                <Form noValidate validated={validated} onSubmit={handleSend}>
                    <FloatingLabel controlId="floatingInput" label="פלאפון">
                        <Form.Control required type="text" placeholder="פלאפון" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="הודעה">
                        <Form.Control required type="text" placeholder="הודעה" value={content} onChange={(e) => setContent(e.target.value)} />
                    </FloatingLabel>
                    <Button type="submit">שלח</Button>
                    {message}
                </Form>
            </div>
        </div>
    );
}

export default Contact;
