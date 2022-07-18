import { React, useState } from "react";
import Log from "./ModalComponents/Log";
import ChildData from "./ModalComponents/ChildData";

const ChildRow = (props) => {
  const [showChildDataModal, setShowChildDataModal] = useState(false);
  const toSetShowChildDataModal = () => {
    setShowChildDataModal(!showChildDataModal);
  };

  return (
    <div>
      <h1> Child {props.index + 1}</h1>
      <h2 onClick={toSetShowChildDataModal}>{props.childData.name} </h2>
      <div>
        <button onClick={props.toSetShowLogModal}>Add New Log</button>
      </div>
      <div>
        <button onClick={props.toSetShowApptModal}>Add New Appoinment</button>
      </div>

      {showChildDataModal && (
        <ChildData
          childData={props.childData}
          toSetShowChildDataModal={toSetShowChildDataModal}
          okayClicked={toSetShowChildDataModal}
        ></ChildData>
      )}
    </div>
  );
};

export default ChildRow;
