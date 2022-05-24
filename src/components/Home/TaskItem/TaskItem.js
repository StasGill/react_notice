import { Checkbox } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../../../actions/user";
import { DeleteIcon } from "../../../assets/DeleteIcon";
import { DotsIcon } from "../../../assets/DotsIcon";
import { EditIcon } from "../../../assets/EditIcon";
import { Input } from "../../Input/Input";
import "./styles.scss";

export const variant = ["primary", "secondary", "success", "warning", "info"];

const userColor = (users, user) => {
  const index = users?.findIndex((item) => item === user);
  return variant[index];
};

export const TaskItem = ({
  title,
  isValid,
  id,
  currentListId,
  listId,
  userName,
  userList,
}) => {
  const [show, setShow] = useState(false);
  const [isCheck, setCheck] = useState(isValid);
  const [isEdit, setEdit] = useState(false);
  const [text, setText] = useState(title);
  const dispatch = useDispatch();

  const handleChange = () => {
    setEdit(!isEdit);
    setShow(!show);
  };

  const handleDelete = () => {
    dispatch(deleteTask(id, currentListId));
  };

  const handleCheck = () => {
    let updatedTask;
    if (isValid) {
      setCheck("");
      updatedTask = {
        title: text,
        isValid: "",
        listId: listId,
      };
    } else {
      setCheck(userName);
      updatedTask = {
        title: text,
        isValid: userName,
        listId: listId,
      };
    }
    dispatch(updateTask(id, currentListId, updatedTask));
  };

  const handleUpdate = () => {
    const updatedTask = {
      title: text,
      isValid: isCheck,
      listId: listId,
    };
    dispatch(updateTask(id, currentListId, updatedTask));
    setEdit(!isEdit);
  };

  return (
    <>
      <div className="home_divider"></div>
      <div className="task_item">
        <div className="task_item_container">
          <Checkbox
            onClick={handleCheck}
            checked={!!isCheck}
            size="medium"
            color={userColor(userList, isValid)}
          />
          {isEdit ? (
            <>
              <Input value={text} onChange={(e) => setText(e.target.value)} />
              <button onClick={handleUpdate}>save</button>
            </>
          ) : (
            <p className={isCheck ? "decorate" : ""}>{text}</p>
          )}
        </div>
        <div className="task_item_container">
          {show && (
            <>
              <button onClick={handleChange}>
                <EditIcon />
              </button>
              <button onClick={handleDelete}>
                <DeleteIcon />
              </button>
            </>
          )}
          <button onClick={() => setShow(!show)}>
            <DotsIcon />
          </button>
        </div>
      </div>
    </>
  );
};
