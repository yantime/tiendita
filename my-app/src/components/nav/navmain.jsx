import { NavLink } from "react-router-dom";


import { getAuth, signOut } from "firebase/auth";

import { Container, Navbar, Nav, Button } from "react-bootstrap";

import {withRouter} from 'react-router-dom'

import "./nav.css";

const  Navi = (props) => {



  const cerrarSesion = () => {

    const auth = getAuth();

    signOut(auth)
    .then( () => {

      props.history.push('/login')


    }, [props.history])

  }
  return (
    <div className="container ">

  <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Shopify </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
        <NavLink to="/landing" ><a class="nav-link active" aria-current="page" href="#">
          Inicio
        </a></NavLink>
        </li>

        <li className="nav-item">
        <NavLink to="/catalogo" ><a class="nav-link active" aria-current="page" href="#">
          Catalogo
        </a></NavLink>
        </li>

        
        
        {
        props.firebaseUser !== null? (
          <li className="nav-item">
          <NavLink to="/admin"  ><a class="nav-link active" aria-current="page" href="#">
          Admin
          </a></NavLink>
          </li>
        ) : null
      }
        
       

        
      </ul>
      <form className="d-flex">

        
        
      <NavLink to="/carrito"   ><button className="btn btn-outline-success mx-2" type="submit">
      <i className="bi bi-cart"></i></button></NavLink>

      {
        props.firebaseUser !== null? (
          <button 
          className="btn btn-dark"
          onClick={() => cerrarSesion()}
          >
            Cerrar sesión
          </button>
        ) : (
          <NavLink to="/login"   ><button className="btn btn-outline-primary" type="submit">
          Iniciar sesión</button></NavLink>
        )
      }
        
      

        <NavLink to="/register" >
          <button className="btn btn-primary mx-2" type="submit">Registro</button>
          </NavLink>

      </form>
    </div>
  </div>
</nav>
    
    </div>

    
    
  );
}

const NavMain = withRouter(Navi)
export {NavMain }
