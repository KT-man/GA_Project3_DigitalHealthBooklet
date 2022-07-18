import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import Button from "./Button";

const Log = (props) => {
  const dateRef = useRef();
  const heightRef = useRef();
  const weightRef = useRef();
  const headCircRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      date: dateRef,
      height: heightRef,
      weight: weightRef,
      headCirc: headCircRef,
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
            <h2 className={styles.header}>
              Input Your Child's New Growth here!
            </h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Future Date</label>
                <input
                   className={`${styles.inputName}`}
                  type="date"
                  placeholder="Date of Input"
                  ref={dateRef}
                />
              </div>
              <div>
                <label>Height</label>
                <input
                  className={`${styles.inputName}`}
                  type="number"
                  placeholder="Height"
                  ref={heightRef}
                />
              </div>
              <div>
                <label>Weight</label>
                <input
                  className={`${styles.inputName}`}
                  type="number"
                  placeholder="Weight"
                  ref={weightRef}
                />
              </div>
              <div>
                <label>Head Circumference</label>
                <input
                  className={`${styles.inputName}`}
                  type="number"
                  placeholder="Head circumference"
                  ref={headCircRef}
                />
              </div>

              <Button type="submit" onClick={() => props.okayClicked()}>
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
