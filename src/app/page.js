"use client";

import { useState } from "react";
import ToDo from "../components/todo";

export default function Dashboard() {
    const [todos, setTodos] = useState([
        { id: 1, text: "Comprar leite", category: "Mercado", done: false },
        { id: 2, text: "Pagar conta de luz", category: "Contas", done: true },
        { id: 3, text: "Estudar Next.js", category: "Estudos", done: false },
        { id: 4, text: "Fazer exercícios", category: "Saúde", done: false },
        { id: 5, text: "Ler livro", category: "Estudos", done: false },
    ]);

    const handleToggle = (id) => {
        setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
    };
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <h1 className="text-4xl font-bold">Lista de Tarefas</h1>
                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {todos.map((todo) => (
                        <ToDo todo={todo} key={todo.id} onToggle={handleToggle} />
                    ))}
                </ul>
            </main>
        </div>
    );
}
