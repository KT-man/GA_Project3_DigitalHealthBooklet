import React, { useState } from "react";
import Appointment from "./ModalComponents/Appointment";
import Log from "./ModalComponents/Log";
import AddChild from "./ModalComponents/AddChild";
import ChildData from "./ModalComponents/ChildData";
import ChildRow from "./ChildRow";

const WelcomePage = (props) => {
  const [showAddChildModal, setShowAddChildModal] = useState(false);
  const toSetShowAddChildModal = () => {
    console.log(`button is clickced`);
    setShowAddChildModal(!showAddChildModal);
  };

  return (
    <div>
      <header class="bg-aquamarine"></header>
      <h1>Welcome to your Digital Child Booklet</h1>
      {/* //route to add child */}
      <button onClick={toSetShowAddChildModal}>Add Child</button>
      <br />
      {props.childData.map((d, i) => {
        return <ChildRow index={i} key={d._id} childData={d}></ChildRow>;
      })}

      {showAddChildModal && (
        <AddChild
          toSetShowAddChildModal={toSetShowAddChildModal}
          okayClicked={toSetShowAddChildModal}
        ></AddChild>
      )}
    </div>
  );
};

export default WelcomePage;
