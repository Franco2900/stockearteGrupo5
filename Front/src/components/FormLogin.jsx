import { Form, Button} from 'react-bootstrap';
import React, { useState, useContext } from "react";
import UserContext from "../context/Context.jsx"

function FormLogin() {

    const { setUser, hacerLogin , traerTiendaPorId} = useContext(UserContext);
    const [formData, setFormData] = useState({
      userName: "",
      password: "",
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });     
    };
  
    const handleSubmit = async (e) => {
     e.preventDefault();   
   
     try {
        // Hacer la solicitud para obtener el usuario
        const usuario1 = {
         usuario: formData.userName,
         password: formData.password
       };
       console.log("USUARIO1 LOGIN:", usuario1);
  
      const user = await hacerLogin(usuario1);
      //console.log("USUARIO LOGIN OBTENIDO:", JSON.stringify(user));     
            
      // Establece el usuario en el contexto
      //setUser(user);
      const userData = {
        id: user.id,
        usuario : user.usuario,
        tiendaCodigo : user.tiendaCodigo,
        central: user.central ,
        habilitado: user.habilitado,
        isUserLoggedIn : true
      }
      localStorage.setItem("user",JSON.stringify(userData));
  
      window.location.href = '/';
       
     } catch (error) {
       console.error("Error al iniciar sesión", error);
     }
    };

  return (
    <Form onSubmit={handleSubmit}>

      <Form.Group className="mb-3" controlId="formUserName">
        <Form.Label>Usuario</Form.Label>
        <Form.Control type="text" placeholder="Igrese su correo" name="userName" value={formData.userName} onChange={handleChange} required/>        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} required/>
      </Form.Group>
      
      <Button variant="primary" type="submit">Iniciar Sesión</Button>

    </Form>
  );
}

export default FormLogin;