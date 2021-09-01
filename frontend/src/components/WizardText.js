import React from "react";
import "./WizardText.css";

const WizardText = () => {
  return (
    <div className="row-text">
      <span className="textContainer">
        <p className="pBlue pBold">STEP 1:</p>
        <p className="pBlue">CREATE YOUR ACCOUNT PASSWORD</p>
      </span>
      <span className="textContainer">
        <p>STEP 2:</p>
        <p>PERSONAL INFORMATION</p>
      </span>
      <span className="textContainer">
        <p>STEP 3:</p>
        <p>EMPLOYMENT DETAILS</p>
      </span>
      <span className="textContainer">
        <p>STEP 4:</p>
        <p>UPLOAD DOCUMENTS</p>
      </span>
      <span className="textContainer">
        <p>STEP 5:</p>
        <p>COMPLETE</p>
      </span>
    </div>
  );
};

export default WizardText;
