import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { Header } from "./components/header/header";
import { Main } from "./components/main/main";
import { Footer } from "./components/footer/footer";


import { PageCarrito } from "./pages/carrito/carrito";
import { PageCatalogo } from "./pages/catalogo/catalogo";
import { PageLanding } from "./pages/landing/landing";
import { PageLogin } from "./pages/login/login";
import { PageProducto } from "./pages/producto/producto";
import { PageRegister } from "./pages/register/register";
import "./assets/style/main.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Admin} from "./pages/admin/admin";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import { PageAdminCrear } from "./pages/admin/crear/admin-crear";
import { PageAdminEditar } from "./pages/admin/editar/admin-editar";



// import { Card } from "./components/card/card";
/*
Componente wrapper
*/
export function App() {

  const auth = getAuth();
 

  const [firebaseUser, setFirebaseUser] = React.useState(false)

  React.useEffect(() => {
    
    onAuthStateChanged( auth, user => {
      console.log(user)
      if (user) {
        setFirebaseUser(user)
      }
      else {
        setFirebaseUser(null)
      }
    })

  }, [])

  return firebaseUser !== false ? (
    <Router>
      <div className="wrapper">
        <Header firebaseUser={firebaseUser} />
        <Main>
          <Switch>
            <Route path="/admin/editar/:id">
              <PageAdminEditar />
            </Route>
            <Route path="/admin/crear">
              <PageAdminCrear />
            </Route>
            <Route path="/landing">
              <PageLanding />
            </Route>
            <Route path="/catalogo">
              <PageCatalogo />
            </Route>
            <Route path="/producto/:id">
              <PageProducto />
            </Route>
            <Route path="/login">
              <PageLogin />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/register">
              <PageRegister />
            </Route>
            <Route path="/carrito">
              <PageCarrito />
            </Route>
          </Switch>
        </Main>

        <Footer />
      </div>
    </Router>
  ) : (
    <p> Cargando</p>
  );
}
