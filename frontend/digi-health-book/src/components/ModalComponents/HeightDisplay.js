import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import styles from "./modal.module.css";
import ReactDOM from "react-dom";
import Button from "./Button";

function HeightDisplay(props) {
  const hideModal = () => {
    props.toSetShowHeightModal(!props.showAddHeightModal);
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "rgb(0,0,0)",
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
                    {
                      label: "Height",
                      color: "rgb(0,0,0)",
                      borderColor: "black",
                      data: yValues,
                    },
                  ],
                }}
                options={options}
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
