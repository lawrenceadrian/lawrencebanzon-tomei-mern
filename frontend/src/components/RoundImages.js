import React from "react";
import "./RoundImages.css";
import WizardHorizontalBar from "../assets/Wizard-HorizontalBar.png";
import WizardStepOne from "../assets/Wizard-Step1.png";
import WizardStepTwo from "../assets/Wizard-Step2.png";
import WizardStepThree from "../assets/Wizard-Step3.png";
import WizardStepFour from "../assets/Wizard-Step4.png";
import WizardStepFive from "../assets/Wizard-Step5.png";

const RoundImages = () => {
  return (
    <div className="row">
      <span>
        <img src={WizardStepOne}></img>
      </span>
      <span>
        <img className="horizontalLine" src={WizardHorizontalBar}></img>
      </span>
      <span>
        <img src={WizardStepTwo}></img>
      </span>
      <span>
        <img src={WizardHorizontalBar} className="horizontalLine"></img>
      </span>
      <span>
        <img src={WizardStepThree}></img>
      </span>
      <span>
        <img src={WizardHorizontalBar} className="horizontalLine"></img>
      </span>
      <span>
        <img src={WizardStepFour}></img>
      </span>
      <span>
        <img src={WizardHorizontalBar} className="horizontalLine"></img>
      </span>
      <span>
        <img src={WizardStepFive}></img>
      </span>
    </div>
  );
};

export default RoundImages;
