import React from "react";
import Log from "./ModalComponents/Log";

const ChildRow = (props) => {
  return (
    <div>
      <h1> Child {props.index + 1}</h1>
      <h2 onClick={props.toSetShowChildDataModal}>{props.childData.name} </h2>
      <button onClick={props.toSetShowLogModal}>Add New Log</button>
      <button onClick={props.toSetShowApptModal}>Add New Appoinment</button>
    </div>
  );
};

export default ChildRow;
