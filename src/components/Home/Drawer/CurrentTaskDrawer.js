import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useDispatch, useSelector } from "react-redux";
import { currentListDrawerAction } from "../../../actions/user";
import { TaskSection } from "../TaskSection/TaskSection";

export const CurrentTaskDrawer = ({ currentList }) => {
  const { currentTaskDrawer } = useSelector((state) => state.user);
  // const { addDrawer } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleOpenAddDrawer = () => {
    dispatch(currentListDrawerAction());
  };

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={currentTaskDrawer}
      onClose={handleOpenAddDrawer}
      onOpen={handleOpenAddDrawer}
    >
      <div className="touch_line"></div>
      <TaskSection currentList={currentList} styles="mobile" />
    </SwipeableDrawer>
  );
};
