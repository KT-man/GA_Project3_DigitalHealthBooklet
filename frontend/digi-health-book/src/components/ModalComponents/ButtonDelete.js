import React, { useState, useRef, useEffect, Children } from "react";
import styles from "./Button.module.css";
import EditLog from "./EditLog";

const ButtonE = (props) => {
  //set state [isDeleted, setIsDeleted]= useState(false);

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

  return (
    <>
      <button
        class="px-5 py-1 text-md text-white font-semibold rounded-full border border-white/50 hover:text-white hover:bg-plumish hover:border-transparent focus:outline-none focus:ring-2 focus:ring-plumish focus:ring-offset-2"
        className={`btn ${styles.button} ${props.className}`}
        type={props.type || "button"}
        onClick={handleSubmitDelete}
      >
        Delete
      </button>
    </>
  );
};

export default ButtonE;
