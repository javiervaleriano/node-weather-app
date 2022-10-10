# App de consola: Aplicación del clima

Este proyecto es una aplicación de consola que se basa en una app del clima (Weather App) para obtener datos relacionados con la ciudad que se seleccione.

Realiza llamadas a API's para hacer las peticiones de la data y conserva un historial.

## Cómo usar

Ejecuta en tu consola o línea de comandos: `git clone https://github.com/javiervaleriano/node-weather-app.git`

Ten en cuenta que debes establecer las variables de entorno como se muestran en el archivo **example.env** para poder realizar las peticiones involucradas para el funcionamiento del proyecto. Estas variables son Tokens de acceso para el fetching de la data.

Luego, entra desde la consola a la ruta de la carpeta recién creada y ejecuta lo siguiente:

```
npm install

npm start
```

### Paquetes instalados

- [axios](https://www.npmjs.com/package/axios)
- [colors.js](https://www.npmjs.com/package/colors)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [Inquirer.js](https://www.npmjs.com/package/inquirer)
