import React, { useState } from "react";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { GoogleLogin } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import "./styles.scss";
// import { ListIcon } from "../../assets/ListIcon";
import { AUTH, SET_ERROR } from "../../constants/constants";
import { signin, signup } from "../../actions/auth";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const registrationObject = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const Auth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [registerData, setRegisterData] = useState({ ...registrationObject });
  const { error } = useSelector((state) => state.auth);
  const [user] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const history = useNavigate();

  if (user) {
    return <Navigate to="/" replace />;
  }

  const googleSuccess = async (res) => {
    const user = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { user, token } });

      history("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = (error) => {
    console.log(error);
  };

  const handleChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(signup(registerData, history));

    // setRegisterData({ ...registrationObject });
  };

  const handleLogIn = (e) => {
    e.preventDefault();
    dispatch(signin(registerData, history));
    setRegisterData({ ...registrationObject });
  };

  const resetError = (e) => {
    e.preventDefault();
    dispatch({ type: SET_ERROR, error: "" });
  };

  return (
    <div className="container">
      <div className="auth">
        {/* <div className="auth_left">
          <h1 className="italic">
            Simple and easy notice app on all your devices.
          </h1>
          <ListIcon />
        </div> */}
        {isAuth ? (
          <div className="auth_right">
            <h1 className="auth_right-header">Sign Up</h1>
            <form onSubmit={handleSubmit}>
              <div className="input_container">
                <Input
                  placeholder="Name"
                  value={registerData.firstName}
                  name="firstName"
                  onChange={handleChange}
                  required
                />
                <Input
                  placeholder="Surname"
                  value={registerData.lastName}
                  name="lastName"
                  onChange={handleChange}
                  required
                />
              </div>
              <Input
                placeholder="Email"
                value={registerData.email}
                name="email"
                onChange={handleChange}
                required
                type="email"
              />
              <Input
                placeholder="Password"
                value={registerData.password}
                name="password"
                onChange={handleChange}
                required
                type="password"
              />
              <Input
                placeholder="Repeat Password"
                value={registerData.confirmPassword}
                name="confirmPassword"
                onChange={handleChange}
                required
                type="password"
              />
              <div className="button_container">
                <Button text="Sign up" styles="margin-top" />
              </div>
              <div
                onClick={() => setIsAuth(!isAuth)}
                className="link margin-top"
              >
                Already have an account? Sign in
              </div>
            </form>
          </div>
        ) : (
          <div className="auth_right">
            <h1 className="auth_right-header">Sign In</h1>
            <form onSubmit={handleLogIn} autoComplete="off">
              <Input
                placeholder="Email"
                value={registerData.email}
                name="email"
                onChange={handleChange}
                type="email"
                required
              />
              <Input
                placeholder="Password"
                value={registerData.password}
                name="password"
                onChange={handleChange}
                type="password"
                required
              />
              <div className="button_container">
                <Button text="Sign in" styles="margin-top" />
                <GoogleLogin
                  clientId="1074544624159-jblfbibnkhtkp13g15v8bf87u5hmnlg5.apps.googleusercontent.com"
                  render={(renderProps) => (
                    <Button
                      text="Goggle Sign in"
                      styles="margin-top"
                      type="secondary"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    />
                  )}
                  onSuccess={googleSuccess}
                  onFailure={googleError}
                  cookiePolicy="single_host_origin"
                />
              </div>
              <div
                onClick={() => setIsAuth(!isAuth)}
                className="link margin-top"
              >
                Don't have an account? Sign Up
              </div>
            </form>
          </div>
        )}
      </div>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={resetError}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert onClose={resetError} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};
