"use client";

import { useState, useEffect } from "react";
import ToDo from "../components/todo";
import { getToDos } from "../services/getToDos";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlus } from "react-icons/fa";

export default function Dashboard() {
    const [todos, setTodos] = useState([
        { id: 1, text: "Planejar o Layout", done: false, category: "Frontend", doneAt: "29/11/2024", createdAt: "26/10/2023", limit: "30/12/2025" },
        { id: 2, text: "Criar o Header", done: false, category: "Frontend", doneAt: "29/11/2024", createdAt: "26/10/2023", limit: "30/12/2025" },
        { id: 3, text: "Planejar o Backend", done: false, category: "Backend", doneAt: "29/11/2024", createdAt: "26/10/2023", limit: "30/12/2025" },
        { id: 4, text: "Montar o banco de dados", done: false, category: "Banco de dados", doneAt: "29/11/2024", createdAt: "26/10/2023", limit: "30/12/2025" },
        { id: 5, text: "Criar o servidor", done: false, category: "Backend", doneAt: "29/11/2024", createdAt: "26/10/2023", limit: "30/12/2025" },
    ]);

    const getData = async () => {
        // try {
        //     const response = await getToDos();
        //     if (response.status === "OK") {
        //         setTodos(response.data);
        //     } else {
        //         console.error("#01 - Erro ao buscar dados:", response);
        //     }
        // } catch (error) {
        //     console.error("#02 - Erro ao buscar dados:", error);
        // } finally {
        //     // setLoading(false);
        // }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleToggle = (id) => {
        setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
    };
    return (
        <div className="bg-dark text-light" style={{ minHeight: "100vh" }}>
            <main className="container text-light p-5 rounded">
                <h1 className="text-center mb-4">Gerenciador de Tarefas</h1>
                <div className="d-flex justify-content-center">
                    <form
                        className="w-100 p-4 bg-dark text-light rounded shadow-lg"
                        style={{ maxWidth: "600px" }}
                        onSubmit={(event) => {
                            event.preventDefault();
                            const formData = new FormData(event.target);
                            console.log("Nova tarefa:", formData.get("task"));
                            console.log("Categoria:", formData.get("category"));
                            console.log("Data Limite:", formData.get("limit"));
                        }}
                    >
                        <div className="mb-3">
                            <label htmlFor="task" className="form-label">
                                Tarefa
                            </label>
                            <input type="text" name="task" id="task" className="form-control" placeholder="Digite uma nova tarefa" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">
                                Categoria
                            </label>
                            <input type="text" name="category" id="category" className="form-control" placeholder="Digite a categoria" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="limit" className="form-label">
                                Data Limite
                            </label>
                            <input type="date" name="limit" id="limit" className="form-control" required />
                        </div>
                        <div className="d-flex justify-content-center align-items-center">
                            <button type="submit" className="btn btn-primary d-flex justify-content-center align-items-center shadow-lg">
                                <FaPlus className="me-2 " />
                                Adicionar Tarefa
                            </button>
                        </div>
                    </form>
                </div>
                <div className="mt-5">
                    <h2 className="text-center mb-4">Lista de Tarefas</h2>
                    <ul className="list-group shadow-lg">
                        {todos.map((todo) => (
                            <ToDo todo={todo} key={todo.id} onToggle={handleToggle} />
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
}
