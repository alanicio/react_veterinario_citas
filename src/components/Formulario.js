import React, { Fragment, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {
	// Crear State de citas
	/*
		NOTA: usar mismos nombres para names de inputs en el state
	*/
	const [cita, actualizarCita] = useState({
		mascota: '',
		propietario: '',
		fecha: '',
		hora: '',
		sintomas: '',
	});

	const [ error, actualizarError ] = useState(false);

	// Función que se ejecuta cada que el usuario escribe en un input
	const actualizarState = e => {
		actualizarCita({
			...cita, //SpreadOperator
			[e.target.name]: e.target.value,
		});
	}

	// Extraer los valores
	const { mascota, propietario, fecha, hora, sintomas} = cita;

	// Cuando el usuario presiona agregar cita
	const submitCita = e => {
		e.preventDefault();

		//Validar
		if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === ''
		|| hora.trim() === '' || sintomas.trim() === '' ){
			actualizarError(true);
			return;
		}

		//Eliminar mensaje previo de error
		actualizarError(false);

		//Asignar ID
		cita.id = uuidv4();
		
		// Crear la cita
		crearCita(cita);

		//Reiniciar el formulario
		actualizarCita({
			mascota: '',
			propietario: '',
			fecha: '',
			hora: '',
			sintomas: '',
		});

	}

	return (
		<Fragment>
			<h2>Crear Cita</h2>
			{ error
				?
					<p className="alerta-error">Todos los campos son obligatorios</p>
				:
					null
			}

			<form
				onSubmit={submitCita}
			>
				<label>Nombre Mascota</label>
				<input
					type="text"
					name="mascota"
					className="u-full-width"
					placeholder="Nombre Mascota"
					onChange={actualizarState}
					value = { mascota }
				/>

				<label>Nombre Dueño</label>
				<input
					type="text"
					name="propietario"
					className="u-full-width"
					placeholder="Nombre Dueño de la mascota"
					onChange={actualizarState}
					value = { propietario }
				/>

				<label>Fecha</label>
				<input
					type="date"
					name="fecha"
					className="u-full-width"
					onChange={actualizarState}
					value={ fecha }
				/>

				<label>Hora</label>
				<input
					type="time"
					name="hora"
					className="u-full-width"
					onChange={actualizarState}
					value={ hora }
				/>

				<label>Síntomas</label>
				<textarea
					className="u-full-width"
					name="sintomas"
					onChange={actualizarState}
					value={ sintomas }
				></textarea>

				<button
					type="submit"
					className="u-full-width button-primary"
				>Agregar Cita</button>
			</form>

		</Fragment>
	);
}
/*
	NOTA: PropTypes sirve para documentar propiedades, en este caso, si no se cumple lo documentado (por
        ejemplo decir que un dato es una funcion y se pasa como objeto) la consola marcara warnings.
        isRequired es para documentarlo como obligatorio. si esta documentación no se cumple, se marcara
        warning en la consola
*/
Formulario.propTypes = {
	crearCita: PropTypes.func.isRequired
}

export default Formulario;