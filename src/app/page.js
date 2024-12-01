"use client";

import { useState, useEffect } from "react";

import Task from "../components/Task.js";
import EditTask from "../components/EditTask.js";

import { getTasksApi } from "../services/getTasksApi";
import { addTaskApi } from "../services/addTaskApi.js";
import { deleteTaskApi } from "../services/deleteTaskApi.js";
import { editTaskApi } from "../services/editTaskApi.js";
import { completeTaskApi } from "../services/completeTaskApi.js";

import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlus } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import showToast from "../components/showToast.js";

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);

    function sortTasks(tasks) {
        return tasks.sort((a, b) => {
            const [dayA, monthA, yearA] = a.limit_date.split("/");
            const [dayB, monthB, yearB] = b.limit_date.split("/");
            return new Date(`${yearA}-${monthA}-${dayA}`) - new Date(`${yearB}-${monthB}-${dayB}`);
        });
    }

    async function getTasks() {
        try {
            const response = await getTasksApi();
            if (response.status === "OK") {
                setTasks(sortTasks(response.tasks));
                showToast("success", "Tarefas carregadas com sucesso!");
            } else {
                showToast("error", "#02 - Erro ao carregar tarefas!");
                console.log(response.error);
            }
        } catch (error) {
            showToast("error", "#03 -Erro ao carregar tarefas!");
            console.log(error);
        }
    }

    async function addTask(task) {
        try {
            const response = await addTaskApi(task);
            if (response.status === "OK") {
                setTasks((prevTasks) => sortTasks([...prevTasks, response.data]));
                showToast("success", "Tarefa adicionada com sucesso!");
            } else {
                console.log(response);
                showToast("error", "#02 - Erro ao adicionar tarefa!");
            }
        } catch (error) {
            console.log(error);
            showToast("error", "#03 - Erro ao adicionar tarefa!");
        }
    }

    async function deleteTask(id) {
        console.log(id);
        try {
            const response = await deleteTaskApi(id);
            if (response.status === "OK") {
                console.log("Tarefa deletada com sucesso!");
                showToast("success", "Tarefa deletada com sucesso!");
                setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
            } else {
                console.log(response);
                showToast("error", "#02 - Erro ao deletar tarefa!");
            }
        } catch (error) {
            console.log(error);
            showToast("error", "#03 - Erro ao deletar tarefa!");
        }
    }

    async function editTask(task) {
        try {
            const response = await editTaskApi(task);
            if (response.status === "OK") {
                task.limit_date = new Date(task.limit_date).toLocaleDateString("pt-BR", { timeZone: "UTC" });
                setTasks((prevTasks) => sortTasks(prevTasks.map((t) => (t.id === task.id ? { ...t, ...task } : t))));
                showToast("success", "Tarefa editada com sucesso!");
            } else {
                showToast("error", "#02 - Erro ao editar tarefa!");
            }
        } catch (error) {
            showToast("error", "#03 - Erro ao editar tarefa!");
        }
    }

    async function completeTask(id) {
        try {
            const response = await completeTaskApi(id);
            if (response.status === "OK") {
                response.task.doneAt = new Date(response.task.doneAt).toLocaleDateString("pt-BR", { timeZone: "UTC" });
                setTasks((prevTasks) => sortTasks(prevTasks.map((task) => (task.id === id ? { ...task, done: response.task.done, doneAt: response.task.doneAt } : task))));
                if (response.task.done) {
                    showToast("success", "Tarefa concluída com sucesso!");
                } else {
                    showToast("success", "Tarefa desmarcada com sucesso!");
                }
            } else {
                console.log(response);
                showToast("error", "#02 - Erro ao concluir tarefa!");
            }
        } catch (error) {
            console.log(error);
            showToast("error", "#03 - Erro ao concluir tarefa!");
        }
    }

    useEffect(() => {
        getTasks();
    }, []);

    const handleToggle = async (id) => {
        await completeTask(id);
    };

    const handleDelete = async (id) => {
        await deleteTask(id);
    };

    const handleEdit = (task) => {
        setCurrentTask(task);
        setShowEditModal(true);
    };

    const handleSave = async (updatedTask) => {
        await editTask(updatedTask);
    };

    return (
        <div className="bg-dark text-light" style={{ minHeight: "100vh" }}>
            <ToastContainer />
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
                                    <Task todo={task} key={task.id} onToggle={handleToggle} onDelete={handleDelete} onEdit={() => handleEdit(task)} />
                                ))}
                            </ul>
                        </>
                    ) : (
                        ""
                    )}
                </div>
            </main>
            {currentTask && <EditTask show={showEditModal} handleClose={() => setShowEditModal(false)} task={currentTask} handleSave={handleSave} />}
        </div>
    );
}
