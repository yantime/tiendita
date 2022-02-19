import React from 'react';

import {auth,db} from '../../pages/tienda/firebase'

import {withRouter} from 'react-router-dom'

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Register = (props) => {

  const [email, setEmail] = React.useState('')
  const [pass, setPass] = React.useState('')
  const [error, setError] = React.useState(null)

  const procesarDatos = e => {
    e.preventDefault()
    if(!email.trim()){
      console.log('Ingrese email')
      setError('Ingrese email')
      return 

    }

   
    if(!pass.trim()){
      console.log('Ingrese password')
      setError('Ingrese password')
      return 

    }

    if(pass.length < 6){
      console.log('Ingrese una contraseña de 6 digitos')
      setError('La contraseña debe ser mayor a 6')
      return 

    }

    setError(null)
    registrar()

    console.log('pasando todo papu')
  }

  const registrar = React.useCallback(async () => {

    try {

      const auth = getAuth();

      const res = await createUserWithEmailAndPassword(auth, email, pass)
      await db.collection('usuarios').doc(res.user.email).set({
        email:res.user.email,
        uid:res.user.uid
      })
      console.log(res.user)

      setEmail('')
      setPass('')
      setError(null)
      props.history.push('/admin')


    }catch(err){
      console.log(err)

      if(err.code === 'auth/invalid-email'){
        setError("Correo no valido")
      }

      if(err.code === 'auth/email-already-in-use'){
        setError("Este correo ya esta en uso")
      }

      
    }


  }, [auth, email, pass, props.history])


return <div className="row d-flex justify-content-center">
<div className="col-12 col-sm-12 col-md-6">
  
<main className="form-signin">
<form onSubmit={procesarDatos}>
  <h1 className="mt-5"> Únete hoy</h1>
  <p> Empieza tu camino de aprendizaje</p>  

  <button className="w-100 btn btn-lg btn-azul   mt-3" type="submit">  <i class="bi bi-facebook"></i> Continua con facebook</button>
  <button className="w-100 btn btn-lg btn-blanco mt-3 mb-3" type="submit"><i class="bi bi-google"></i> Continua con google </button>

  <p className="text-center"> o continua con </p>


  <div className="form">
    {
      error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )
    }
    <label  className="form-label">Correo electrónico</label>
    <input 
    type="email" 
    className="form-control form-control-lg" 
    id="floatingInput" 
    placeholder="correo"
    onChange={e => setEmail(e.target.value)}
    value = {email}
    />
   
  </div>

  <label className="form-label">Contraseña</label>
  <div className="">
    <input 
    type="password" 
    className="form-control form-control-lg" 
    id="floatingPassword" 
    placeholder="Password"
    onChange={e => setPass(e.target.value)}
    value = {pass}
    />
    
  </div>

  
  <button className="w-100 btn btn-lg btn-success mt-3" type="submit">Registrarte</button>
  <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
</form>

</main>

</div>
</div>;
  }

const PageRegister = withRouter(Register)

export {PageRegister}