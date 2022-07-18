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


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      date: dateRef,
      location: locationRef,
      doctorName: doctorNameRef,
      futureAppt: futureAppt,
      reason: reasonRef,
    };

    const url = "/users/addAppt";
    const res = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    });
    const addApptData = await res.json();

    if (addApptData.status === "error") {
      alert(`Please enter Appointment details correctly`);
    }
    // input body into the api here
  };
  return (
    <>
      {ReactDOM.createPortal(

        <div className={styles.backdrop}>
        <div className={`${styles.board} ${styles.modal}`}>
          <h2 className={styles.header}>Input Your Child's New Appointment here!</h2>
            <form onClick={handleSubmit}>
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
                <label>Location of Appointment</label>
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
                <input className = {`${styles.inputGender}`} type="radio" name="futureAppt" value={true} />
                <label className = {`${styles.inputGender}`} for="radio-one">Yes</label>
                <input className = {`${styles.inputGender}`} type="radio" name="futureAppt" value={false} />
                <label className = {`${styles.inputGender}`} for="radio-two">No</label>
              </div>
              <div>
                <label className={`${styles.label} `}>Reason of Appointment</label>
                <input
                  className={`${styles.inputName}`}
                  type="text"
                  placeholder="Reason for Visit"
                  ref={reasonRef}
                />
              </div>
              <Button type="submit" onClick={() => props.okayClicked()}>
                Submit
              </Button>
            </form>,
            </div>
        </div>,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default Appointment;
