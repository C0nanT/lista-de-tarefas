"use client";

import { useState, useEffect } from "react";
import ToDo from "../components/todo";
import { getToDos } from "../services/getToDos";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Dashboard() {
    const [todos, setTodos] = useState([
        { id: 1, text: "Estudar React", done: false, category: "Estudos" },
        { id: 2, text: "Estudar React", done: false, category: "Estudos" },
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
