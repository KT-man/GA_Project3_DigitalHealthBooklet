import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import Button from "./Button";

const ChildData = (props) => {
  console.log(props);
  // let childDetails = props.childData.map((d, i) => {
  //   let gender = "";
  //   if (d.isMale) {
  //     gender = "Male";
  //   } else {
  //     gender = "Female";
  //   }

  //   return (
  //     <>
  //       <h1> Your Child's Data</h1>
  //       <h2 key={i + 1}>{d.name} </h2>
  //       <li>
  //         <ul>Gender : {gender}</ul>
  //         <ul>Date of Birth : {d.DOB}</ul>
  //       </li>
  //     </>
  //   );
  // });

  // let childGrowth = props.childGrowth.map((d, i) => {
  //   return (
  //     <>
  //       <li>{d.date}</li>
  //       <li>{d.height}</li>
  //       <li>{d.weight}</li>
  //       <li>{d.headCirc}</li>
  //     </>
  //   );
  // });

  // let childAppt = props.childAppt.map((d, i) => {
  //   return (
  //     <>
  //       <li>{d.date}</li>
  //       <li>{d.location}</li>
  //       <li>{d.doctorName}</li>
  //       <li>{d.futureAppt}</li>
  //       <li>{d.reason}</li>
  //     </>
  //   );
  // });

  return (
    <>
      {ReactDOM.createPortal(
        <div className={styles.backdrop}>
          <div className={`${styles.board} ${styles.modal}`}>
            <h3 className={styles.header}>
              {props.childData[0].name}'s Details
            </h3>
            <form>
              <div>
                <label>Date</label>
                <input
                  className={`${styles.input}`}
                  type="date"
                  placeholder="Enter date of appointment"
                />
              </div>
              <div>
                <label>Location of Appointment</label>
                <input
                  className={`${styles.input}`}
                  type="text"
                  placeholder="Enter location of appointment"
                />
              </div>
              <div>
                <label>Doctor</label>
                <input
                  className={`${styles.input}`}
                  type="text"
                  placeholder="Enter Doctor's Name"
                />
              </div>
              <div>
                <label>Future Appointment</label>
                <input type="radio" name="futureAppt" value={true} />
                <label for="radio-one">Yes</label>
                <input type="radio" name="futureAppt" value={false} />
                <label for="radio-two">No</label>
              </div>
              <div>
                <label>Reason of Appointment</label>
                <input
                  className={`${styles.input}`}
                  type="text"
                  placeholder="Reason for Visit"
                />
              </div>
              <Button type="submit">Submit</Button>
            </form>
            ,
          </div>
        </div>,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default ChildData;
