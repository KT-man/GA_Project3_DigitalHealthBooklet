import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import Button from "./Button";

const AddChild = (props) => {
  const nameRef = useRef();
  const DOBRef = useRef();
  const [isMale, setIsMale] = useState(true);

  function onChangeValue(e) {
    setIsMale(e.target.value);
    console.log(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: nameRef.current.value,
      isMale: isMale,
      DOB: DOBRef.current.value,
    };

    const url = "/users/addChild";
    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    });
    const addChildData = await res.json();
    console.log(addChildData);

    if (addChildData.status === "error") {
      alert(`${addChildData.message}`);
    } else if (addChildData.status === "ok") {
      console.log(`${addChildData.message}`);
    }
  };

  return (
    <>
      {ReactDOM.createPortal(
        <div className={styles.backdrop}>
          <div className={`${styles.board} ${styles.modal}`}>
            <h3 className={styles.header}>Input Your Childs Data here!</h3>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Name of Child:</label>
                <input
                  className={`${styles.input}`}
                  type="text"
                  name="name"
                  placeholder="Enter your Child's name"
                  ref={nameRef}
                />
              </div>
              <div onChange={onChangeValue}>
                <label>Gender:</label>
                <input type="radio" name="isMale" value={true} />
                <label for="radio-one">Male</label>
                <input type="radio" name="isMale" value={false} />
                <label for="radio-two">Female</label>
              </div>
              <div>
                <label>Date of Birth:</label>
                <input
                  className={`${styles.input}`}
                  type="date"
                  name="DOB"
                  placeholder="Enter your Child's Date of Birth"
                  ref={DOBRef}
                />
              </div>
              <Button type="submit" onClick={() => props.okayClicked()}>
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
