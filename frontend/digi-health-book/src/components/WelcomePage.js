import React from 'react';
import Appointment from "./ModalComponents/Appointment";
import Log from "./ModalComponents/Log";

const WelcomePage = (props) => {

    let childData = props.childData.map((d, i) => {
        return (
        <>
          <h1> Child {i}</h1>
          <h2 key = {i}>{d.name} </h2>
          <button>Add New Log</button>
          <button>Add New Appoinment</button>
        </>
        );
      });
    return (
        <div>
            <h1>Welcome to your Digital Child Booklet</h1>
            //route to add child
            <button onClick = {() => props.onClick()}>Add Child</button>
            <br />
            {childData}
            
        </div>
    );
};

export default WelcomePage;



