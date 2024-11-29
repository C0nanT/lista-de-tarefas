import { FaCheck, FaTrashAlt, FaEdit } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import { useEffect } from "react";
import $ from "jquery";

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
            <div className="d-flex align-items-center" onClick={handleCheckboxChange}>
                <input type="checkbox" id={`todo-${todo.id}`} checked={todo.done} onChange={handleCheckboxChange} className="form-check-input me-2 hidden" />
                <span>{todo.done && <FaCheck className="text-success" />}</span>
                <label htmlFor={`todo-${todo.id}`} className={`ms-2 ${todo.done ? "text-decoration-line-through" : ""}`}>
                    {todo.text}
                </label>
            </div>
            <div className="d-flex align-items-center">
                <span className="badge bg-success text-white me-3">{todo.category}</span>
                <button onClick={handleEdit} className="btn btn-sm btn-dark me-2 text-white">
                    <MdOutlineEdit />
                </button>
                <button onClick={handleDelete} className="btn btn-sm btn-danger text-white">
                    <FaTrashAlt />
                </button>
            </div>
        </li>
    );
}
