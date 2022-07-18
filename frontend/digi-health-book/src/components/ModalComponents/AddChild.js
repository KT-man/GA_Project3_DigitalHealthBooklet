import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import Button from "./Button";

const AddChild = (props) => {
  const [editChild, setEditChild] = useState({
    name: "",
    isMale: "",
    DOB: "",
    _id: null,
  });
  const [nameInput, setNameInput] = useState("");
  const [isMaleInput, setIsMaleInput] = useState("");
  const [DOBInput, setDOBInput] = useState("");

  const handleNameChange = (e) => {
    setNameInput(e.target.value);
  };

  const handleIsMaleChange = (e) => {
    setIsMaleInput(e.target.value);
  };
  const handleDOBChange = (e) => {
    setDOBInput(e.target.value);
  };

  useEffect(() => {
    setNameInput(editChild.name);
    setIsMaleInput(editChild.isMale);
    setDOBInput(editChild.DOB);
  }, [editChild]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: nameInput,
      isMale: isMaleInput,
      DOB: DOBInput,
    };

    const url = "/users/addChild";
    const res = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    });
    const addChildData = await res.json();

    if (addChildData.status === "error") {
      alert(`Please input the child data correctly`);
    }
    // input body into the api here

    props.okayClicked();
  };

  return (
    <>
      {ReactDOM.createPortal(


        <div className={styles.backdrop}>
          <div className={`${styles.board} ${styles.modal}`}>
            <h3 className={styles.header}>Input Your Childs Data here!</h3>
            <form>
              <div>
                <label>Name of Child:</label>
                <input
                className = {`${styles.input}`}
                  type="text"
                  placeholder="Enter your Child's name"
                  value={nameInput}
                  onChange={handleNameChange}
                />
              </div>
              <div>
                <label>Gender:</label>
                <input 
                className = {`${styles.input}`}
                  type="text"
                  placeholder="Enter your Child's gender"
                  value={isMaleInput}
                  onChange={handleIsMaleChange}
                />
              </div>
              <div>
                <label>Date of Birth:</label>
                <input
                className = {`${styles.input}`}
                  type="text"
                  placeholder="Enter your Child's Date of Birth"
                  value={DOBInput}
                  onChange={handleDOBChange}
                />
              </div>
              <Button type="submit" onClick={handleSubmit}>
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
