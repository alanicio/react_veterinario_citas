import React from 'react';

const Cita = ({ mascota, propietario, fecha, hora, sintomas }) => (
  <div className='cita'>
    <p>Mascota: <span>{mascota}</span></p>
    <p>Dueño: <span>{propietario}</span></p>
    <p>Fecha: <span>{fecha}</span></p>
    <p>Hora: <span>{hora}</span></p>
    <p>Síntomas: <span>{sintomas}</span></p>
  </div>
);

export default Cita;
