import React from "react";
import "./DoneTimeStamp.css";

const DoneTimeStamp = ({ doneTime }) => {
  return (
    <div className="done-time-container">
      <p>{`Completed at: ${doneTime}`}</p>
    </div>
  );
};

export default DoneTimeStamp;
