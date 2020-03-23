import React, {Fragment, useState} from 'react';
import uuid from 'uuid/v4';


const Formulario = ({crearCita}) => {
    // crear el state de citas 

    const [ cita, actualizarCita ] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: '',
    });

    const [ error, actualizarError ] = useState(false)

    const handleState = (e) => {
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }

    // se destructura el setState de cita 
    const { mascota, propietario, fecha, hora, sintomas } = cita 

    const submitCita = (e) => {
        e.preventDefault()

        //Validar
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '' ){
            actualizarError(true);
            return
        }
        //Eliminar mensaje de error
        actualizarError(false);
        
        // agregar ID
        cita.id = uuid();

        //crear cita
        crearCita(cita)

        //limpiar formulario
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: '',
        })

    }

    return(
        <Fragment>
            <h2>Crear Cita</h2>
            { error ? <p className="alerta-error">Todos los campos son obligatorio</p> : null }
            <form onSubmit={submitCita}>
                <label>Nombre de Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={handleState}
                    value={mascota}

                />
                <label>Nombre del dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre del dueño"
                    onChange={handleState}
                    value={propietario}

                />
                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={handleState}
                    value={fecha}
                />
                <label>Fecha</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={handleState}
                    value={hora}
                />
                <label>Sintomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={handleState}
                    value={sintomas}
                >
                </textarea>
                <button type="submit" className="u-full-width button-primary">Agregar cita</button>
            </form>
        </Fragment>
    );
}

export default Formulario;