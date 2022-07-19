import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import Button from "./Button";

const Appointment = (props) => {
  const dateRef = useRef();
  const locationRef = useRef();
  const doctorNameRef = useRef();
  const [futureAppt, setFutureAppt] = useState(true);
  const reasonRef = useRef();

  function onChangeValue(e) {
    setFutureAppt(e.target.value);
    console.log(e.target.value);
  }
  const hideApptModal = () => {
    props.toSetShowApptModal(!props.showApptModal);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      childrenname: props.childData.name,
      date: dateRef.current.value,
      location: locationRef.current.value ? locationRef.current.value : "Empty",
      doctorName: doctorNameRef.current.value
        ? doctorNameRef.current.value
        : "Empty",
      futureAppt: futureAppt.current,
      reason: reasonRef.current.value ? reasonRef.current.value : "Empty",
    };

    if (dateRef.current.value === "") {
      return alert(`Error! Please ensure "Date" field is filled in`);
    }

    const url = "/users/addAppt";
    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    });
    const addApptData = await res.json();

    if (addApptData.status === "error") {
      alert(`Please enter Appointment details correctly`);
    }
    // input body into the api here
    hideApptModal();
    alert("New appointment added!");
  };

  return (
    <>
      {ReactDOM.createPortal(
        <div className={styles.backdrop}>
          <div className={`${styles.board} ${styles.modalAppt}`}>
            <h2 className={styles.header}>
              Input Your Child's New Appointment here!
            </h2>

            <form onSubmit={handleSubmit}>
              <div>
                <label className={`${styles.label}`}>Date</label>
                <input
                  className={`${styles.inputDOB}`}
                  type="date"
                  placeholder="Enter date of appointment"
                  ref={dateRef}
                />
              </div>
              <div>
                <label className={`${styles.label} `}>Location</label>
                <input
                  className={`${styles.inputName}`}
                  type="text"
                  placeholder="Enter location of appointment"
                  ref={locationRef}
                />
              </div>
              <div>
                <label className={`${styles.label} `}>Doctor</label>
                <input
                  className={`${styles.inputName}`}
                  type="text"
                  placeholder="Enter Doctor's Name"
                  ref={doctorNameRef}
                />
              </div>
              <div onChange={onChangeValue}>
                <label className={`${styles.label} `}>Future Appointment</label>
                <input
                  className={`${styles.inputGender}`}
                  type="radio"
                  name="futureAppt"
                  value={true}
                />
                <label className={`${styles.inputGender}`} htmlFor="radio-one">
                  Yes
                </label>
                <input
                  className={`${styles.inputGender}`}
                  type="radio"
                  name="futureAppt"
                  value={false}
                />
                <label className={`${styles.inputGender}`} htmlFor="radio-two">
                  No
                </label>
              </div>
              <div>
                <label className={`${styles.label} `}>Reason</label>
                <input
                  className={`${styles.inputName}`}
                  type="text"
                  placeholder="Reason for Visit"
                  ref={reasonRef}
                />
              </div>
              <Button type="submit">Submit</Button>
              <Button onClick={hideApptModal}>Close X</Button>
            </form>
          </div>
        </div>,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default Appointment;
