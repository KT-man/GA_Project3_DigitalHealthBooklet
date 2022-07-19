import React from "react";
import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      class="px-5 py-1 text-md text-white font-semibold rounded-full border border-white/50 hover:text-white hover:bg-plumish hover:border-transparent focus:outline-none focus:ring-2 focus:ring-plumish focus:ring-offset-2"
      className={`btn ${styles.button} ${props.className}`}
      type={props.type || "button"}
      onClick={props.onClick}
    >
      {props.children}
    </button> //=> pass anything within the tag
  );
};

export default Button;
