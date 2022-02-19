
import { NavLink } from "react-router-dom";
import { NavMain } from "../nav/navmain";
import "./header.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

import { getAuth, onAuthStateChanged } from "firebase/auth";

export function Header() {


  const auth = getAuth();
 

  const [firebaseUser, setFirebaseUser] = React.useState(false)

  React.useEffect(() => {
    
    onAuthStateChanged( auth, user => {
      
      if (user) {
        setFirebaseUser(user)
      }
      else {
        setFirebaseUser(null)
      }
    })

  }, [])
  return (
    <header className="header">
      <div>
        <NavMain firebaseUser={firebaseUser} />
      </div>
    </header>
  );
}


