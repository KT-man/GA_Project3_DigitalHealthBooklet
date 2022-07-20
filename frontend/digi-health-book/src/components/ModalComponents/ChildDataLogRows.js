import React, { useState } from "react";
import EditLog from "./EditLog";
import ButtonE from "./ButtonE";
import ButtonDelete from "./ButtonDelete";

const ChildDataLogRows = (props) => {
  const [showEditLogModal, setShowEditLogModal] = useState(false);
  const toSetShowEditLogModal = () => {
    setShowEditLogModal(!showEditLogModal);
  };
  return (
    <>
      <tr>
        <td>{props.date.split("T")[0]}</td>
        <td>{props.height}</td>
        <td>{props.weight}</td>
        <td>{props.headCirc}</td>
        <td>
          <ButtonDelete
            id={props.id}
            toSetDeleteCounter={props.toSetDeleteCounter}
          >
            Delete
          </ButtonDelete>
          <ButtonE
            toSetShowEditLogModal={toSetShowEditLogModal}
            showEditLogModal={showEditLogModal}
            type="log"
          >
            Edit
          </ButtonE>
        </td>
      </tr>
      {showEditLogModal && (
        <EditLog
          id={props.id}
          toSetShowEditLogModal={toSetShowEditLogModal}
          showEditLogModal={showEditLogModal}
          fetchChildData={props.fetchChildData}
        ></EditLog>
      )}
    </>
  );
};

export default ChildDataLogRows;
