import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import Button from "./Button";
import HeightDisplay from "./HeightDisplay";
import WeightDisplay from "./WeightDisplay";
import HeadCircDisplay from "./HeadCircDisplay";
// import EditLog from "./EditLog";
// import ButtonE from "./ButtonE";
// import ButtonDelete from "./ButtonDelete";
import ChildDataLogRows from "./ChildDataLogRows";
import ChildDataApptRows from "./ChildDataApptRows";

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

  let today = new Date();
  let birthDate = new Date(props.childData.DOB);
  const age = today.getFullYear() - birthDate.getFullYear();

  return (
    <>
      {ReactDOM.createPortal(
        <div className={styles.backdrop}>
          <div className={`${styles.board} ${styles.modal}`}>
            <div class="px-8 py-4">
              <h3 class="px-4 py-4 text-lg bg-aquamarine">
                {props.childData.name}'s Details
                <span class="flex-inline text-sm">
                  <Button onClick={props.toSetShowChildDataModal} type="submit">
                    Close
                  </Button>
                </span>
              </h3>
            </div>
            <div>
              <span class="font-bold">Gender:</span>{" "}
              {props.childData.isMale ? "Male" : "Female"}
            </div>
            <div>
              <span class="font-bold">{props.childData.name}'s Birthday:</span>{" "}
              {props.childData.DOB.split("T")[0]}
            </div>
            <div>
              <span class="font-bold">Age :</span> {age}
            </div>
            <br></br>
            <hr></hr>
            <br></br>
            <div>
              <div>
                <span class="font-bold"> Upcoming Appointments:</span>
                <br />
                {props.childData.appointments.length === 0 ? (
                  "Please add an appointment first!"
                ) : (
                  <table>
                    <thead>
                      <tr>
                        <td>
                          <span class="font-bold">Date</span>
                        </td>
                        <td>
                          <span class="font-bold">Location</span>
                        </td>
                        <td>
                          <span class="font-bold">Reason</span>
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      {props.childData.appointments.map((appt) => {
                        return (
                          <ChildDataApptRows
                            key={appt._id}
                            id={appt._id}
                            date={appt.date}
                            location={appt.location}
                            reason={appt.reason}
                            toSetDeleteCounter={props.toSetDeleteCounter}
                            fetchChildData={props.fetchChildData}
                          ></ChildDataApptRows>
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
                <span class="font-bold">Growth Logs:</span>
                {props.childData.logs.length === 0 ? (
                  <p>"Please add a log first!"</p>
                ) : (
                  <table>
                    <thead>
                      <tr>
                        <td>
                          <span class="font-bold">Date</span>
                        </td>
                        <td>
                          <span class="font-bold">Height</span>
                        </td>
                        <td>
                          <span class="font-bold">Weight</span>
                        </td>
                        <td>
                          <span class="font-bold">Head Circumference</span>
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      {props.childData.logs.map((log) => {
                        return (
                          <ChildDataLogRows
                            key={log._id}
                            id={log._id}
                            date={log.date}
                            height={log.height}
                            weight={log.weight}
                            headCirc={log.headCirc}
                            toSetDeleteCounter={props.toSetDeleteCounter}
                            fetchChildData={props.fetchChildData}
                          ></ChildDataLogRows>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
              <br />
              <button
                onClick={toSetShowHeightModal}
                class="my-8 px-5 py-1 text-md text-plumish font-semibold rounded-full border border-white/50 hover:text-white hover:bg-plumish hover:border-transparent focus:outline-none focus:ring-2 focus:ring-plumish focus:ring-offset-2"
              >
                Height Chart
              </button>

              <button
                onClick={toSetShowWeightModal}
                class="my-8 px-5 py-1 text-md text-plumish font-semibold rounded-full border border-white/50 hover:text-white hover:bg-plumish hover:border-transparent focus:outline-none focus:ring-2 focus:ring-plumish focus:ring-offset-2"
              >
                Weight Chart
              </button>

              <button
                onClick={toSetShowHeadCircModal}
                class="my-8 px-5 py-1 text-md text-plumish font-semibold rounded-full border border-white/50 hover:text-white hover:bg-plumish hover:border-transparent focus:outline-none focus:ring-2 focus:ring-plumish focus:ring-offset-2"
              >
                Head Circ Chart
              </button>
            </div>
            <br />
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
