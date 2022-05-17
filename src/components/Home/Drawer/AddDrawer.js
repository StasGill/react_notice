import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDrawerAction, addList } from "../../../actions/user";
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

export const AddDrawer = () => {
  const { addDrawer } = useSelector((state) => state.user);
  const [listName, setListName] = useState("");
  const [selectedColor, setSelectedColor] = useState("#0080007d");
  const dispatch = useDispatch();

  const handleOpenAddDrawer = () => {
    dispatch(addDrawerAction());
  };

  const handleChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const handleSubmit = () => {
    dispatch(addList({ listName, selectedColor }));
    dispatch(addDrawerAction());
    setListName("");
  };

  const controlProps = (item) => ({
    checked: selectedColor === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={addDrawer}
      onClose={handleOpenAddDrawer}
      onOpen={handleOpenAddDrawer}
    >
      <div className="drawer_container">
        <div className="touch_line"></div>
        <h1>Add list</h1>
        <Input
          placeholder="Task"
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
        <Button text="Add task" styles="margin-top" onClick={handleSubmit} />
      </div>
    </SwipeableDrawer>
  );
};
