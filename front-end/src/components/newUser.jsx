import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const CustomUserForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    surname: "",
    control_number: "",
    age: "",
    tel: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/users/form/")
      .then((response) => {
        console.log(response.data); // Verifica que los datos se reciban correctamente
        setFormFields(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los datos, contacte con el administrador", error);
        setLoading(false);
        });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post("http://127.0.0.1:8000/users/form/", formData)
      .then((response) => {
        alert(response.data.message); // Mensaje de éxito
        navigate("/login");
        setErrors({}); // Limpiar errores en caso de éxito
        setLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setErrors(error.response.data); // Guardamos los errores en el estado
        }
        else{
            alert("Ocurrio un error inesperado, contacta al administrador.");
        }
        console.error("Error al enviar el formulario", error);
        setLoading(false);
        window.scrollTo(0, 0);
      });
  };

  if(loading){
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-border text-primary" style={{ width: "5rem", height: "5rem" }} role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      );
  }
  
  return (
    <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
              exit={{ opacity: 0, y: -50, transition: { duration: 0.5 } }}
              className="page"
            >
    <div className="d-flex justify-content-center align-items-center min-vh-100 mt-5">
            <div className="card p-4 shadow" style={{ width: "350px" }}>
                <h2 className="text-center mb-3">Nuevo Usuario</h2>
                <form onSubmit={handleSubmit}>
                    {formFields &&
                        Object.keys(formFields).map((field) => {
                            const { label, input, type } = formFields[field];
                            return (
                                <div key={field} className="mb-3">
                                    <label htmlFor={input.id} className="form-label">{label}</label>
                                    <input
                                        {...input}
                                        value={formData[field] || ""}
                                        onChange={handleInputChange}
                                        name={field}
                                        type={type || "text"}
                                        className="form-control"
                                    />
                                    {errors[field] && (
                                        <span autoFocus className="text-danger">
                                            {errors[field].map((errorMsg, index) => (
                                                <span key={index}>
                                                    <i className="bi bi-exclamation-circle-fill me-1"></i>
                                                    {errorMsg}
                                                </span>
                                            ))}
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    <button type="submit" className="btn btn-primary w-100 mb-3">
                        Enviar
                    </button>
                </form>
                <div className="text-center">
                    <strong>¿Ya tienes cuenta?<br /></strong>
                    <Link className="" to="/login">
                        Inicia sesión
                    </Link>
                </div>
            </div>
        </div>
    </motion.div>
  );
};

export default CustomUserForm;
