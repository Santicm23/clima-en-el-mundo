
import inquirer from 'inquirer'

import 'colors'

export const inquirerMenu = async() => {
    console.clear();
    console.log('======================='.green);
    console.log(' Seleccione una opcion '.bold);
    console.log('=======================\n'.green);
    
    const { opt } = await inquirer.prompt([
        {
            type: 'list',
            name: 'opt',
            message: '¿Qué desea hacer?',
            choices: [
                {value: 1, name: '1. '.green + 'Buscar una ubicación'},
                {value: 2, name: '2. '.green + 'Historial'},
                {value: 0, name: '0. '.green + 'Salir'}
            ]
        }
    ]);

    return opt;
}

export const pause = async() =>{
    console.log();
    await inquirer.prompt([{
            type: 'input',
            name: 'continuar',
            message: 'Presione'+' ENTER '.green + 'para continuar'
        }
    ]);
}

export const selectObject = async(message, objects=[]) => {
    console.log();
    const { id } = await inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message,
            choices: [{value: null, name: '0.'.green + ' Cancelar'}].concat(
                objects.map((object, index) => {
                    return {value: object.id, name: `${index+1}. `.green + object.toString()}
                })
            )
        }
    ]);
    return id;
}

export const seleccionarMultiplesTareas = async(message, tareas=[]) =>{
    console.log();
    const { ids } = await inquirer.prompt([
        {
            type: 'checkbox',
            name: 'ids',
            message,
            choices: tareas.map((value, index) => {
                return {value: value.id, name: `${index+1}. `.green + value.toString(), checked: value.completada}
            })
        }
    ]);
    return ids;
}

export const confirmar = async(message) => {
    console.log();
    const { ok } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]);
    return ok;
} 

export const readInput = async(message) => {
    console.log();
    const { input } = await inquirer.prompt([{
            type: 'input',
            name: 'input',
            message,
            validate(value){
                return (value.strip.length === 0) ? 'Debe ingresar un valor' : true;
            }
        }
    ]);
    return input;
}