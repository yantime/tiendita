import React from "react";

import axios from "axios";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { withRouter } from "react-router-dom";

const Adm = (props) => {
  const [usuario, setUsuario] = React.useState(null);

  React.useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log("Si hay un usuario");
      console.log(uid);
      setUsuario(user);
      // ...
    } else {
      // User is signed out
      // ...
      console.log("No existe usuario activo");
      props.history.push("/login");
    }
  }, [props.history]);

  const [producto, setProducto] = React.useState([]);

  const [pk, setPk] = React.useState("");

  const obtenerDato = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/producto");

      const arrayData = response.data;
      
      setProducto(arrayData);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    obtenerDato();
    console.log("Obteniendo los datos");
  }, []);

  const [valores, setValores] = React.useState({
    nombre: "",
    imagen: "",
    precio: "",
    description: "",
  });

  const { nombre, imagen, precio, description } = valores;

  const handleInputChange = (event) => {
    setValores({
      ...valores,
      [event.target.name]: event.target.value,
    });
  };

  const enviarDatos = async (e) => {
    e.preventDefault();

    axios
      .post("http://127.0.0.1:8000/producto", valores)
      .then(function (response) {
        obtenerDato();

        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    setValores({
      nombre: "",
      imagen: "",
      precio: "",
      description: "",
    });
  };

  const editarProducto = (pk) => {
    const pro = producto.find((producto) => producto.pk === pk);
    console.log(pro);
    setPk(pk);

    setValores({
      nombre: pro.nombre,
      imagen: pro.imagen,
      precio: pro.precio,
      description: pro.description,
    });

    console.log("Editar producto, este es el pk:", pk);
  };

  const actualizarProducto = () => {
    console.log("desde editar");

    console.log(valores);
    console.log("este es el pk papu", pk);

    axios
      .put(`http://127.0.0.1:8000/producto/${pk}`, valores)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="row">
      {usuario && <h3> Hola de nuevo: {usuario.email} </h3>}

      <div className="col-8 mb-5">
        <h4> Formulario </h4>
        <form onSubmit={enviarDatos}>
          <input
            type="text"
            className="form-control"
            Placeholder="Ingresa producto"
            name="nombre"
            value={nombre}
            onChange={handleInputChange}
          />

          <input
            type="text"
            className="form-control mt-3"
            Placeholder="Ingresa precio"
            value={precio}
            name="precio"
            onChange={handleInputChange}
          />

          <input
            type="text"
            className="form-control mt-3"
            Placeholder="Ingresa url de imagen"
            value={imagen}
            name="imagen"
            onChange={handleInputChange}
          />

          <input
            type="text"
            className="form-control mt-3"
            Placeholder="Ingresa descripcion"
            value={description}
            name="description"
            onChange={handleInputChange}
          />

          <button className="btn btn-dark mt-3" type="submit">
            Agregar producto
          </button>
        </form>

        <button
          className="btn btn-warning mx-3 mt-3"
          onClick={actualizarProducto}
        >
          Editar producto
        </button>
      </div>

      <div className="col-12">
        <h4> Lista de productos</h4>
        <ul className="list-group">
          {producto.map((item) => (
            <li
              className="list-group-item d-flex justify-content-between"
              key={item.pk}
            >
              <span className="lead">{item.nombre}</span>
              <div>
                <button className="btn btn-danger btn-sm  mx-2">
                  Eliminar
                </button>
                <button
                  className="btn btn-warning btn-sm "
                  onClick={() => editarProducto(item.pk)}
                >
                  Editar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Admin = withRouter(Adm);
export { Admin };
