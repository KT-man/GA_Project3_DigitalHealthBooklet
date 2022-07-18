import React, { useState } from "react";
import Appointment from "./ModalComponents/Appointment";
import Log from "./ModalComponents/Log";
import AddChild from "./ModalComponents/AddChild";
import ChildData from "./ModalComponents/ChildData";
import ChildRow from "./ChildRow";

const WelcomePage = (props) => {
  const [showLogModal, setShowLogModal] = useState(false);
  const toSetShowLogModal = () => {
    console.log(`button is clickced`);
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

  // const [showChildDataModal, setShowChildDataModal] = useState(false);
  // const toSetShowChildDataModal = () => {
  //   setShowChildDataModal(!showChildDataModal);
  // };

  return (
    <div>
      <header class="bg-aquamarine"></header>
      <h1>Welcome to your Digital Child Booklet</h1>
      {/* //route to add child */}
      <button onClick={toSetShowAddChildModal}>Add Child</button>
      <br />
      {props.childData.map((d, i) => {
        return (
          <ChildRow
            index={i}
            key={d._id}
            childData={d}
            // toSetShowChildDataModal={toSetShowChildDataModal}
            toSetShowLogModal={toSetShowLogModal}
            toSetShowApptModal={toSetShowApptModal}
          ></ChildRow>
        );
      })}

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
      {/* {showChildDataModal && (
        <ChildData
          childData={props.childData}
          toSetShowChildDataModal={toSetShowChildDataModal}
          okayClicked={toSetShowChildDataModal}
        ></ChildData>
      )} */}
    </div>
  );
};

export default WelcomePage;
