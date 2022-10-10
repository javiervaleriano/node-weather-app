const fs = require('fs');

const axios = require('axios');

class Busquedas {

  historial = [];
  dbPath = './db/database.json';

  constructor() {
    this.leerDB();
  }

  async buscarCiudades(lugar = '') {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapbox
      });

      const resp = await instance.get();

      return resp.data.features.map(({ id, place_name, center }) => ({
        id,
        nombre: place_name,
        lng: center[0],
        lat: center[1]
      }));

    } catch (error) {
      return [];
    }
  }

  async obtenerClimaLugar(lat, lon) {
    try {
      const instance = axios.create({
        baseURL: 'https://api.openweathermap.org/data/2.5/weather',
        params: { ...this.paramsWeather, lat, lon }
      });

      const { data: { weather, main } } = await instance.get();

      return {
        desc: weather[0].description,
        temp: main.temp,
        min: main.temp_min,
        max: main.temp_max
      };

    } catch (error) {
      console.log(error);
    }
  }

  agregarHistorial(lugar = '') {

    const idxLugar = this.historial.indexOf(lugar.toLocaleLowerCase());

    if (idxLugar) this.historial.splice(idxLugar, 1);

    this.historial.unshift(lugar.toLocaleLowerCase());

    this.historial = this.historial.splice(0, 5);

    this.guardarDB();

  }

  guardarDB() {

    const payload = {
      historial: this.historial
    };

    fs.writeFileSync(this.dbPath, JSON.stringify(payload));

  }

  leerDB() {

    if (!fs.existsSync(this.dbPath)) return;

    const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
    this.historial = JSON.parse(info).historial;

  }


  // GETTERS
  get paramsMapbox() {
    return {
      'limit': 5,
      'language': 'es',
      'access_token': process.env.MAPBOX_KEY
    };
  }

  get paramsWeather() {
    return {
      'appid': process.env.OPENWEATHER_KEY,
      'units': 'metric',
      'lang': 'es'
    };
  }

  get historialCapitalizado() {

    const lugaresCapitalizados = this.historial.map((lugar) => {

      let palabras = lugar.split(' ');
      palabras = palabras.map((palabra) => palabra[0].toUpperCase() + palabra.substring(1));

      return palabras.join(' ');

    });


    let salida = '';

    lugaresCapitalizados.forEach((lugar, i) => {
      const idx = `${i + 1}.`.green;
      salida += `${idx} ${lugar}${i < this.historial.length ? '\n' : ''}`;
    });

    return salida;
  }

}


module.exports = Busquedas;