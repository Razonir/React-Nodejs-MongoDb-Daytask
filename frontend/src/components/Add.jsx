import React from "react";
import { useState } from "react";
import "./add.css"
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { baseUrl } from "../services/url";

const Add = (props) => {

    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const [message, setMessage] = useState("");

    const [validated, setValidated] = useState(false);

    const handleAdd = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
        } else {
            try {
                let token = localStorage.getItem('token');
                const myHeaders = new Headers();
                myHeaders.append('Content-Type', 'application/json');
                myHeaders.append('Authorization', token);
                let res = await fetch(baseUrl + "/task/add", {
                    method: "POST",
                    headers: myHeaders,
                    body: JSON.stringify({
                        name: name,
                        content: content
                    }),
                    
                });
                let resJson = await res.json();
                if (res.status === 200) {
                    setMessage(resJson.message);
                    props.setAdd(false);
                    props.addTask()
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

    return (
        <div className="background">
            <div className="add">
                <Form noValidate validated={validated} onSubmit={handleAdd}>
                    <FloatingLabel controlId="floatingInput" label="משימה">
                        <Form.Control required type="text" placeholder="משימה" value={name} onChange={(e) => setName(e.target.value)} />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="תוכן">
                        <Form.Control required type="text" placeholder="תוכן" value={content} onChange={(e) => setContent(e.target.value)} />
                    </FloatingLabel>
                    <Button type="submit">הירשם</Button>
                    {message}
                </Form>
            </div>
        </div>
    );
}

export default Add;
