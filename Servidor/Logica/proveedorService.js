/************************************ CONFIGURACIÓN DE LA BASE DE DATOS **********************************/
const conexionDataBase = require('./conexionDataBase.js');

/************************************ CONFIGURACIÓN DE APACHE KAFKA **********************************/
process.env.KAFKAJS_NO_PARTITIONER_WARNING = '1'; // Para que no muestre el mensaje de advertencia. 
// Esto se debe a un cambio en la versión 2.0.0 de KafkaJS. En esta versión, el particionador predeterminado ha sido cambiado. 
// Anteriormente, se utilizaba el LegacyPartitioner, pero ahora se usa el DefaultPartitioner

const { Kafka, logLevel } = require('kafkajs');

const kafka = new Kafka({ // Conexión con kafka
    clientId: 'my-app',
    brokers: ['localhost:9092'],
    logLevel: logLevel.ERROR // Para que kafka solo tire mensajes de tipo ERROR. Los otros tipos de mensajes como INFO no los muestra
})

const consumidorNovedades   = kafka.consumer({ groupId: 'consumidorNovedades' }); // Creo un consumidor. Le indico a que grupo de consumidores pertenece.
//const consumidorSolicitudes = kafka.consumer({ groupId: 'consumidorSolicitudes' });
/********************** DEFINICIÓN DE LA LÓGICA DE LOS MÉTODOS DECLARADOS EN EL ARCHIVO .PROTO ***********************/
let hayUnConsumidorCorriendo = false;


async function consumirNovedades() 
{
    // MEDIDA DE SEGURIDAD PARA ASEGURARME DE QUE SOLO HAYA UN CONSUMIDOR
    if (hayUnConsumidorCorriendo) {
        console.log("El consumidor ya está corriendo");
        return;
    }

    hayUnConsumidorCorriendo = true;

    await consumidorNovedades.connect();  // El consumidor se conecta
    await consumidorNovedades.subscribe({ topic: 'novedades', fromBeginning: false }); // El consumidor se suscribe al topic y se queda esperando por mensajes nuevos. Si no existe el topic, lo crea.

    await consumidorNovedades.run({
        eachMessage: async ({ topic, partition, message }) => { // Indica que acción debe hacer el consumidor para cada mensaje que le llegue al topic
        
            // OBTENCIÓN DE DATOS
            var mensajeParseado = JSON.parse(message.value.toString() ); // Parseo el string JSON que viene del topic
        
            var codigo = mensajeParseado.codigo;
            var nombre = mensajeParseado.nombre;
            var talle  = mensajeParseado.talle;
            var foto   = mensajeParseado.foto;
            var color  = mensajeParseado.color;

            // Todos los productos que llegan del topic "novedades" se guardan en la tabla "producto" ya que allí 
            // se guardan todos los productos independientemente de si la tienda los vende o no
            await conexionDataBase.query(
                'INSERT INTO producto (codigo, nombre, talle, foto, color) VALUES (?, ?, ?, ?, ?)',
                [codigo, nombre, talle, foto, color]
            );
        
            console.log('Hay disponible un nuevo producto: ' + codigo);
        }
    })

}



async function traerNovedades(call, callback)
{
// Para mostrar los nuevos productos hago una consulta SQL a la tabla "tienda_x_producto" y se devuelven todos
// los productos que no tenga la tienda

    try
    {
        // Recibo los datos
        const registro =
        {
            tienda_codigo: call.request.tienda_codigo
        }
    
        // Armado de la consulta
        let consultaSQL = `SELECT * FROM producto
        WHERE codigo NOT IN (
            SELECT producto_codigo FROM tienda_x_producto WHERE tienda_codigo = '${registro.tienda_codigo}'
        ) `;

        // Se realiza la consulta
        var resultadosConsulta = await conexionDataBase.query(consultaSQL, {});

        var respuesta = [];
        for(var i = 0; i < resultadosConsulta.length; i++)
        {
            respuesta.push({
                codigo:        resultadosConsulta[i].codigo, 
                nombre:        resultadosConsulta[i].nombre, 
                talle:         resultadosConsulta[i].talle, 
                foto:          resultadosConsulta[i].foto, 
                color:         resultadosConsulta[i].color,
            });
        }


        // Muestro los resultados y se los envio al cliente
        console.log('************************************************************');
        console.log('Trayendo novedades');
        console.log('Datos devueltos al cliente:');
        console.log(respuesta);
        return callback(null, {arregloProductos: respuesta});

    } 
    catch(error) 
    {
        console.log(error);
        return callback(error);
    }

}



/*********************************** EXPORTACIÓN DE LA LÓGICA ***********************************/
exports.consumirNovedades = consumirNovedades
exports.traerNovedades    = traerNovedades