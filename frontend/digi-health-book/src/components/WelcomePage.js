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

      <button
        onClick={toSetShowAddChildModal}
        class="my-8 px-5 py-1 text-md text-white bg-plumish font-semibold rounded-full border border-plumish/40 hover:text-white hover:bg-white hover:border-transparent focus:outline-none focus:ring-2 focus:ring-plumish focus:ring-offset-2"
      >
        Add Child
      </button>
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
