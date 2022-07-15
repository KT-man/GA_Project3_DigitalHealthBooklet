import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import ReactDOM from "react-dom";
import Overlay from "./Overlay";


const Appointment = () => {
const [ editAppointment, setEditAppointment ] = useState({
    date: '',
    location: '',
    doctorName: '',
    futureAppt: '',
    reason: '',
    _id: null
});
const [ dateInput, setDateInput ] = useState('');
const [ locationInput, setLocationInput ] = useState('');
const [ doctorNameInput, setDoctorNameInput ] = useState('');
const [ futureApptInput, setFutureApptInput ] = useState('');
const [ reasonInput, setReasonInput ] = useState('');




const handleDateChange = (e) => {
    setDateInput(e.target.value);
};

const handlleLocationInput = (e) => {
    setLocationInput(e.target.value);
};
const handleDoctorNameInput = (e) => {
    setDoctorNameInput(e.target.value);
};
const handleFutureApptInput = (e) => {
    setFutureApptInput(e.target.value);
};

const handleReasonInput = (e) => {
    setReasonInput(e.target.value);
};

useEffect(
    () => {
        setDateInput(editAppointment.date);
        setLocationInput(editAppointment.location);
        setDoctorNameInput(editAppointment.doctorName);
        setFutureApptInput(editAppointment.futureAppt);
        setReasonInput(editAppointment.reason)
    },
    [ editAppointment ]
);
const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
        date: dateInput,
        location: locationInput,
        doctorName: doctorNameInput,
        futureAppt: futureApptInput,
        reason: reasonInput
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
                            placeholder="Enter date of appointment"
                            value={dateInput}
                            onChange={handleDateChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formLocation">
                        <Form.Label>Location of Appointment</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter location of clinic"
                            value={locationInput}
                            onChange={handlleLocationInput}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDoctorName">
                        <Form.Label>Doctor's Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter doctor's name"
                            value={doctorNameInput}
                            onChange={handleDoctorNameInput}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formFutureAppt">
                        <Form.Label>Future Appointment </Form.Label>
                        <Form.Control
                            type="boolean"
                            placeholder="Is this a future appointment?"
                            value={futureApptInput}
                            onChange={handleFutureApptInput}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formReason">
                        <Form.Label>Reason for Visit</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter reason for visit"
                            value={reasonInput}
                            onChange={handleReasonInput}
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


export default Appointment;