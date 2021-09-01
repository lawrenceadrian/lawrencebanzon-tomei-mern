import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";
import "./SignupForm.css";
import ArrowRightLogo from "../assets/arrow-right.png";
import Avatar from "../assets/Avatar.png";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const requiredInput = [];

  const [requiredInputState, setStateRequiredInput] = useState(requiredInput);
  // initialValue.push(...allowedState);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, msg } = userRegister;

  const validateFields = () => {
    let errorCount = 0;
    if (password !== confirmpassword) {
      requiredInput.push({ value: "not matched" });
      errorCount++;
    }
    if (!email) {
      requiredInput.push({ value: "Email required" });
      errorCount++;
    }
    if (!name) {
      requiredInput.push({ value: "Name required" });
      errorCount++;
    }
    if (!password) {
      requiredInput.push({ value: "Password required" });
      errorCount++;
    }
    if (password && !confirmpassword) {
      requiredInput.push({ value: "Please re-enter your password" });
      errorCount++;
    }
    if (!avatar) {
      requiredInput.push({ value: "Please upload a photo of you" });
      errorCount++;
    } else {
      let fileTypeCheck =
        avatar.type.substr(avatar.type.lastIndexOf("/") + 0) + "$";
      fileTypeCheck = avatar.type.replace(new RegExp(fileTypeCheck), "");

      if (fileTypeCheck != "image") {
        requiredInput.push({ value: "File selected is not a photo" });
        errorCount++;
      }
    }
    console.log("validateFields");
    return errorCount > 0 ? true : false;
  };

  useEffect(() => {
    if (userInfo) {
      setMessage(userInfo.message);
      setStateRequiredInput([]);
    } else {
      setMessage("");
    }
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    let isNotValidInput = validateFields();
    console.log("validate", isNotValidInput);

    if (isNotValidInput == true) {
      setStateRequiredInput(requiredInput);
    } else {
      dispatch(register(name, email, password, avatar));
      console.log("valid");
    }
  };

  const [imageSrc, setImageSrc] = useState(Avatar);
  const handleFileInput = (e) => {
    // handle validations
    const file = e.target.files[0];
    console.log(file);
    setAvatar(file);

    if (file) {
      let fileTypeCheck =
        file.type.substr(file.type.lastIndexOf("/") + 0) + "$";
      fileTypeCheck = file.type.replace(new RegExp(fileTypeCheck), "");

      if (fileTypeCheck == "image") {
        var reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = function (e) {
          setImageSrc(e.target.result);
        }.bind(this);
      } else {
        setImageSrc(Avatar);
      }
    } else {
      setImageSrc(Avatar);
    }
  };
  return (
    <form onSubmit={submitHandler}>
      <div className="validationAlert">
        {requiredInputState.map((validationAlert) => (
          <li>{validationAlert.value}</li>
        ))}
      </div>

      <br />

      <div className="parent-wrapper">
        <div className="parent parent-avatar">
          <div className="inputContainer">
            <div className="inputContainer-one">
              <div className="inputContainer-image">
                <img
                  src={imageSrc}
                  alt="avatar-logo"
                  align="left"
                  className="img-avatar"
                />
                <div>
                  <label htmlFor="file" className="inputButtonLabel">
                    Upload
                  </label>
                  <input
                    type="file"
                    id="file"
                    className="inputButtonClass"
                    onChange={handleFileInput}
                  />
                </div>
              </div>
              {/* <div className="inputContainer-form">
                <SignupForm />
              </div> */}
            </div>
          </div>
        </div>
        <br />
        <div className="parent parent-form">
          <div className="child">
            <label className="inputTextStyle">
              NAME
              <p className="pContainer">
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </p>
            </label>
          </div>
          <div className="child">
            <label className="inputTextStyle">
              EMAIL
              <p className="pContainer">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </p>
            </label>
          </div>
          <div className="child">
            <label className="inputTextStyle">
              PASSWORD
              <p className="pContainer">
                <input
                  type="password"
                  name="name"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </p>
            </label>
          </div>
          <div className="child">
            <label className="inputTextStyle">
              CONFIRM PASSWORD
              <p className="pContainer">
                <input
                  type="password"
                  name="name"
                  value={confirmpassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </p>
            </label>
          </div>
          <div>
            <input type="submit" value="SAVE & NEXT" className="submitButton" />
          </div>
        </div>
      </div>
      <div className="successfulAlert">{message}</div>
    </form>
  );
};

export default SignupForm;
