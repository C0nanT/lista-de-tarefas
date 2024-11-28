export default function ToDo({ todo, onToggle }) {
    const handleCheckboxChange = () => {
        onToggle(todo.id);
    };

    return (
        <li key={todo.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
            <div className="flex items-center gap-4">
                <input type="checkbox" id={`todo-${todo.id}`} checked={todo.done} onChange={handleCheckboxChange} />
                <label htmlFor={`todo-${todo.id}`} className={`text-lg font-semibold ${todo.done ? "line-through" : ""} text-gray-800`}>
                    {todo.text}
                </label>
            </div>
            <span className="text-sm font-semibold text-gray-500">{todo.category}</span>
        </li>
    );
}
