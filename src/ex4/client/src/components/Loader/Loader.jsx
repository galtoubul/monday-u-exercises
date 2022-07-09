import React from "react";
import "./Loader.css";
import ScaleLoader from "react-spinners/ScaleLoader";

const Loader = () => {
  return (
    <div className="loader-container">
      <ScaleLoader height={70} width={8} />
    </div>
  );
};
export default Loader;
