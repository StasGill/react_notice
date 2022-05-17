import React, { useState } from "react";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import "./styles.scss";
import { ListIcon } from "../../assets/ListIcon";
import { AUTH } from "../../constants/constants";
import { signin, signup } from "../../actions/auth";

const registrationObject = {
  firstName: " ",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const Auth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [registerData, setRegisterData] = useState({ ...registrationObject });

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

  const handleSubmit = () => {
    dispatch(signup(registerData, history));
    setRegisterData({ ...registrationObject });
  };

  const handleLogIn = () => {
    dispatch(signin(registerData, history));
    setRegisterData({ ...registrationObject });
  };

  // useEffect(() => {
  //   user && history("/");
  // }, [history, user]);

  return (
    <div className="container">
      <div className="auth">
        <div className="auth_left">
          <h1 className="italic">
            Simple and easy notice app on all your devices.
          </h1>
          <ListIcon />
        </div>
        {isAuth ? (
          <div className="auth_right">
            <h1>Sign Up</h1>

            <div className="input_container">
              <Input
                placeholder="Name"
                value={registerData.firstName}
                name="firstName"
                onChange={handleChange}
              />
              <Input
                placeholder="Surname"
                value={registerData.lastName}
                name="lastName"
                onChange={handleChange}
              />
            </div>
            <Input
              placeholder="Email"
              value={registerData.email}
              name="email"
              onChange={handleChange}
            />
            <Input
              placeholder="Password"
              value={registerData.password}
              name="password"
              onChange={handleChange}
            />
            <Input
              placeholder="Repeat Password"
              value={registerData.confirmPassword}
              name="confirmPassword"
              onChange={handleChange}
            />
            <Button text="Sign up" styles="margin-top" onClick={handleSubmit} />
            <div onClick={() => setIsAuth(!isAuth)} className="link margin-top">
              Already have an account? Sign in
            </div>
          </div>
        ) : (
          <div className="auth_right">
            <h1>Sign In</h1>
            <Input
              placeholder="Email"
              value={registerData.email}
              name="email"
              onChange={handleChange}
            />
            <Input
              placeholder="Password"
              value={registerData.password}
              name="password"
              onChange={handleChange}
            />
            <div className="button_container">
              <Button
                text="Sign in"
                styles="margin-top"
                onClick={handleLogIn}
              />
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
            <div onClick={() => setIsAuth(!isAuth)} className="link margin-top">
              Don't have an account? Sign Up
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
