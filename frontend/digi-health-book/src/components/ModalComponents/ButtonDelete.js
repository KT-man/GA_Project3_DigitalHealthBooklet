<<<<<<< Updated upstream
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
=======
import React from "react";
// import styles from "./Button.module.css";

const ButtonDelete = (props) => {
  const deleteLog = async (req, res) => {
    //if not empty, find by id, $pull from array (BE)
    //alt method. Find by index // research how to change mongo db
    const url = "/users/deleteLog";
    const res = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    props.childData.findByIndex()
    });
  };
  return (
    <button
      class="px-5 py-1 text-md text-white font-semibold rounded-full border border-white/50 hover:text-white hover:bg-plumish hover:border-transparent focus:outline-none focus:ring-2 focus:ring-plumish focus:ring-offset-2"
      className={`btn ${styles.button} ${props.className}`}
      type={props.type || "button"}
      onClick={deleteLog}
    ></button> //=> pass anything within the tag
  );
};

export default ButtonDelete;
>>>>>>> Stashed changes
