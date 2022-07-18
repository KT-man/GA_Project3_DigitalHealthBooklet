import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import Button from "./Button";

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
        <div className={styles.backdrop}>
          <div className={`${styles.board} ${styles.modal}`}>
            <h3 className={styles.header}>Input Your Child's New Growth here!</h3>
            <form>
              <div>
                <label>Future Date</label>
                <input
                  className={`${styles.input}`}
                  type="date"
                  placeholder="Date of Input"
                  value={dateInput}
                  onChange={handleDateChange}
                />
              </div>
              <div>
                <label>Height</label>
                <input
                  className={`${styles.input}`}
                  type="number"
                  placeholder="Height"
                  value={heightInput}
                  onChange={handleHeightChange}
                />
              </div>
              <div>
                <label>Weight</label>
                <input
                  className={`${styles.input}`}
                  type="number"
                  placeholder="weight"
                  value={weightInput}
                  onChange={handleWeightChange}
                />
              </div>
              <div>
                <label>Head Circumference</label>
                <input
                  className={`${styles.input}`}
                  type="number"
                  placeholder="head circumference"
                  value={headCircInput}
                  onChange={handleHeadCircChange}
                />
              </div>
              <Button type="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </form>
          </div>
        </div>,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default Log;
