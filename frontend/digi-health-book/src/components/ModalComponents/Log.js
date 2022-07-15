import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import ReactDOM from "react-dom";
import Overlay from "./Overlay";


const Log = () => {
const [ editLog, setEditLog ] = useState({
    date: '',
    height: '',
    weight: '',
    headCircum: '',
    _id: null
});
const [ dateInput, setDateInput ] = useState('');
const [ heightInput, setHeightInput ] = useState('');
const [ weightInput, setWeightInput ] = useState('');
const [ headCircumInput, setHeadCircumInput ] = useState('');




const handleDateChange = (e) => {
    setDateInput(e.target.value);
};

const handleHeightChange = (e) => {
    setHeightInput(e.target.value);
};
const handleWeightChange = (e) => {
    setWeightnput(e.target.value);
};
const handleHeadCircumChange = (e) => {
    setHeadCircumInput(e.target.value);
};

useEffect(
    () => {
        setDateInput(editLog.date);
        setHeightInput(editLog.height);
        setWeightInput(editLog.weight);
        setHeadCircumInput(editLog.headCircum);
    },
    [ editLog ]
);
const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
        date: dateInput,
        height: heightInput,
        weight: weightInput,
        headCircum: headCircumInput
    };
// input body into the api here

};
return (
    <>
    {ReactDOM.createPortal(
        <Overlay>
            <React.Fragment>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formDate">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="Enter date of entry"
                            value={dateInput}
                            onChange={handleDateChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formHeight">
                        <Form.Label>Height</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter child's height"
                            value={heightInput}
                            onChange={handleHeightChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formWeight">
                        <Form.Label>Weight</Form.Label>
                        <Form.Control
                            type="number"
                            min="0"
                            placeholder="Enter product price"
                            value={weightInput}
                            onChange={handleWeightChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formHeadCircum">
                        <Form.Label>Head Circumference</Form.Label>
                        <Form.Control
                            type="number"
                            min="0"
                            placeholder="Enter product quantity"
                            value={headCircumInput}
                            onChange={handleHeadCircumChange}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </React.Fragment>
        </Overlay>,
     document.querySelector("#modal-root")
     )}
     </>
    ) 
};


export default Log;