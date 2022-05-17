import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../../actions/user";
import { Input } from "../../Input/Input";
import { TaskItem } from "../TaskItem/TaskItem";
import "../styles.scss";

export const TaskSection = ({ currentList }) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const addTasks = () => {
    if (edit && value) {
      dispatch(
        addTask({ title: value, listId: currentList._id }, currentList._id)
      );
    }
    setEdit(!edit);
    setValue("");
  };
  return (
    <div
      className="home_right"
      style={{ background: `${currentList?.color}40` }}
    >
      <div className="home_right_container">
        <h2>{currentList?.title}</h2>
        {edit && (
          <Input value={value} onChange={(e) => setValue(e.target.value)} />
        )}
        <button onClick={addTasks}>+</button>
      </div>
      {currentList?.tasks?.map((task) => (
        <TaskItem
          title={task.title}
          isValid={task.isValid}
          key={task._id}
          id={task._id}
          currentListId={currentList._id}
          listId={task.listId}
        />
      ))}

      <div className="home_divider"></div>
    </div>
  );
};
