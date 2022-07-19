import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import Button from "./Button";

const Log = (props) => {
  const dateRef = useRef();
  const heightRef = useRef();
  const weightRef = useRef();
  const headCircRef = useRef();

  const hideModal = () => {
    props.toSetShowLogModal(!props.showLogModal);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      childrenname: props.childData.name,
      date: dateRef.current.value,
      height: heightRef.current.value ? heightRef.current.value : NaN,
      weight: weightRef.current.value ? weightRef.current.value : NaN,
      headCirc: headCircRef.current.value ? headCircRef.current.value : NaN,
    };

    if (dateRef.current.value === "") {
      return alert(`Error! Please ensure "Date" field is filled in`);
    }

    const url = "/users/addLog";
    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    });

    const addLogData = await res.json();

    if (addLogData.status === "error") {
      console.log(addLogData);
      return alert(`Please input the correct log data`);
    }
    hideModal();
    alert("New Log Added!");
  };

  return (
    <>
      {ReactDOM.createPortal(
        <div className={styles.backdrop}>
          <div className={`${styles.board} ${styles.modalLog}`}>
            <h2 className={styles.header}>
              New Log details for {props.childData.name}
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
                <label className={`${styles.chicken} `}>
                  Head Circumference in cm:
                </label>
                <input
                  className={`${styles.inputLog}`}
                  type="number"
                  placeholder="Head circumference"
                  ref={headCircRef}
                />
              </div>
              <Button type="submit">Submit</Button>
              <Button onClick={hideModal}>Close X</Button>
            </form>
          </div>
        </div>,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default Log;
