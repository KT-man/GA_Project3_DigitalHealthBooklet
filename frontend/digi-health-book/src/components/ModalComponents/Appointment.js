import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import Button from "./Button";


const Appointment = () => {
  const [editAppointment, setEditAppointment] = useState({
    date: "",
    location: "",
    doctorName: "",
    futureAppt: "",
    reason: "",
    _id: null,
  });
  const [dateInput, setDateInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [doctorNameInput, setDoctorNameInput] = useState("");
  const [futureApptInput, setFutureApptInput] = useState("");
  const [reasonInput, setReasonInput] = useState("");

  const handleDateChange = (e) => {
    setDateInput(e.target.value);
  };

  const handleLocationInput = (e) => {
    setLocationInput(e.target.value);
  };
  const handleDoctorNameInput = (e) => {
    setDoctorNameInput(e.target.value);
  };
  const handleFutureApptInput = (e) => {
    setFutureApptInput(e.target.value);
  };

  const handleReasonInput = (e) => {
    setReasonInput(e.target.value);
  };

  useEffect(() => {
    setDateInput(editAppointment.date);
    setLocationInput(editAppointment.location);
    setDoctorNameInput(editAppointment.doctorName);
    setFutureApptInput(editAppointment.futureAppt);
    setReasonInput(editAppointment.reason);
  }, [editAppointment]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      date: dateInput,
      location: locationInput,
      doctorName: doctorNameInput,
      futureAppt: futureApptInput,
      reason: reasonInput,
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
          <h3 className={styles.header}>Input Your Child's New Appointment here!</h3>
            <form>
              <div>
                <label>Date</label>
                <input
                 className = {`${styles.input}`}
                  type="date"
                  placeholder="Enter date of appointment"
                  value={dateInput}
                  onChange={handleDateChange}
                />
              </div>
              <div>
                <label>Location of Appointment</label>
                <input
                 className = {`${styles.input}`}
                  type="text"
                  placeholder="Enter location of appointment"
                  value={locationInput}
                  onChange={handleLocationInput}
                />
              </div>
              <div>
                <label>Doctor</label>
                <input
                 className = {`${styles.input}`}
                  type="text"
                  placeholder="Enter Doctor's Name"
                  value={doctorNameInput}
                  onChange={handleDoctorNameInput}
                />
              </div>
              <div>
                <label>Future Appointment</label>
                <input
                 className = {`${styles.input}`}
                  type="text"
                  placeholder="Future Appointment"
                  value={futureApptInput}
                  onChange={handleFutureApptInput}
                />
              </div>
              <div>
                <label>Reason of Appointment</label>
                <input
                 className = {`${styles.input}`}
                  type="text"
                  placeholder="Reason for Visit"
                  value={reasonInput}
                  onChange={handleReasonInput}
                />
              </div>
              <Button type="submit" onClick={handleSubmit}>
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
