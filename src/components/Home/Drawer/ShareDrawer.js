import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useDispatch, useSelector } from "react-redux";
import { shareDrawerAction } from "../../../actions/user";
import { TelegramIcon } from "../../../assets/TelegramIcon";

const url = " https://notice-a.netlify.app/share/";
const message = "I wanna share with you my notice list, please tap on link :-)";

export const ShareDrawer = () => {
  const { shareDrawer, currentList } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleOpenAddDrawer = () => {
    dispatch(shareDrawerAction());
  };

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={shareDrawer}
      onClose={handleOpenAddDrawer}
      onOpen={handleOpenAddDrawer}
    >
      <div className="drawer_container">
        <div className="touch_line"></div>
        <h1>Share list</h1>
        <a
          href={`tg://msg_url?url=${url}${currentList?._id}&text=${message}`}
          target="blank"
        >
          <div className="drawer_icon">
            <TelegramIcon />
          </div>
        </a>
      </div>
    </SwipeableDrawer>
  );
};
