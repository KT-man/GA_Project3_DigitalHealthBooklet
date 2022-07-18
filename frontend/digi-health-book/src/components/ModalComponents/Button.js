import React from 'react';
import styles from "./Button.module.css";


const Button = (props) => {
    return (
        <button
        className = {`btn ${styles.button} ${props.className}`}
        type = {props.type || "button"} 
        onClick = {props.onClick}>
            {props.children}</button> //=> pass anything within the tag
            

    );
};

export default Button;