import React, { useState } from "react";
import Appointment from "./ModalComponents/Appointment";
import Log from "./ModalComponents/Log";
import AddChild from "./ModalComponents/AddChild";
import ChildData from "./ModalComponents/ChildData";

const WelcomePage = (props) => {
  const [showLogModal, setShowLogModal] = useState(false);
  const toSetShowLogModal = () => {
    setShowLogModal(!showLogModal);
  };

  const [showApptModal, setShowApptModal] = useState(false);
  const toSetShowApptModal = () => {
    setShowApptModal(!showApptModal);
  };

  const [showAddChildModal, setShowAddChildModal] = useState(false);
  const toSetShowAddChildModal = () => {
    console.log(`button is clickced`);
    setShowAddChildModal(!showAddChildModal);
  };

  const [showChildDataModal, setShowChildDataModal] = useState(false);
  const toSetShowChildDataModal = () => {
    setShowChildDataModal(!showChildDataModal);
  };

  let childData = props.childData.map((d, i) => {
    return (
      <div onClick={toSetShowChildDataModal}>
        <h1> Child {i}</h1>
        <h2 key={i}>{d.name} </h2>
        <button onClick={toSetShowLogModal}>Add New Log</button>
        <button onClick={toSetShowApptModal}>Add New Appoinment</button>
      </div>
    );
  });

  return (
    <div>
      <header class="bg-aquamarine"></header>
      <h1>Welcome to your Digital Child Booklet</h1>
      {/* //route to add child */}
      <button onClick={toSetShowAddChildModal}>Add Child</button>
      <br />
      {childData}

      {showLogModal && (
        <Log
          toSetShowLogModal={toSetShowLogModal}
          okayClicked={toSetShowLogModal}
        ></Log>
      )}
      {showApptModal && (
        <Appointment
          toSetShowApptModal={toSetShowApptModal}
          okayClicked={toSetShowApptModal}
        ></Appointment>
      )}
      {showAddChildModal && (
        <AddChild
          toSetShowAddChildModal={toSetShowAddChildModal}
          okayClicked={toSetShowAddChildModal}
        ></AddChild>
      )}
      {showChildDataModal && (
        <ChildData
          toSetShowChildDataModal={toSetShowChildDataModal}
          okayClicked={toSetShowChildDataModal}
        ></ChildData>
      )}
    </div>
  );
};

export default WelcomePage;
