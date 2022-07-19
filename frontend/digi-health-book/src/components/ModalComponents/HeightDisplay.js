import React, { useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import styles from "./modal.module.css";
import ReactDOM from "react-dom";
import Button from "./Button";

function HeightDisplay(props) {
  // const [color, setColor] = useState("2a9ed6");
  const barColors = [
    "#2A9ED6",
    "#EF3935",
    "#20A67A",
    "#EFA92E",
    "purple",
    "#EF3935",
  ];
  const xValues = props.childData.logs.map((data) => {
    return data.date.split("T")[0];
  });
  // console.log(props.data);
  // const accScoreCheck = (data) => {
  //   if (data.fields.accScore.stringValue >= "90") {
  //     // setColor("#EF3935");
  //     console.log("over 90");
  //   } else if (data.fields.accScore.stringValue >= "80") {
  //     // setColor("#20A67A");
  //     console.log("below 80");
  //   } else {
  //     // setColor("#20A67A");
  //     console.log("less than 80"
  //   }
  // };

  const yValues = props.childData.logs.map((data) => {
    return data.height;
  });

  return (
    <>
      {ReactDOM.createPortal(
        <div className={styles.backdrop}>
          <div className={`${styles.board} ${styles.modal}`}>
            <div
              className=" pageframe chart"
              id="bar"
              
            >
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
            <Button onClick={props.toSetShowHeightModal}>Close</Button>
          </div>
        </div>,
        document.querySelector("#modal-root")
      )}
    </>
  );
}

export default HeightDisplay;
