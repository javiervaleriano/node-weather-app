require('dotenv').config();
const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helpers/inquirer");
const Busquedas = require('./models/busquedas');


const main = async () => {

  const busquedas = new Busquedas();
  let opt = '';

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        // Mostrar mensaje
        const termino = await leerInput('Ciudad:');

        // Buscar los lugares
        const lugares = await busquedas.buscarCiudades(termino);

        // Seleccionar el lugar
        const id = await listarLugares(lugares);

        if (id === 0) continue;

        const { nombre, lat, lng } = lugares.find((l) => l.id === id);
        busquedas.agregarHistorial(nombre);

        // Clima
        const { temp, min, max, desc } = await busquedas.obtenerClimaLugar(lat, lng);

        // Mostrar resultados
        console.clear();
        console.log('\nInformación de la ciudad\n'.green);
        console.log('Ciudad:', nombre.green);
        console.log('Latitud:', lat);
        console.log('Longitud:', lng);
        console.log('Temperatura:', temp);
        console.log('Mínima:', min);
        console.log('Máxima:', max);
        console.log('Cómo está el clima:', desc.green);
        break;

      case 2:
        console.log(busquedas.historialCapitalizado);
        break;
    }

    if (opt !== 0) await pausa();
  } while (opt !== 0);

};

main();