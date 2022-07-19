import { React, useState } from "react";
import Appointment from "./ModalComponents/Appointment";
import Log from "./ModalComponents/Log";
import ChildData from "./ModalComponents/ChildData";

const ChildRow = (props) => {
  const [showChildDataModal, setShowChildDataModal] = useState(false);
  const toSetShowChildDataModal = () => {
    setShowChildDataModal(!showChildDataModal);
  };
  const [showLogModal, setShowLogModal] = useState(false);
  const toSetShowLogModal = () => {
    console.log(`button is clickced`);
    setShowLogModal(!showLogModal);
  };
  const [showApptModal, setShowApptModal] = useState(false);
  const toSetShowApptModal = () => {
    setShowApptModal(!showApptModal);
  };

  return (
    <div>
      <h1> Child {props.index + 1}</h1>
      <h2 onClick={toSetShowChildDataModal}>{props.childData.name} </h2>
      <div>
        <button onClick={toSetShowLogModal}>Add New Log</button>
      </div>
      <div>
        <button onClick={toSetShowApptModal}>Add New Appoinment</button>
      </div>

      {showChildDataModal && (
        <ChildData
          childData={props.childData}
          toSetShowChildDataModal={toSetShowChildDataModal}
          okayClicked={toSetShowChildDataModal}
        ></ChildData>
      )}

      {showLogModal && (
        <Log
          childData={props.childData}
          showLogModal={showLogModal}
          toSetShowLogModal={toSetShowLogModal}
          okayClicked={toSetShowLogModal}
        ></Log>
      )}
      {showApptModal && (
        <Appointment
          childData={props.childData}
          toSetShowApptModal={toSetShowApptModal}
          okayClicked={toSetShowApptModal}
        ></Appointment>
      )}
    </div>
  );
};

export default ChildRow;
