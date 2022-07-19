import { React, useState } from "react";
import Appointment from "./ModalComponents/Appointment";
import Log from "./ModalComponents/Log";
import ChildData from "./ModalComponents/ChildData";

const ChildRow = (props) => {
  const [showChildDataModal, setShowChildDataModal] = useState(false);
  const toSetShowChildDataModal = () => {
    setShowChildDataModal(!showChildDataModal);
  };

  return (
    <div>
      <h1> Child {props.index + 1}</h1>
      <h2 onClick={toSetShowChildDataModal}>{props.childData.name} </h2>
      <div>
        <button
          onClick={props.toSetShowLogModal}
          class="my-8 px-5 py-1 text-md text-plumish font-semibold rounded-full border border-white/50 hover:text-white hover:bg-plumish hover:border-transparent focus:outline-none focus:ring-2 focus:ring-plumish focus:ring-offset-2"
        >
          Add New Log
        </button>
      </div>
      <div>
        <button
          onClick={props.toSetShowApptModal}
          class="my-8 px-5 py-1 text-md text-plumish font-semibold rounded-full border border-white/50 hover:text-white hover:bg-plumish hover:border-transparent focus:outline-none focus:ring-2 focus:ring-plumish focus:ring-offset-2"
        >
          Add New Appoinment
        </button>
      </div>

      {showChildDataModal && (
        <ChildData
          childData={props.childData}
          toSetShowChildDataModal={toSetShowChildDataModal}
        ></ChildData>
      )}

      {props.showLogModal && (
        <Log
          childData={props.childData}
          showLogModal={props.showLogModal}
          toSetShowLogModal={props.toSetShowLogModal}
        ></Log>
      )}
      {props.showApptModal && (
        <Appointment
          childData={props.childData}
          toSetShowApptModal={props.toSetShowApptModal}
        ></Appointment>
      )}
    </div>
  );
};

export default ChildRow;

// =======
//           <div key={d._id} onClick={toSetShowChildDataModal}>
//             <div class="container mx-">
//               <h1> Child {i + 1}</h1>
//               <h2>{d.name} </h2>
//               <button
//                 onClick={toSetShowLogModal}
//                 class="my-8 px-5 py-1 text-md text-plumish font-semibold rounded-full border border-white/50 hover:text-white hover:bg-plumish hover:border-transparent focus:outline-none focus:ring-2 focus:ring-plumish focus:ring-offset-2"
//               >
//                 Add New Log
//               </button>
//               <div class="inline-block mx-2">
//                 <button
//                   onClick={toSetShowApptModal}
//                   class="my-8 px-5 py-1 text-md text-plumish font-semibold rounded-full border border-white/50 hover:text-white hover:bg-plumish hover:border-transparent focus:outline-none focus:ring-2 focus:ring-plumish focus:ring-offset-2"
//                 >
//                   Add New Appoinment
//                 </button>
//               </div>
//             </div>
//           </div>
