import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios"; // Si deseas obtener datos desde una API
import UpdateUser from "./UpdateUser"; // Componente para actualizar usuario
import { putRequest } from "../services/authService";

const UserDataTable = () => {
  const [data, setData] = useState([]); // Datos para la tabla
  const [loading, setLoading] = useState(true); // Estado de carga
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem('accessToken');




  // Configuración de columnas
  const columns = [
    {
      name: "Nombre",
      selector: (row) => row.name, // Selector de datos
      sortable: true, // Habilitar ordenamiento
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Teléfono",
      selector: (row) => row.tel,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <span>
          <button
            className="btn btn-warning me-4"
            onClick={() => handleUpdate(row)}
          >
            <i className="bi bi-pencil"></i>
          </button>
          <button
            className="btn btn-danger me-4"
            onClick={() => handleDelete(row.id, row.email)}
          >
            <i className="bi bi-trash"></i>
          </button>
        </span>
      ),
    },
  ];

  // Obtener datos desde una API (puedes cambiar esta parte)
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/users/api/")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar los datos:", error);
        setLoading(false);
      });
  }, []);

  const handleUpdate = (user) => {

    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (id, email) => {
    const currentUserEmail = localStorage.getItem("userEmail");

    if (currentUserEmail === email) {
      alert("No puedes eliminarte a ti mismo.");
      return;
    }
    const isConfirmed = window.confirm("¿Estás seguro de eliminar este usuario?");
    if (isConfirmed) {
      deleteRequest(`http://127.0.0.1:8000/users/api/${id}/`)
        .then(() => {
          setData(data.filter((user) => user.id !== id));
          alert("Usuario eliminado");
        })
        .catch((error) => {
          console.error("Error al eliminar el usuario:", error);
          alert("Error al eliminar el usuario");
        });
    }
  };


  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleUserUpdate = (updatedUser) => {

    putRequest(`http://127.0.0.1:8000/users/api/${selectedUser.id}/`, updatedUser)
      .then((response) => {
        setData(
          data.map((user) =>
            user.id === selectedUser.id ? response.data : user
          )
        );
        alert("Usuario actualizado");
        handleModalClose();
      })
      .catch((error) => {
        console.error("Error al actualizar el usuario:", error);
        alert("Error al actualizar el usuario");
      });
  };

  return (
    <div>
      <h3>Tabla de usuarios</h3>
      <DataTable
        columns={columns}
        data={data}
        progressPending={loading}
        pagination
        highlightOnHover
        pointerOnHover
      />
      {isModalOpen && selectedUser && (
        <UpdateUser
          user={selectedUser}
          onClose={handleModalClose}
          onUpdate={handleUserUpdate}
        />
      )}
    </div>
  );
};

export default UserDataTable;
