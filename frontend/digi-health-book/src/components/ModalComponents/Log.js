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
      method: "PATCH",
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
          <div className={`${styles.board} ${styles.modalLog}`}>
            <h2 className={styles.header}>
              Input Your Child's New Growth here!
            </h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label className={`${styles.label} `}>Date:</label>
                <input
                   className={`${styles.inputLog}`}
                  type="date"
                  placeholder="Date of Input"
                  ref={dateRef}
                />
              </div>
              <div>
                <label className={`${styles.label} `}>Height in cm:</label>
                <input
                  className={`${styles.inputLog}`}
                  type="number"
                  placeholder="Height"
                  ref={heightRef}
                />
              </div>
              <div>
                <label className={`${styles.label} `}>Weight in kg:</label>
                <input
                  className={`${styles.inputLog}`}
                  type="number"
                  placeholder="Weight"
                  ref={weightRef}
                />
              </div>
              <div>
                <labe className={`${styles.label} `}>Head Circumference in cm:</labe>
                <input
                  className={`${styles.inputLog}`}
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
