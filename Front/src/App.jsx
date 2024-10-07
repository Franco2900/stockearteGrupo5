import './App.css'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import {useContext} from "react"
import { ProtectedRoute } from './context/ProtectedRoute.jsx';
import UserContext from "./context/Context.jsx";
import NavBar from "./components/NavBar"
import Footer from './components/Footer'
import Home from "./views/Home";
import Login from "./views/Login.jsx";
import BuscarUsuarios from './views/BuscarUsuarios.jsx';
import BuscarProductos from './views/BuscarProductos.jsx';
import BuscarTiendas from './views/BuscarTiendas.jsx';
import CrearUpdUsr from './views/CrearUpdUsr.jsx';
import CrearUpdTienda from './views/CrearUpdTienda.jsx';
import CrearUpdProd from './views/CrearUpdProd.jsx';
import AsigProd from './views/AsigProd.jsx';
import AsigUser from './views/AsigUser.jsx';
import ModStock from './views/ModStock.jsx';
import BuscarOrdenes from './views/BuscarOrdenes.jsx';
import CrearUpdOrden from './views/CrearUpdOrden.jsx';
import Novedades from './views/Novedades.jsx';



function App() {
  const {user} = useContext(UserContext)
  return (
    <>
      <BrowserRouter>   
          <div className='App'>
              <NavBar></NavBar> 
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />

                  {/*Rutas protegidas solo para usuarios logueados*/}
                  <Route element={<ProtectedRoute isAllowed={!!user}/>} >
                      <Route path='/buscarproductos' element={<BuscarProductos />} /> 
                  </Route>

                  {/*Rutas para usuarios de tienda*/}
                  {/*<Route element={<ProtectedRoute isAllowed={!!user && !user.central}/>} >*/}
                  <Route element={<ProtectedRoute isAllowed={!!user}/>} >
                      <Route path='/modstock' element={<ModStock/>} />
                      <Route path='/buscarordenes' element={<BuscarOrdenes/>} />
                      <Route path='/crearupdorden' element={<CrearUpdOrden/>} />
                  </Route>

                  {/*Rutas protegidas solo para usuarios Casa Central*/}
                  <Route element={<ProtectedRoute isAllowed={!!user && user.central}/>} >          
                      <Route path='/buscartiendas' element={<BuscarTiendas />} />
                      <Route path="/creartienda" element={<CrearUpdTienda/>} />
                      <Route path='/buscarusuarios' element={<BuscarUsuarios />} />
                      <Route path="/crearusuario" element={<CrearUpdUsr/>} />
                      <Route path="/crearproducto" element={<CrearUpdProd/>}/>
                      <Route path="/asigprod" element={<AsigProd/>}/>
                      <Route path="/asiguser" element={<AsigUser/>}/>
                      <Route path="/novedades" element={<Novedades/>}/>
                  </Route>
                  
                </Routes>
              <Footer></Footer>
           </div>
      </BrowserRouter>
    </>
  )
}

export default App
