import React from "react";
import "./Title.css";

const Title = ({ title }) => {
  return (
    <div className="title-container">
      <h1 className="app-title">{title}</h1>
    </div>
  );
};

export default Title;
