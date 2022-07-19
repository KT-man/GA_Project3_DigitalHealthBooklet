import React, { useState, useRef, useEffect } from "react";
import styles from "./Button.module.css";
import EditLog from "./EditLog";

const ButtonE = (props) => {
  return (
    <>
      <button
        class="px-5 py-1 text-md text-white font-semibold rounded-full border border-white/50 hover:text-white hover:bg-plumish hover:border-transparent focus:outline-none focus:ring-2 focus:ring-plumish focus:ring-offset-2"
        className={`btn ${styles.button} ${props.className}`}
        type={props.type || "button"}
        onClick={props.toSetShowEditLogModal}
      >
        Edit
      </button>
      {props.showEditLogModal && (
        <EditLog
          id={props.id}
          toSetShowEditLogModal={props.toSetShowEditLogModal}
        ></EditLog>
      )}
    </>
  );
};

export default ButtonE;
