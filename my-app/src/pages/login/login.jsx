import "./login.css";

import React from "react";

import { auth, db } from "../../pages/tienda/firebase";

import {withRouter} from 'react-router-dom'



import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


const Login = (props) => {


  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [error, setError] = React.useState(null);

  const procesarDatos = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      console.log("Ingrese email");
      setError("Ingrese email");
      return;
    }

    if (!pass.trim()) {
      console.log("Ingrese password");
      setError("Ingrese password");
      return;
    }

    if (pass.length < 6) {
      console.log("Ingrese una contraseña de 6 digitos");
      setError("La contraseña debe ser mayor a 6");
      return;
    }

    setError(null);
    

    login()

    console.log("pasando todo papu");
  };



  const login = React.useCallback(async () => {

    try {

      const auth = getAuth();

      const res = await signInWithEmailAndPassword(auth, email, pass)
      console.log(res.user)
      console.log("Ingreso correcto papu")

      setEmail('')
      setPass('')
      setError(null)
      props.history.push('/admin')

    }catch (error) {

      console.log(error)

      if(error.code === 'auth/user-not-found'){
        setError("Usuario y/o contraseña incorrectos")
      }

      if(error.code === 'auth/wrong-password'){
        setError("Usuario y/o contraseña incorrectos")
      }

    }


  },[auth, email, pass, props.history])



  return (
    <div className="row d-flex justify-content-center h-100">
      <div className="col-12 col-sm-8 col-md-6">
        <main className="form-signin">
          <form onSubmit={procesarDatos}>
            <h1 className="mt-5"> Bienvenido de vuelta</h1>
            <p> Que bueno verte otra vez :)</p>

            <button className="w-100 btn btn-lg btn-azul   mt-3" type="button">
              {" "}
              <i className="bi bi-facebook"></i> Continua con facebook
            </button>
            <button className="w-100 btn btn-lg btn-blanco mt-3 mb-3" type="button">
              <i class="bi bi-google"></i> Continua con google{" "}
            </button>

            <p className="text-center"> o continua con </p>

            <div className="form">
              {error && <div className="alert alert-danger">{error}</div>}
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-control form-control-lg"
                id="floatingInput"
                placeholder="correo"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <label className="form-label">Contraseña</label>
            <div className="">
              <input
                type="password"
                className="form-control form-control-lg"
                id="floatingPassword"
                placeholder="Password"
                onChange={(e) => setPass(e.target.value)}
                value={pass}
              />
            </div>

            <button className="w-100 btn btn-lg btn-success mt-3" type="submit">
              Iniciar sesión
            </button>
            <p className="mt-5 mb-3 text-muted">
              ¿Aun no eres miembro? <strong>Registrate</strong>
            </p>
          </form>
        </main>
      </div>
    </div>
  );
}


const PageLogin = withRouter(Login)
export {PageLogin }