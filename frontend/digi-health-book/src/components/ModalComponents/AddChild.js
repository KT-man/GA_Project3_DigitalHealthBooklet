import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import Button from "./Button";

const AddChild = (props) => {
  const nameRef = useRef();
  const isMaleRef = useRef();
  const DOBRef = useRef();



  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: nameRef.current.value,
      isMale: isMaleRef.current.value,
      DOB: DOBRef.current.value,
    };

    const url = "/addChild";
    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    });
    const addChildData = await res.json();

    if (addChildData.status === "error") {
      alert(`Please input the child data correctly`);
    }
    // input body into the api here

    
  };

  return (
    <>
      {ReactDOM.createPortal(
        <div className={styles.backdrop}>
          <div className={`${styles.board} ${styles.modal}`}>
            <h3 className={styles.header}>Input Your Childs Data here!</h3>
            <form onClick={handleSubmit}>
              <div>
                <label>Name of Child:</label>
                <input
                className = {`${styles.input}`}
                  type="text"
                  name="name"
                  placeholder="Enter your Child's name"
                  ref={nameRef}
                />
              </div>
              <div>
                <label>Gender:</label>
                <input 
                className = {`${styles.input}`}
                  type="text"
                  name="gender"
                  placeholder="Enter your Child's gender"
                  ref={isMaleRef}
                />
              </div>
              <div>
                <label>Date of Birth:</label>
                <input
                className = {`${styles.input}`}
                  type="text"
                  name="DOB"
                  placeholder="Enter your Child's Date of Birth"
                  ref={DOBRef}
                />
              </div>
              <Button type="submit">
                Submit
              </Button>
            </form>
          </div>
        </div>,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default AddChild;
