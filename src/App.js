import React, {Fragment, useState, useEffect} from 'react';

import Formulario from './components/Formulario';
import Cita from './components/Cita';

import PropTypes from 'prop-types';

function App() {

  //citas en LocalStorage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales = [];
  }

  //agregar citas 
  const [ citas, guardarCitas ] = useState (citasIniciales); 

  //Use  Effect para realizar ciertas operaciones cuando el state cambia
  useEffect( () => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas))
    }else{
      localStorage.setItem('citas', JSON.stringify([]))
    }
  }, [citas, ])

  //funcion - tomar las citas actuales y agregar la nueva 
  const crearCita = (cita) => {
    guardarCitas([
      ...citas,
      cita
    ])
  }

  //funcion que elimina una cita 
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas)
  }

  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas';
  
  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario 
              crearCita={crearCita}
             />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            <div className="scroll__container">
              {citas.map( cita => (
                <Cita
                  key={cita.id}
                  cita={cita}

                  eliminarCita={eliminarCita}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired
}

export default App;
