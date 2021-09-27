// Importar librería PG para manejar la base de datos de Postgres
const { Client } = require("pg");

// Importar librería DOTENV para leer variables de ambiente para configurar la base de datos
const dotenv = require("dotenv").config()

// Variables de configuración de base de datos 
const config = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
}

const argumentos = process.argv.slice(2);

const client = new Client(config);  //Creación del cliente de la base de datos

client.connect()  // COnexión a la base de datos


function consultaSQL(sqlQuery) {
    return new Promise((resolve, reject) => {
        client.query(sqlQuery, (err, res) => {
            if(err) {
                reject(err);
            }
            resolve(res);
        });
    });
}

async function executeSQL(querySQL) {
    try {
        const r = await consultaSQL(querySQL);
        // console.log("r - - - - - -");
        // console.log(r);
        return r;
    } 
    catch (error) {
        console.log(error);
        r = {   "rowCount": 0,
                "errorMessage": error.message };
        return r
    }
    finally {
        client.end();
    }
}

let sqlExpression = "";

switch (argumentos[0].toUpperCase()) {
    case "CONSULTA" :
        console.log("Opción seleccionada: consulta");
        executeSQL("select * from estudiantes;")
        .then( (data) => console.log((data.rows)));
        break;

    case "NUEVO" :
        console.log("Opción seleccionada: nuevo");
        sqlExpression = `insert into estudiantes (Nombre, rut, curso, nivel) `;
        sqlExpression +=` values ('${argumentos[1]}', '${argumentos[2]}', '${argumentos[3]}', ${argumentos[4]})`
        executeSQL(sqlExpression)
        .then ( (data) => {
            if (data.rowCount === 1) { 
                console.log(`Estudiante ${argumentos[1]} agregado con éxito`);
            }
            else{
                throw `No se pudo agregar estudiante ( ${data.errorMessage})`;
            }
        })
        .catch ( (error) => {
            console.log(error);
        });
        break;
    
    case "EDITAR" :
        console.log("Opción seleccionada: editar por rut");
        sqlExpression  = `update estudiantes `;
        sqlExpression += `set nombre = '${argumentos[1]}', curso = '${argumentos[3]}', nivel = '${argumentos[4]}' `
        sqlExpression += `where rut = '${argumentos[2]}'`
        executeSQL(sqlExpression)
        .then ( (data) => {
            if (data.rowCount === 1) {
                console.log(`Estudiante ${argumentos[1]} actualizado exitosamente`);
            }
            else {
                throw `Estudiante no existe en la base de datos`
            }
        })
        .catch ( (error) => {
            console.log(error);
        });
        break;

    case "RUT" :
        console.log("Opción seleccionada: consulta por rut");
        executeSQL(`select * from estudiantes where rut = '${argumentos[1]}'`)
        .then ( (data) => {
            if (data.rowCount === 1) {
                console.log(data.rows);
            }
            else {
                throw `Estudiante no existe en la base de datos`
            }
        })
        .catch ( (error) => {
            console.log(error);
        });
        break;

    case "ELIMINAR" :
        console.log("Opción seleccionada: Eliminar");
        sqlExpression = `delete from estudiantes where rut = '${argumentos[1]}'`;
        executeSQL(sqlExpression)
        .then ( (data) => {
            if (data.rowCount === 1) {
                console.log(`Estudiante ${argumentos[1]} eliminado con éxito`);
                client.end();
            }
            else {
                throw `Estudiante no existe en la base de datos`
            }
        })
        .catch ( (error) => {
            console.log(error);
        });
        break;

    case "HELP" || "?" :
        console.log("Always Musica 1.0");
        console.log("Sistema básico de manejo de datos en la base de datos");
        console.log("");
        console.log("Posibles opciones:");
        console.log("  - CONSULTA :  Muestra todos los estudiantes inscritos" );
        console.log("  - RUT rut :  Muestra la información de un estudiante según su rut");
        console.log("  - NUEVO nombre rut curso nivel :  Permite agregar un nuevo estudiante a la base de datos");
        console.log("  - EDITAR nombre rut curso nivel : Actualiza la información de un estudiante según su rut");
        console.log("  - ELIMINAR rut :  Elimina un estudiate de la base de datos según su rut");
        console.log("  - HELP/? : Muestra esta ayuda");
        console.log("");
        console.log("");

        client.end();

        break;

}



