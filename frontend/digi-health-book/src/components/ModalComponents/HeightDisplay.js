import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import styles from "./modal.module.css";
import ReactDOM from "react-dom";
import Button from "./Button";

function HeightDisplay(props) {
  const barColors = [
    "#2A9ED6",
    "#EF3935",
    "#20A67A",
    "#EFA92E",
    "purple",
    "#EF3935",
  ];
  const hideModal = () => {
    props.toSetShowHeightModal(!props.showAddHeightModal);
  };
  const xValues = props.childData.logs.map((data) => {
    return data.date.split("T")[0];
  });

  const yValues = props.childData.logs.map((data) => {
    return data.height;
  });

  return (
    <>
      {ReactDOM.createPortal(
        <div className={styles.backdrop}>
          <div className={`${styles.board} ${styles.modal}`}>
            <div className=" pageframe chart" id="bar">
              <Line
                className={styles.chart}
                data={{
                  labels: xValues,
                  datasets: [
                    { label: "height", borderColor: "black", data: yValues },
                  ],
                }}
                options={{ legend: { display: "Height" } }}
              />
            </div>

            <Button onClick={hideModal}>Close X</Button>
          </div>
        </div>,
        document.querySelector("#modal-root")
      )}
    </>
  );
}

export default HeightDisplay;
