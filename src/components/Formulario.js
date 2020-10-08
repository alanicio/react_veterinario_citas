import React, { Fragment, useState } from 'react';

const Formulario = () => {
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

		console.log('agrgando...');

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

export default Formulario;