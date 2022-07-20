import React, { useState, useEffect, useRef } from "react";

import AddChild from "./ModalComponents/AddChild";

import ChildRow from "./ChildRow";

const WelcomePage = (props) => {
  const [childData, setChildData] = useState([]);
  const childDataRef = useRef([]);
  const [error, setError] = useState(null);

  const [showAddChildModal, setShowAddChildModal] = useState(false);
  const toSetShowAddChildModal = () => {
    console.log(`button is clickced`);
    setShowAddChildModal(!showAddChildModal);
  };

  const [deleteCounter, setDeleteCounter] = useState(0);
  const toSetDeleteCounter = () => {
    setDeleteCounter(deleteCounter + 1);
  };

  // showeditmodalstate

  const fetchChildData = async (url, config) => {
    try {
      console.log("running fetchChildData");
      const res = await fetch(url, config);
      const data = await res.json();

      if (res.status !== 200 && data.message === "no children found!") {
        throw new Error("Couldnt fetch child data");
      }
      console.log(data);
      setChildData(data[0].children);
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  };

  useEffect(() => {
    //=> to doublecheck on url
    const url = `/users/children`; //=> to doublecheck
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetchChildData(url, config);
    childDataRef.current = childData;
  }, [childDataRef, showAddChildModal, deleteCounter]);

  return (
    <>
      <div>
        <header class="bg-aquamarine"></header>
        <h1>Welcome to your Digital Child Booklet</h1>
        <div class="my-8">
          <button
            onClick={toSetShowAddChildModal}
            class="px-5 py-1 text-md text-white bg-plumish font-semibold rounded-full border border-plumish/40 hover:text-white hover:bg-white hover:border-transparent focus:outline-none focus:ring-2 focus:ring-plumish focus:ring-offset-2"
          >
            Add Child
          </button>
        </div>
        <br />
        {childData.map((d, i) => {
          return (
            <ChildRow
              index={i}
              key={d._id}
              childData={d}
              toSetDeleteCounter={toSetDeleteCounter}
            ></ChildRow>
          );
        })}

        {showAddChildModal && (
          <AddChild toSetShowAddChildModal={toSetShowAddChildModal}></AddChild>
        )}
      </div>
    </>
  );
};

export default WelcomePage;
