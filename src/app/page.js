"use client";

import { useState, useEffect } from "react";
import Task from "../components/Task.js";
import { getTasksApi } from "../services/getTasksApi";
import { addTaskApi } from "../services/addTaskApi.js";
import { deleteTaskApi } from "../services/deleteTaskApi.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlus } from "react-icons/fa";
export default function Dashboard() {
    const [tasks, setTasks] = useState([]);

    async function getTasks() {
        try {
            const response = await getTasksApi();
            if (response.status === "OK") {
                setTasks(response.tasks);
            } else {
                console.log(response.error);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function addTask(task) {
        console.log(task);
        try {
            const response = await addTaskApi(task);
            if (response.status === "OK") {
                console.log("Tarefa adicionada com sucesso!");
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteTask(id) {
        console.log(id);
        try {
            const response = await deleteTaskApi(id);
            if (response.status === "OK") {
                console.log("Tarefa deletada com sucesso!");
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getTasks();
    }, []);

    const handleToggle = (id) => {
        setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task)));
    };

    const handleDelete = async (id) => {
        await deleteTask(id);
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    };

    return (
        <div className="bg-dark text-light" style={{ minHeight: "100vh" }}>
            <main className="container text-light p-5 rounded">
                <h1 className="text-center mb-4">Adicionar Tarefa</h1>
                <div className="d-flex justify-content-center">
                    <form
                        className="w-100 p-4 bg-dark text-light rounded shadow-lg"
                        style={{ maxWidth: "600px" }}
                        onSubmit={(event) => {
                            event.preventDefault();
                            const task = {
                                description: event.target.description.value,
                                category: event.target.category.value,
                                limit_date: event.target.limit.value,
                            };
                            addTask(task);
                        }}
                    >
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">
                                Tarefa
                            </label>
                            <input type="text" name="description" id="description" className="form-control" placeholder="Digite uma nova tarefa" required />
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
                            <input type="date" name="limit" id="limit" className="form-control" />
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
                    {tasks.length > 0 ? (
                        <>
                            <h2 className="text-center mb-4">Lista de Tarefas</h2>
                            <ul className="list-group shadow-lg">
                                {tasks.map((task) => (
                                    <Task todo={task} key={task.id} onToggle={handleToggle} onDelete={handleDelete} />
                                ))}
                            </ul>
                        </>
                    ) : (
                        ""
                    )}
                </div>
            </main>
        </div>
    );
}
