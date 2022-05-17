import React, { useState, useEffect, useCallback } from "react";
import { Logo } from "../../assets/Logo";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import decode from "jwt-decode";
import { firstLetter } from "../../helpers/firstLetter";
import { LOGOUT } from "../../constants/constants";
import { useDispatch } from "react-redux";
import { Button } from "../Button/Button";
import { addDrawerAction } from "../../actions/user";
import "./styles.scss";

export const Header = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useNavigate();

  const logOut = useCallback(() => {
    dispatch({ type: LOGOUT });

    setUser(null);
    history("/auth");
    setVisible(false);
  }, [dispatch, history]);

  const handleOpenAddDrawer = () => {
    dispatch(addDrawerAction());
  };

  useEffect(() => {
    const token = user?.user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logOut();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location, logOut, user?.user?.token]);

  return (
    <div className=" container">
      <div className="header_container ">
        <NavLink to="/" className="link">
          <div className="header header_logo">
            <span>notice</span>
            <Logo />
          </div>
        </NavLink>
        <div>
          {user && (
            <div className="user_container">
              <Button text="+" onClick={handleOpenAddDrawer} />
              <div
                className="header_avatar"
                onClick={() => setVisible(!visible)}
              >
                {user?.user?.imageUrl ? (
                  <img
                    className="header_avatar_image"
                    alt={user?.user?.name}
                    src={user?.user?.imageUrl}
                  />
                ) : (
                  firstLetter(user?.user?.name)
                )}
              </div>
            </div>
          )}
        </div>
        {visible && (
          <div className="header_menu ">
            <Button text="sign out" type="secondary" onClick={logOut} />
          </div>
        )}
      </div>
    </div>
  );
};
