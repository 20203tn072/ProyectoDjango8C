import React, { useState } from 'react'

const UpdateUser = ({ user, onClose, onUpdate }) => {

    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        tel: user?.tel || "",
        surname: user?.surname || "",
        control_number: user?.control_number || "",
        age: user?.age || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData); 
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1050,
        }} >
            <div className="modal show d-block" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Actualizar Usuario</h5>
                            <button
                                type="button"
                                className="btn-close"
                                aria-label="Close"
                                onClick={onClose}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Nombre:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Apellido:</label>
                                    <input
                                        type="text"
                                        name="surname"
                                        className="form-control"
                                        value={formData.surname}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email:</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Número de Control:</label>
                                    <input
                                        type="text"
                                        name="control_number"
                                        className="form-control"
                                        value={formData.control_number}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Edad:</label>
                                    <input
                                        type="number"
                                        name="age"
                                        className="form-control"
                                        value={formData.age}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Teléfono:</label>
                                    <input
                                        type="text"
                                        name="tel"
                                        className="form-control"
                                        value={formData.tel}
                                        onChange={handleChange}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Guardar
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary ms-2"
                                    onClick={onClose}
                                >
                                    Cancelar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateUser