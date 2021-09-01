import React from "react";
import "./RectangleContainer.css";
import Avatar from "../assets/Avatar.png";
import SignupForm from "./SignupForm";

const RectangleContainer = () => {
  return (
    <div className="container">
      <div className="rectangle-container">
        <div className="rectangle">
          <div className="rectangle-text">CREATE YOUR ACCOUNT</div>
        </div>
      </div>

      <div className="details-container">
        <div className="details">
          <div className="details-text">
            Because there will be documents that you need to prepare to apply
            for the loan, let's start off by creating a password so that you can
            login to your account once you have these documents ready.
          </div>
        </div>
      </div>

      <div className="inputContainer">
        <div className="inputContainer-one">
          <div className="inputContainer-image">
            <img
              src={Avatar}
              alt="avatar-logo"
              align="left"
              className="img-avatar"
            />
            <div>
              <label for="file" className="inputButtonLabel">
                Upload
              </label>
              <input type="file" id="file" className="inputButtonClass" />
            </div>
          </div>
          <div className="inputContainer-form">
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RectangleContainer;
