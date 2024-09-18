import { MdCheck, MdDeleteForever } from "react-icons/md";
import "./Todo.css"

export const TodoList = ({ data, onHandleDeleteTodo, checked, onHandleCheckedTodo }) => {
    return(
        <li className="todo-item">
        <span className={checked ? "checkList" : "notCheckList"}> {data} </span>
        <button className="check-btn" onClick={() => onHandleCheckedTodo(data)}>
          <MdCheck />
        </button>
        <button
          className="delete-btn"
          onClick={() => onHandleDeleteTodo(data)}
        >
          <MdDeleteForever />
        </button>
      </li>
    );
}