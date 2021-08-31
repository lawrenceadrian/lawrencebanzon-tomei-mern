import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/userConstants";
import axios from "axios";

export const register = (name, email, password, avatar) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const formData = new FormData();
    formData.append("name", "name");
    formData.append("avatar", avatar);
    formData.append("email", email);
    formData.append("password", password);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    // const config = {
    //   headers: {
    //     //"Content-type": "application/json",
    //   },
    // };

    const { data } = await axios.post(
      "http://localhost:5001/users/register",
      formData,
      // { name, email, password, avatar },
      config
    );

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

    // localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    let errorData = {
      error: error.response.data.error,
      message: error.response.data.message,
    };
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: errorData,
    });
  }
};
