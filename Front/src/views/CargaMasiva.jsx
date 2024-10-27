import React, { useState, useContext } from 'react';
import UserContext from "../context/Context.jsx";

const CargaMasiva = () => {
    const { cargaMasiva } = useContext(UserContext);
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (file) {
            console.log("Archivo cargado:", file.name);
            try {
                const mensaje = await cargaMasiva(file);
                alert(mensaje);
            } catch (error) {
                console.error("Error al cargar el archivo:", error);
            }
        } else {
            console.log("No se ha seleccionado ningún archivo.");
        }
    };

    return (
        <div>
            <h2>Carga Masiva de Usuarios</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Cargar Archivo</button>
            </form>
        </div>
    );
};

/*
// CargaMasiva.jsx
import React, { useState, useContext } from 'react';
import UserContext from "../context/Context.jsx";


const CargaMasiva = () => {
    const { cargaMasiva } = useContext(UserContext);
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (file) {
            console.log("Archivo cargado:", file.name);
            try {
                const mensaje = await cargaMasiva(file);
                console.log("Respuesta del servidor:", mensaje);
            } catch (error) {
                console.error("Error al cargar el archivo:", error);
            }
        } else {
            console.log("No se ha seleccionado ningún archivo.");
        }
    };

    return (
        <div>
            <h2>Carga Masiva de Archivos</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Cargar Archivo</button>
            </form>
        </div>
    );
};
*/
export default CargaMasiva;
