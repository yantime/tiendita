import React from 'react';

import { Link } from 'react-router-dom';


const Cards = () => {

    const [producto, setProducto] = React.useState([])

    React.useEffect (() => {
        ontenerDatos()
    },[])

    const ontenerDatos = async () => {
      const data = await fetch('http://127.0.0.1:8000/producto')
      const productos = await data.json()

      setProducto(productos)

    }



  return (
    
    
    producto.map(item => (

    <div className="col-12 col-sm-12 col-md-3" key={item.pk}>
    <div className="card">
      <img
        src={item.imagen}   
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
       <h6 className="card-title mb-2">
            
            <Link to={`/producto/${item.pk} `}> 
            {item.nombre}
            </Link>
            
        </h6>
        <h5 className="miclase">S/{item.precio}</h5>
        <div className="d-flex justify-content-start">
          <button className="btn btn-outline-primary btn-lg" type="button">
            <i className="bi bi-cart"></i>
          </button>
          <button className="btn btn-primary btn-lg mx-3 " type="button">
            
            Comprar ahora
          </button>
        </div>
      </div>
    </div>
    </div>
    ))
    
  );
}

export default Cards;