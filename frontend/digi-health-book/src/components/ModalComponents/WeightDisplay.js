import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import styles from "./modal.module.css";
import ReactDOM from "react-dom";
import Button from "./Button";

function WeightDisplay(props) {

  const hideModal = () => {
    props.toSetShowWeightModal(!props.showAddWeightModal);
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "maroon",
          font: {
            family: "Montserrat", // Add your font here to change the font of your legend label
            size: 20,
          },
        },
        tooltip: {
          bodyFont: {
            family: "Montserrat", // Add your font here to change the font of your tooltip body
          },
          titleFont: {
            family: "Montserrat", // Add your font here to change the font of your tooltip title
          },
        },
      },
    },
    scales: {
      yAxes: {
        grid: {
          display: false,
          color: "black",
        },
        ticks: {
          color: "black",
          font: {
            family: "Montserrat", // Add your font here to change the font of your y axis
            size: 16,
          },
        },
      },
      xAxes: {
        ticks: {
          padding: 0,
          color: "black",
          font: {
            family: "Montserrat", // Add your font here to change the font of your x axis
            size: 16,
          },
        },
      },
    },
  };

  const xValues = props.childData.logs.map((data) => {
    return data.date.split("T")[0];
  });

  const yValues = props.childData.logs.map((data) => {
    return data.weight;
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
                    {
                      label: "Weight",
                      borderColor: "maroon",
                      data: yValues,
                    },
                  ],
                }}
                options={options}
              />
            </div>
            <Button onClick={hideModal}>Close</Button>
          </div>
        </div>,
        document.querySelector("#modal-root")
      )}
    </>
  );
}

export default WeightDisplay;
