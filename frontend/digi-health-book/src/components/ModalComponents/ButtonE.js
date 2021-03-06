import React from "react";
// import styles from "./Button.module.css";

import EditLog from "./EditLog";

const ButtonE = (props) => {
  return (
    <>
      <button
        class="px-4 py-1 mxtext-md text-white font-semibold rounded-full border border-white/50 hover:text-white hover:bg-plumish/60 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-plumish focus:ring-offset-2"
        // className={`btn ${styles.button} ${props.className}`}
        type="button"
        onClick={
          props.type === "appt"
            ? props.toSetShowEditApptModal
            : props.toSetShowEditLogModal
        }
      >
        Edit
      </button>
    </>
  );
};

export default ButtonE;
