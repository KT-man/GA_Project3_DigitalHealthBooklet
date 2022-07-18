import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import Button from "./Button";

const ChildData = (props) => {
  const [showChildDataModal, setShowChildDataModal] = useState(false);
  const toSetShowChildDataModal = () => {
    setShowChildDataModal(!showChildDataModal);
  };

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
            <h3 className={styles.header}>{props.childData.name}'s Details</h3>
            <div>Gender: {props.childData.isMale ? "Male" : "Female"}</div>
            <div>
              {props.childData.name}'s Birthday:{" "}
              {props.childData.DOB.split("T")[0]}
            </div>
            <div>Upcoming Appointments: </div>
            <div>Growth Logs:</div>
            <Button type="submit">Submit</Button>,
          </div>
        </div>,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default ChildData;
