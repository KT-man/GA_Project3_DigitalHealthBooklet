import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import ReactDOM from "react-dom";
import Overlay from "./Overlay";


const AddChild = () => {
const [ editChild, setEditChild ] = useState({
    name: '',
    isMale: '',
    DOB: '',
    _id: null
});
const [ nameInput, setNameInput ] = useState('');
const [ isMaleInput, setIsMaleInput ] = useState('');
const [ DOBInput, setDOBInput ] = useState('');


const handleNameChange = (e) => {
    setDateInput(e.target.value);
};

const handleIsMaleChange = (e) => {
    setIsMaleInput(e.target.value);
};
const handleDOBChange = (e) => {
    setDOVInput(e.target.value);
};


useEffect(
    () => {
        setNameInput(editChild.name);
        setIsMaleInput(editChild.isMale);
        setDOBInput(editChild.DOB);
    },
    [ editChild ]
);
const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
        name: nameInput,
        isMale: isMaleInput,
        DOB: DOBInput,

    };
// input body into the api here

};
return (
    <>
    {ReactDOM.createPortal(
        <Overlay>
            <React.Fragment>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Name of Child</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your Child's name"
                            value={nameInput}
                            onChange={handleNameChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formIsMale">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control
                            type="booleanr"
                            placeholder=""
                            value={isMaleInput}
                            onChange={handleIsMaleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDOB">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="Enter your child's Birthday"
                            value={DOBInput}
                            onChange={handleDOBChange}
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


export default AddChild;