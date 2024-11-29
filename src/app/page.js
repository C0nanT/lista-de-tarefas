"use client";

import { useState, useEffect } from "react";
import ToDo from "../components/todo";
import { getToDos } from "../services/getToDos";
import "bootstrap/dist/css/bootstrap.min.css";

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
        <div className="bg-dark" style={{ minHeight: "100vh" }}>
            <main className="container bg-dark text-light p-4 rounded shadow-sm">
                <div className="d-flex justify-content-center">
                    {/* formulário para adicionar tarefas */}
                    <form
                        className="d-flex mb-4 mt-20 gap-3 col-7"
                        onSubmit={(event) => {
                            event.preventDefault();
                            const formData = new FormData(event.target);
                            console.log("Nova tarefa:", formData.get("task"));
                            console.log("Categoria:", formData.get("category"));
                        }}
                    >
                        <input type="text" name="task" className="form-control" placeholder="Digite uma nova tarefa" />
                        <div className="col-3">
                            <input type="text" name="category" className="form-control" placeholder="Categoria" />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Adicionar
                        </button>
                    </form>
                </div>
                <div>
                    <h1 className="text-center mb-4">Lista de Tarefas</h1>
                    <ul className="list-group">
                        {todos.map((todo) => (
                            <ToDo todo={todo} key={todo.id} onToggle={handleToggle} />
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
}
