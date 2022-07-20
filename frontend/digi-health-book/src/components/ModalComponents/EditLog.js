import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import Button from "./Button";

const EditLog = (props) => {
  console.log(props);
  const dateRef = useRef();
  const heightRef = useRef();
  const weightRef = useRef();
  const headCircRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      childLogId: props.id,
      date: dateRef.current.value,
      height: heightRef.current.value ? heightRef.current.value : NaN,
      weight: weightRef.current.value ? weightRef.current.value : NaN,
      headCirc: headCircRef.current.value ? headCircRef.current.value : NaN,
    };

    if (dateRef.current.value === "") {
      return alert(`Error! Please ensure "Date" field is filled in`);
    }

    const url = "/users/editLog";
    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    });

    const editLogData = await res.json();

    if (editLogData.status === "error") {
      console.log(editLogData);
      return alert(`Please input the correct log data`);
    }
    props.toSetShowEditLogModal(!props.showEditLogModal);
    alert("Log has been edited!");

    props.fetchChildData();
  };

  return (
    <>
      {ReactDOM.createPortal(
        <div className={styles.backdrop}>
          <div className={`${styles.board} ${styles.modalLog}`}>
            <span class="flex-inline">
              <h2 className={styles.header}>Edit Log</h2>
              <Button onClick={props.toSetShowEditLogModal} type="submit">
                Close X
              </Button>
            </span>
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
                <label className={`${styles.label} `}>
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
            </form>
          </div>
        </div>,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default EditLog;
