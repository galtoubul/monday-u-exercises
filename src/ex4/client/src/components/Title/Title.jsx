import React from "react";
import "./Title.css";
import PropTypes from "prop-types";

const Title = ({ title }) => {
  return (
    <div className="title-container">
      <h1 className="app-title">{title}</h1>
    </div>
  );
};

Title.propTypes = {
  title: PropTypes.string,
};

Title.defaultProps = {
  title: "",
};

export default Title;
