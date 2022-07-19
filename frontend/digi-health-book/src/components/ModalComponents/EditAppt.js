import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import Button from "./Button";

const EditAppt = (props) => {
  const dateRef = useRef();
  const locationRef = useRef();
  const reasonRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      childApptId: props.id,
      date: dateRef.current.value,
      location: locationRef.current.value ? locationRef.current.value : NaN,
      reason: reasonRef.current.value ? reasonRef.current.value : NaN,
    };

    if (dateRef.current.value === "") {
      return alert(`Error! Please ensure "Date" field is filled in`);
    }

    const url = "/users/editAppt";
    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    });

    const editApptData = await res.json();

    if (editApptData.status === "error") {
      console.log(editApptData);
      return alert(`Please input the correct log data`);
    }
    props.toSetShowEditApptModal(!props.showEditApptModal);
    alert("Appointment has been edited!");
  };

  return (
    <>
      {ReactDOM.createPortal(
        <div className={styles.backdrop}>
          <div className={`${styles.board} ${styles.modalLog}`}>
            <h2 className={styles.header}>Edit Appointment</h2>
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
                <label className={`${styles.label} `}>Location:</label>
                <input
                  className={`${styles.inputLog}`}
                  type="string"
                  placeholder="Location"
                  ref={locationRef}
                />
              </div>
              <div>
                <label className={`${styles.label} `}>Reason</label>
                <input
                  className={`${styles.inputLog}`}
                  type="string"
                  placeholder="Reason"
                  ref={reasonRef}
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

export default EditAppt;
