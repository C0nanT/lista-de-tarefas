import { FaCheck, FaTrashAlt } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import { useEffect } from "react";

export default function ToDo({ todo, onToggle, onDelete, onEdit }) {

    const handleCheckboxChange = () => {
        onToggle(todo.id);
    };

    const handleDelete = () => {
        onDelete(todo.id);
    };

    const handleEdit = () => {
        onEdit(todo.id);
    };

    useEffect(() => {}, [todo.id]);

    return (
        <li id={`todo-${todo.id}`} key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center justify-content-center">
                <button className="btn btn-light d-flex align-items-center justify-content-start" onClick={handleCheckboxChange}>
                    <input type="checkbox" id={`todo-${todo.id}`} checked={todo.done} onChange={handleCheckboxChange} className="form-check-input d-none" />
                    {todo.done ? <FaCheck className="text-success" /> : null}
                    <label htmlFor={`todo-${todo.id}`} className={`ms-2 ${todo.done ? "text-decoration-line-through text-secondary" : "fw-medium"}`} style={{ cursor: "pointer" }}>
                        #{todo.id} - {todo.description}
                    </label>
                    {todo.done ? <span className="badge bg-success ms-2">{todo.doneAt}</span> : null}
                </button>
                {!todo.done && <span className="badge bg-danger text-white m-2">{todo.limit_date}</span>}
            </div>

            <div className="d-flex align-items-center">
                <span className="badge bg-secondary text-white me-3">{todo.category}</span>
                <span className="badge bg-warning text-white me-3">{todo.createdAt}</span>

                <button onClick={handleEdit} className="shadow-lg btn btn-sm btn-primary me-2 text-white d-flex align-items-center justify-content-center ">
                    <MdOutlineEdit />
                </button>
                <button onClick={handleDelete} className="shadow-lg btn btn-sm btn-danger text-white d-flex align-items-center justify-content-center">
                    <FaTrashAlt />
                </button>
            </div>
        </li>
    );
}
