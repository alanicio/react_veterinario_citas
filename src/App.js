import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {
  // Citas en localStorage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales = [];
  }

  /* 
    NOTA: La funcion set de useState corre TODO el codigo del componente funcional EXCEPTO
          el codigo dentro del useState    
  */ 
  // Arreglo de citas
  const [citas, guardarCitas] = useState(citasIniciales);

  // Use effect para realizar ciertas operaciones cuando el state cambia
   /* 
    NOTA: useEffect SIEMPRE es un arroy function. Se ejecuta cuando el componente esta listo
          (como document.ready) pero tambien cuando hay cambios en el componente.
          Para decirle a useEffect que solo se ejecute una vez tienes que pasarle como segundo parametro
          despues de la función, un arreglo vacio. Ese segundo parametro siempre es un arreglo y se
          conoce como dependencias. Cada vez que el state pasado como dependencia cambie (en este caso citas
          es la dependencia) se va a ejecutar el useEffect
  */
  useEffect( () => {
    localStorage.setItem('citas', JSON.stringify(citas));
  }, [citas] );

  // Función  que tome las citas actuales y agregue la nueva
  const crearCita = (cita) => {
    guardarCitas([...citas, cita]);
  };

  // Función que elimina una cita por su id
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas);
  }

  // Mensaje condicional
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus Citas';
  

  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>

      <div className='container'>
        <div className='row'>
          <div className='one-half column'>
            <Formulario crearCita={crearCita} />
          </div>
          <div className='one-half column'>
            <h2>{ titulo }</h2>
            {citas.map((cita) => (
                <Cita 
                  key={cita.id}
                  cita={cita}
                  eliminarCita={eliminarCita}
                />
              ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
