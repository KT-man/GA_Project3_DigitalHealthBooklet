import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Overlay from "react-bootstrap/Overlay";

const AddChild = () => {
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


  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: nameInput,
      isMale: isMaleInput,
      DOB: DOBInput,
    };

    const url = '/users/addChild';
    const res = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
      headers : { "content-type": "application/json" },
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
        <Overlay>
            <form onSubmit={handleSubmit}>
              <div class = "block">
                <label>Name of Child</label>
                <input
                  type="text"
                  placeholder="Enter your Child's name"
                  value={nameInput}
                  onChange={handleNameChange}
                />
              </div>
              <div class = "block">
                <label>Gender</label>
                <input
                  type="text"
                  placeholder="Enter your Child's gender"
                  value={isMaleInput}
                  onChange={handleIsMaleChange}
                />
              </div>
              <div class = "block">
                <label>Date of Birth</label>
                <input
                  type="text"
                  placeholder="Enter your Child's Date of Birth"
                  value={DOBInput}
                  onChange={handleDOBChange}
                />
              </div>
              <button type="submit" onClick={handleSubmit}>
                Submit
              </button>
            </form>
        </Overlay>,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default AddChild;
