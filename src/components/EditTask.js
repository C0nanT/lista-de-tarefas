import React, { useState, useEffect } from "react";

export default function EditTask({ show, handleClose, task, handleSave }) {
    const formatDate = (date) => {
        const [day, month, year] = date.split("/");
        return `${year}-${month}-${day}`;
    };

    const [description, setDescription] = useState(task.description);
    const [category, setCategory] = useState(task.category);
    const [limitDate, setLimitDate] = useState(formatDate(task.limit_date));

    useEffect(() => {
        if (show) {
            setDescription(task.description);
            setCategory(task.category);
            setLimitDate(formatDate(task.limit_date));
        }
    }, [show, task]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = { description, category, limit_date: limitDate };
        handleSave({ ...task, ...formData });
        handleClose();
    };

    const handleModalClose = () => {
        setDescription("");
        setCategory("");
        setLimitDate("");
        handleClose();
    };

    return (
        <div className={`modal ${show ? "d-block" : "d-none"}`} tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header bg-secondary">
                        <h5 className="modal-title">Editar Tarefa</h5>
                        <button type="button" className="close btn btn-danger btn-sm ms-auto" data-dismiss="modal" aria-label="Close" onClick={handleModalClose}>
                            <span aria-hidden="true">X</span>
                        </button>
                    </div>
                    <div className="modal-body" style={{ backgroundColor: "#ededed" }}>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="descriptionInput" className="form-label text-dark teste">
                                    Tarefa
                                </label>
                                <input type="text" id="descriptionInput" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="categoryInput" className="form-label text-dark">
                                    Categoria
                                </label>
                                <input type="text" id="categoryInput" className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="limitDateInput" className="form-label text-dark">
                                    Data Limite
                                </label>
                                <input type="date" id="limitDateInput" className="form-control" value={limitDate} onChange={(e) => setLimitDate(e.target.value)} required />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Salvar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
