import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";
import "./SignupForm.css";

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
    console.log("validateFields");
    return errorCount > 0 ? true : false;
  };

  useEffect(() => {
    if (userInfo) {
      setMessage(userInfo.message);
      setStateRequiredInput([]);
    } else {
      setMessage("userInfo empty");
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

  const handleFileInput = (e) => {
    // handle validations
    const file = e.target.files[0];
    console.log(file);
    setAvatar(file);
    // if (file.size > 1024)
    //   onFileSelectError({ error: "File size cannot exceed more than 1MB" });
    // else onFileSelectSuccess(file);
  };
  return (
    <form onSubmit={submitHandler}>
      {requiredInputState.map((validationAlert) => (
        <li>{validationAlert.value}</li>
      ))}
      <br />
      <div class="parent-wrapper">
        <div class="parent">
          <div class="child">
            <label className="inputTextStyle">
              AVATAR
              <p className="pContainer">
                <input type="file" name="avatar" onChange={handleFileInput} />
              </p>
            </label>
          </div>
          <div class="child">
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
          <div class="child">
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
          <div class="child">
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
          <div class="child">
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
          <input type="submit" value="SAVE & NEXT" className="submitButton" />
        </div>
      </div>
      {message}
    </form>
  );
};

export default SignupForm;
