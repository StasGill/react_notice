import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../../actions/user";
import { Input } from "../../Input/Input";
import { TaskItem, variant } from "../TaskItem/TaskItem";
import "../styles.scss";
import { Checkbox } from "@mui/material";

export const TaskSection = ({ currentList, styles, userName }) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState("");
  const isEmptyList = currentList?.tasks.length === 0;
  const moreThanOneUser = currentList?.createdByName.length > 1;
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
      className={`home_right ${styles}`}
      style={{ background: `${currentList?.color}40` }}
    >
      {currentList && (
        <>
          <div className="home_right_container">
            <h2>{currentList?.title}</h2>
            {edit && (
              <Input value={value} onChange={(e) => setValue(e.target.value)} />
            )}
            <button onClick={addTasks}>+</button>
          </div>
          {moreThanOneUser && (
            <>
              <div className="home_divider"></div>
              <div className="home_users">
                <h3>Who work on it:</h3>
                <div className="home_users_container">
                  {currentList.createdByName.map((item, index) => {
                    return (
                      <div key={index} className="home_users_container">
                        <Checkbox
                          checked={true}
                          size="medium"
                          color={variant[index]}
                        />
                        <p>{item}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
          {!isEmptyList &&
            currentList?.tasks?.map((task) => (
              <TaskItem
                title={task.title}
                isValid={task.isValid}
                key={task._id}
                id={task._id}
                currentListId={currentList._id}
                listId={task.listId}
                userName={userName}
                userList={currentList.createdByName}
              />
            ))}
          <div className="home_divider"></div>
          {isEmptyList && <h2>List is empty. Press + button to add tasks.</h2>}
        </>
      )}
    </div>
  );
};
