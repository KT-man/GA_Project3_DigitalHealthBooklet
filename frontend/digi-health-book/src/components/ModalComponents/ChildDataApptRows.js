import React, { useState } from "react";

import ButtonE from "./ButtonE";
import ButtonDelete from "./ButtonDelete";
import EditAppt from "./EditAppt";
const ChildDataApptRows = (props) => {
  console.log(props);
  const [showEditApptModal, setShowEditApptModal] = useState(false);
  const toSetShowEditApptModal = () => {
    setShowEditApptModal(!showEditApptModal);
  };
  return (
    <>
      <tr>
        <td>{props.date.split("T")[0]}</td>
        <td>{props.location}</td>
        <td>{props.reason}</td>
        <td>
          <ButtonDelete
            id={props.id}
            toSetDeleteCounter={props.toSetDeleteCounter}
          >
            Delete
          </ButtonDelete>
          <ButtonE
            toSetShowEditApptModal={toSetShowEditApptModal}
            showEditApptModal={showEditApptModal}
            type="appt"
          >
            Edit
          </ButtonE>
        </td>
      </tr>
      {showEditApptModal && (
        <EditAppt
          id={props.id}
          toSetShowEditApptModal={toSetShowEditApptModal}
          showEditApptModal={showEditApptModal}
        ></EditAppt>
      )}
    </>
  );
};

export default ChildDataApptRows;
