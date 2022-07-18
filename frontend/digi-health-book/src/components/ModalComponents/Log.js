import React, { useState, useEffect } from "react";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      date: dateInput,
      height: heightInput,
      weight: weightInput,
      headCirc: headCircInput,
    };

    const url = "/users/addLog";
    const res = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    });

    const addLogData = await res.json();

    if (addLogData.status === "error") {
      alert(`Please input the correct log data`);
    }
    // input body into the api here
  };
  return (
    <>
      {ReactDOM.createPortal(
        <Overlay>
          <div class="block">
            <label>Future Date</label>
            <input
              type="date"
              placeholder="Date of Input"
              value={dateInput}
              onChange={handleDateChange}
            />
          </div>
          <div class="block">
            <label>Height</label>
            <input
              type="number"
              placeholder="Height"
              value={heightInput}
              onChange={handleHeightChange}
            />
          </div>
          <div class="block">
            <label>Weight</label>
            <input
              type="number"
              placeholder="weight"
              value={weightInput}
              onChange={handleWeightChange}
            />
          </div>
          <div class="block">
            <label>Head Circumference</label>
            <input
              type="number"
              placeholder="head circumference"
              value={headCircInput}
              onChange={handleHeadCircChange}
            />
          </div>
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </Overlay>,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default Log;
