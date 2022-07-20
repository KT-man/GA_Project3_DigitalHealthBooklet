import React, { useState, useRef, useEffect, Children } from "react";
import styles from "./Button.module.css";
import EditLog from "./EditLog";

const ButtonDelete = (props) => {
  console.log(props);
  //set state [isDeleted, setIsDeleted]= useState(false); //

  const handleSubmitDelete = async (e) => {
    const url = "/users/deleteLog";
    const res = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify({ childLogId: props.id }),
      headers: { "content-type": "application/json" },
    });

    const deleteLogData = await res.json();

    if (deleteLogData.status === "error") {
      console.log(deleteLogData);
      return alert(`LogData not found`);
    }

    props.toSetDeleteCounter();
    console.log(`${props.deleteCounter} logs deleted`);
  };

  const handleSubmitDeleteAppt = async (e) => {
    const url = "/users/deleteAppt";
    const res = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify({ childApptId: props.id }),
      headers: { "content-type": "application/json" },
    });

    const deleteApptData = await res.json();

    if (deleteApptData.status === "error") {
      console.log(deleteApptData);
      return alert(`LogData not found`);
    }

    props.toSetDeleteCounter();
    console.log(`${props.deleteCounter} appt deleted`);
  };

  return (
    <>
      <button
        class="px-5 py-1 text-md text-white font-semibold rounded-full border border-white/50 hover:text-white hover:bg-plumish hover:border-transparent focus:outline-none focus:ring-2 focus:ring-plumish focus:ring-offset-2"
        className={`btn ${styles.button} ${props.className}`}
        type={props.type || "button"}
        onClick={
          props.type === "appt" ? handleSubmitDeleteAppt : handleSubmitDelete
        }
      >
        Delete
      </button>
    </>
  );
};

export default ButtonDelete;
