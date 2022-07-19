import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import Button from "./Button";

const ChildData = (props) => {
  console.log(props);

  return (
    <>
      {ReactDOM.createPortal(
        <div className={styles.backdrop}>
          <div className={`${styles.board} ${styles.modal}`}>
            <h3 className={styles.header}>{props.childData.name}'s Details</h3>
            <div>Gender: {props.childData.isMale ? "Male" : "Female"}</div>
            <div>
              {props.childData.name}'s Birthday:{" "}
              {props.childData.DOB.split("T")[0]}
            </div>
            <br></br>
            <hr></hr>
            <br></br>
            <div>
              Upcoming Appointments:
              {props.childData.appointments.length === 0 ? (
                "Please add an appointment first!"
              ) : (
                <table>
                  <thead>
                    <tr>
                      <td>Date</td>
                      <td>Location</td>
                      <td>Reason</td>
                    </tr>
                  </thead>
                  <tbody>
                    {props.childData.appointments.map((appt) => {
                      return (
                        <tr key={appt._id}>
                          <td>{appt.date.split("T")[0]}</td>
                          <td>{appt.location}</td>
                          <td>{appt.reason}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
            <br></br>
            <hr></hr>
            {/* Stretch goals afterwards to make the appointments / logs show most recent 5, then to scroll next page */}
            <br></br>
            <div>
              Growth Logs:
              {props.childData.logs.length === 0 ? (
                "Please add a log first!"
              ) : (
                <table>
                  <thead>
                    <tr>
                      <td>Date</td>
                      <td>Height</td>
                      <td>Weight</td>
                      <td>Head Circumference</td>
                    </tr>
                  </thead>
                  <tbody>
                    {props.childData.logs.map((log) => {
                      return (
                        <tr key={log._id}>
                          <td>{log.date.split("T")[0]}</td>
                          <td>{log.height}</td>
                          <td>{log.weight}</td>
                          <td>{log.headCirc}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
            <br></br>
            <Button onClick={props.toSetShowChildDataModal} type="submit">
              Close
            </Button>
          </div>
        </div>,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default ChildData;
