import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import Button from "./Button";
import HeightDisplay from "./HeightDisplay";
import WeightDisplay from "./WeightDisplay";
import HeadCircDisplay from "./HeadCircDisplay";
import EditLog from "./EditLog";
import ButtonE from "./ButtonE";

const ChildData = (props) => {
  const [showHeightModal, setShowHeightModal] = useState(false);
  const toSetShowHeightModal = () => {
    setShowHeightModal(!showHeightModal);
  };

  const [showWeightModal, setShowWeightModal] = useState(false);
  const toSetShowWeightModal = () => {
    setShowWeightModal(!showWeightModal);
  };

  const [showHeadCircModal, setShowHeadCircModal] = useState(false);
  const toSetShowHeadCircModal = () => {
    setShowHeadCircModal(!showHeadCircModal);
  };

  return (
    <>
      {ReactDOM.createPortal(
        <div className={styles.backdrop}>
          <div className={`${styles.board} ${styles.modal}`}>
            <h3 className={styles.header}>{props.childData.name}'s Details</h3>
            <div>Gender: {props.childData.isMale ? "Male" : "Female"}</div>
            <div>
              {props.childData.name}'s Birthday:{" "}
              {props.childData.DOB.split("T")[0]}
            </div>
            <br></br>
            <hr></hr>
            <br></br>
            <div>
              Upcoming Appointments:
              {props.childData.appointments.length === 0 ? (
                "Please add an appointment first!"
              ) : (
                <table>
                  <thead>
                    <tr>
                      <td>Date</td>
                      <td>Location</td>
                      <td>Reason</td>
                    </tr>
                  </thead>
                  <tbody>
                    {props.childData.appointments.map((appt) => {
                      return (
                        <tr key={appt._id}>
                          <td>{appt.date.split("T")[0]}</td>
                          <td>{appt.location}</td>
                          <td>{appt.reason}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
            <br></br>
            <hr></hr>
            {/* Stretch goals afterwards to make the appointments / logs show most recent 5, then to scroll next page */}
            <br></br>
            <div>
              Growth Logs:
              {props.childData.logs.length === 0 ? (
                "Please add a log first!"
              ) : (
                <table>
                  <thead>
                    <tr>
                      <td>Date</td>
                      <td>Height</td>
                      <td>Weight</td>
                      <td>Head Circumference</td>
                    </tr>
                  </thead>
                  <tbody>
                    {props.childData.logs.map((log) => {
                      return (
                        <tr key={log._id}>
                          <td>{log.date.split("T")[0]}</td>
                          <td>{log.height}</td>
                          <td>{log.weight}</td>
                          <td>{log.headCirc}</td>
                          <td>
                            <button>Delete</button>
                          </td>
                          <td>
                            <ButtonE
                              toSetShowEditLogModal={
                                props.toSetShowEditLogModal
                              }
                              showEditLogModal={props.showEditLogModal}
                              id={log._id}
                            >
                              Edit
                            </ButtonE>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
              <button
                onClick={toSetShowHeightModal}
                class="my-8 px-5 py-1 text-md text-plumish font-semibold rounded-full border border-white/50 hover:text-white hover:bg-plumish hover:border-transparent focus:outline-none focus:ring-2 focus:ring-plumish focus:ring-offset-2"
              >
                Show {props.childData.name}'s' Height Chart
              </button>
              <button
                onClick={toSetShowWeightModal}
                class="my-8 px-5 py-1 text-md text-plumish font-semibold rounded-full border border-white/50 hover:text-white hover:bg-plumish hover:border-transparent focus:outline-none focus:ring-2 focus:ring-plumish focus:ring-offset-2"
              >
                Show {props.childData.name}'s' Weight Chart
              </button>
              <button
                onClick={toSetShowHeadCircModal}
                class="my-8 px-5 py-1 text-md text-plumish font-semibold rounded-full border border-white/50 hover:text-white hover:bg-plumish hover:border-transparent focus:outline-none focus:ring-2 focus:ring-plumish focus:ring-offset-2"
              >
                Show {props.childData.name}'s' Head Circ Chart
              </button>
              >>>>>>> aa134bdf6d0055d7c159648c56e81b56cb20bfb9
            </div>
            <br></br>
            <Button onClick={props.toSetShowChildDataModal} type="submit">
              Close X
            </Button>
          </div>
        </div>,
        document.querySelector("#modal-root")
      )}
      {showHeightModal && (
        <HeightDisplay
          childData={props.childData}
          toSetShowHeightModal={toSetShowHeightModal}
        ></HeightDisplay>
      )}

      {showWeightModal && (
        <WeightDisplay
          childData={props.childData}
          toSetShowWeightModal={toSetShowWeightModal}
        ></WeightDisplay>
      )}
      {showHeadCircModal && (
        <HeadCircDisplay
          childData={props.childData}
          toSetShowHeadCircModal={toSetShowHeadCircModal}
        ></HeadCircDisplay>
      )}
    </>
  );
};

export default ChildData;
