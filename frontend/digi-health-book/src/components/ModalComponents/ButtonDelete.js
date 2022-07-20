import React, { useState, useRef, useEffect, Children } from "react";
import styles from "./Button.module.css";
import EditLog from "./EditLog";

const ButtonDelete = (props) => {
  const apptId = { childApptId: props.id };
  const logId = { childLogId: props.id };

  const apptPath = "/users/deleteAppt";
  const logPath = "/users/deleteLog";

  const handleSubmitDelete = async (path, id) => {
    const url = path;
    const res = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify(id),
      headers: { "content-type": "application/json" },
    });

    console.log(path);
    console.log(id);
    console.log("clicked");
    const deleteData = await res.json();

    if (deleteData.status === "error") {
      console.log(`this is the ${deleteData}`);
      return alert(`deleteData not found`);
    }
    console.log(`${props.deleteCounter} ${props.type} deleted`);

    props.toSetDeleteCounter();
    console.log(props.type);
  };

  return (
    <>
      <button
        class="px-8 py-1 text-md text-white font-semibold rounded-full border border-white/50 hover:text-white hover:bg-plumish hover:border-transparent focus:outline-none focus:ring-2 focus:ring-plumish focus:ring-offset-2"
        className={`btn ${styles.button} ${props.className}`}
        type="button"
        // onClick={handleSubmitDeleteAppt}
        onClick={(e) => {
          props.type === "appt"
            ? handleSubmitDelete(apptPath, apptId)
            : handleSubmitDelete(logPath, logId);
        }}
        // }console.log("appt") : console.log("log")
      >
        Delete
      </button>
    </>
  );
};

export default ButtonDelete;
