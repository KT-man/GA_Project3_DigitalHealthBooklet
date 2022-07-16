import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import ReactDOM from "react-dom";
import Overlay from "react-bootstrap/Overlay";
import Button from "react-bootstrap/Button";

const Log = () => {
  const [editLog, setEditLog] = useState({
    date: "",
    height: "",
    weight: "",
    headCirc: "",
    _id: null,
  });
  const [dateInput, setDateInput] = useState("");
  const [heightInput, setHeightInput] = useState("");
  const [weightInput, setWeightInput] = useState("");
  const [headCircInput, setHeadCircInput] = useState("");

  const handleDateChange = (e) => {
    setDateInput(e.target.value);
  };

  const handleHeightChange = (e) => {
    setHeightInput(e.target.value);
  };
  const handleWeightChange = (e) => {
    setWeightInput(e.target.value);
  };
  const handleHeadCircChange = (e) => {
    setHeadCircInput(e.target.value);
  };

  useEffect(() => {
    setDateInput(editLog.date);
    setHeightInput(editLog.height);
    setWeightInput(editLog.weight);
    setHeadCircInput(editLog.headCirc);
  }, [editLog]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      date: dateInput,
      height: heightInput,
      weight: weightInput,
      headCirc: headCircInput,
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
              <Form.Group className="mb-3" controlId="formHeadCirc">
                <Form.Label>Head Circumference</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  placeholder="Enter product quantity"
                  value={headCircInput}
                  onChange={handleHeadCircChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </Form>
          </React.Fragment>
        </Overlay>,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default Log;
