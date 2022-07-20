import React, { useState, useEffect, useRef } from "react";
import AddChild from "./ModalComponents/AddChild";

import ChildRow from "./ChildRow";

const WelcomePage = (props) => {
  const [childData, setChildData] = useState([]);
  const childDataRef = useRef([]);
  const [error, setError] = useState(null);

  const [showAddChildModal, setShowAddChildModal] = useState(false);
  const toSetShowAddChildModal = () => {
    setShowAddChildModal(!showAddChildModal);
  };
  const [deleteCounter, setDeleteCounter] = useState(0);
  const toSetDeleteCounter = () => {
    setDeleteCounter(deleteCounter + 1);
  };

  const fetchChildData = async (url, config) => {
    try {
      const url = `/users/children`; //=> to doublecheck
      const config = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await fetch(url, config);
      const data = await res.json();

      if (res.status !== 200 && data.message === "no children found!") {
        throw new Error("Couldnt fetch child data");
      }

      setChildData(data[0].children);
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchChildData();
    childDataRef.current = childData;
  }, [childDataRef, showAddChildModal, deleteCounter]);

  return (
    <>
      <div>
        <header class="bg-aquamarine">
          <h1>Welcome to your Digital Child Booklet</h1>
        </header>
        <div class="my-8">
          <button
            onClick={toSetShowAddChildModal}
            class="px-5 py-1 text-md text-white bg-plumish font-semibold rounded-full border border-plumish/40 hover:text-white hover:bg-white hover:border-transparent focus:outline-none focus:ring-2 focus:ring-plumish focus:ring-offset-2"
          >
            Add Child
          </button>
          <a
            href="/login"
            class="px-5 py-1 text-md text-white bg-plumish font-semibold rounded-full border border-plumish/40 hover:text-white hover:bg-white hover:border-transparent focus:outline-none focus:ring-2 focus:ring-plumish focus:ring-offset-2"
          >
            Back to Login
          </a>
        </div>
        <br />
        {childData.map((d, i) => {
          return (
            <ChildRow
              index={i}
              key={d._id}
              childData={d}
              toSetDeleteCounter={toSetDeleteCounter}
              fetchChildData={fetchChildData}
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
