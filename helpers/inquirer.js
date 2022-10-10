const inquirer = require('inquirer');
require('colors');

const preguntas = [
  {
    type: 'list',
    name: 'opcion',
    message: '¿Qué desea hacer?',
    choices: [
      {
        name: `${'1.'.green} Buscar ciudad`,
        value: 1,
        short: 'Buscar ciudad'
      },
      {
        name: `${'2.'.green} Ver historial`,
        value: 2,
        short: 'Ver historial',
      },
      {
        name: `${'0.'.green} Salir`,
        value: 0,
        short: 'Salir'
      }
    ]
  }
];

const inquirerMenu = async () => {
  console.clear();
  console.log('========================='.green);
  console.log('  Seleccione una opción  '.white);
  console.log('=========================\n'.green);

  const { opcion } = await inquirer.prompt(preguntas);

  return opcion;
};

const pausa = async () => {
  console.log('\n');

  await inquirer.prompt({
    type: 'input',
    name: 'enter',
    message: `Presione ${'ENTER'.green} para continuar`
  });
};

const leerInput = async (message) => {

  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.trim().length === 0) {
          return 'Por favor, ingrese un valor';
        }

        return true;
      }
    }
  ];

  const { desc } = await inquirer.prompt(question);

  return desc;
};

const listarLugares = async (lugares = []) => {

  const choices = lugares.map(({ id, nombre }, i) => ({
    value: id,
    name: `${(i + 1 + '.').green} ${nombre}`
  })),
    question = [
      {
        type: 'list',
        name: 'id',
        message: 'Seleccione un lugar:',
        choices
      }
    ];

  choices.unshift({
    value: 0,
    name: '0.'.green + ' Cancelar'
  });

  const { id } = await inquirer.prompt(question);
  return id;

};

const confirmar = async (message) => {

  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;

};

const listadoChecklist = async (tareas = []) => {

  const choices = tareas.map(({ id, desc, completadoEn }, i) => ({
    value: id,
    name: `${(i + 1 + '.').green} ${desc}`,
    checked: completadoEn ? true : false
  })),
    question = [
      {
        type: 'checkbox',
        name: 'ids',
        message: 'Seleccione',
        choices
      }
    ];

  const { ids } = await inquirer.prompt(question);
  return ids;

};


module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listarLugares,
  confirmar,
  listadoChecklist
};