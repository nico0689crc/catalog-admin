import React from "react";
import ReactDOM from "react-dom";

import "./BackdropModal.css";

const BackdropModal = props => {
  return ReactDOM.createPortal(
    <div className="backdrop-modal" onClick={props.onClick}></div>,
    document.getElementById("backdrop-hook")
  );
};

export default BackdropModal;
