import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteList,
  editDrawerAction,
  setCurrentList2,
  updateList,
} from "../../../actions/user";
import { Input } from "../../Input/Input";
import { Button } from "../../Button/Button";
import { Radio } from "@mui/material";

const colors = [
  "#008000",
  "#ff0000",
  "#0000ff",
  "#892be2",
  "#ff69b4",
  "#faebd7",
];

export const EditDrawer = () => {
  const { editDrawer, currentList } = useSelector((state) => state.user);
  const [listName, setListName] = useState(currentList?.title);
  const [selectedColor, setSelectedColor] = useState(currentList?.color);
  const dispatch = useDispatch();

  const handleOpenAddDrawer = () => {
    dispatch(editDrawerAction());
  };

  const handleChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const handleSubmit = () => {
    dispatch(
      updateList(
        { listName, selectedColor, id: currentList._id },
        currentList._id
      )
    );
    dispatch(editDrawerAction());
  };

  const handleDelete = () => {
    dispatch(deleteList({ id: currentList._id }));
    dispatch(editDrawerAction());
    dispatch(setCurrentList2(0));
  };

  const controlProps = (item) => ({
    checked: selectedColor === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  useEffect(() => {
    setListName(currentList?.title);
    setSelectedColor(currentList?.color);
  }, [currentList]);

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={editDrawer}
      onClose={handleOpenAddDrawer}
      onOpen={handleOpenAddDrawer}
    >
      <div className="drawer_container">
        <div className="touch_line"></div>
        <h1>Edit list</h1>
        <Input
          placeholder=""
          value={listName}
          name="task"
          onChange={(e) => setListName(e.target.value)}
        />
        <div className="radio_container">
          {colors.map((item) => (
            <Radio
              key={item}
              {...controlProps(item)}
              sx={{
                color: item,
                "&.Mui-checked": {
                  color: item,
                },
              }}
            />
          ))}
        </div>
        <Button text="Edit list" styles="margin-top" onClick={handleSubmit} />
        <Button
          text="Delete list"
          styles="margin-top"
          onClick={handleDelete}
          type="secondary"
        />
      </div>
    </SwipeableDrawer>
  );
};
