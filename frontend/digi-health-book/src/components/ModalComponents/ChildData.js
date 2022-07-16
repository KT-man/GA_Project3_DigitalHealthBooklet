import React, { useState } from "react";

const ChildData = (props) => {
  let childDetails = props.childData.map((d, i) => {
    let gender = "";
    if (d.isMale) {
      gender = "Male";
    } else {
      gender = "Female";
    }

    return (
      <>
        <h1> Your Child's Data</h1>
        <h2 key={i}>{d.name} </h2>
        <li>
          <ul>Gender : {gender}</ul>
          <ul>Date of Birth : {d.DOB}</ul>
        </li>
      </>
    );
  });

  let childGrowth = props.childGrowth.map((d, i) => {
    return (
      <>
        <li>{d.date}</li>
        <li>{d.height}</li>
        <li>{d.weight}</li>
        <li>{d.headCirc}</li>
      </>
    );
  });

  let childAppt = props.childAppt.map((d, i) => {
    return (
      <>
        <li>{d.date}</li>
        <li>{d.location}</li>
        <li>{d.doctorName}</li>
        <li>{d.futureAppt}</li>
        <li>{d.reason}</li>
      </>
    );
  });

  return (
    <div>
      {childDetails}
      {childGrowth}
      {childAppt}
    </div>
  );
};

export default ChildData;
