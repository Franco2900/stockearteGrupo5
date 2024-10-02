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

            // CARGA EN LA BASE DE DATOS
            await conexionDataBase.query(
                'INSERT INTO novedades (codigo, nombre, talle, foto, color) VALUES (?, ?, ?, ?, ?)',
                [codigo, nombre, talle, foto, color]
            );
        
            console.log('Hay disponible un nuevo producto: ' + codigo);
        }
    })

}



async function traerNovedades(call, callback)
{

    try
    {
        // Recibo los datos
        const registro =
        {
            tienda_codigo: call.request.tienda_codigo
        }
    
        // Armado de la consulta
        let consultaSQL = `SELECT * FROM novedades`;

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


async function consumirSolicitudes() 
{
    try 
    {
        var tiendas = [];
        var consultaTiendas = await conexionDataBase.query(`SELECT codigo FROM tienda`, {});

        for(var i = 0; i < consultaTiendas.length; i++)
        {
            tiendas.push({
                codigo: consultaTiendas[i].codigo, 
            });
        }

        for (const tienda of tiendas) 
        {
            const consumidor = kafka.consumer({ groupId: `consumidorSolicitudes-${tienda.codigo}` });

            await consumidor.connect();
            await consumidor.subscribe({ topic: `${tienda.codigo}-solicitudes`, fromBeginning: false });
            
            consumidor.run({
                eachMessage: async ({ topic, partition, message }) => {

                    // OBTENCIÓN DE DATOS
                    var mensajeParseado = JSON.parse(message.value.toString());

                    //console.log(mensajeParseado); // DEBUG

                    var idOrdenDeCompra = mensajeParseado.idOrdenDeCompra;
                    var estado          = mensajeParseado.estado;
                    var observaciones   = mensajeParseado.observaciones;
                    var fechaSolicitud  = mensajeParseado.fechaSolicitud;
                    var tienda_codigo   = mensajeParseado.tienda_codigo;
                    var items           = mensajeParseado.itemsSolicitados.slice();
                    
                    // Estas variables pueden estar o no en el mensaje
                    var idDespacho   = mensajeParseado.idDespacho ? mensajeParseado.idDespacho : null;
                    var fechaDeEnvio = mensajeParseado.fechaDeEnvio ? mensajeParseado.fechaDeEnvio : null;

                    // GUARDADO EN LA BASE DE DATOS
                    var consultaExisteOrdenDeCompra = await conexionDataBase.query(`SELECT id FROM orden_de_compra WHERE id = ${idOrdenDeCompra} `, {});

                    if(consultaExisteOrdenDeCompra.length === 0 || !consultaExisteOrdenDeCompra[0].id) // Si no existe la orden de compra
                    {
                        await conexionDataBase.query(`INSERT INTO orden_de_compra
                            SET id = ${idOrdenDeCompra},
                            estado = '${estado}',
                            observaciones = '${observaciones}',
                            fecha_de_solicitud = '${fechaSolicitud}',
                            tienda_codigo = '${tienda_codigo}' `, {});

                        for (let item of items) 
                        {
                            await conexionDataBase.query(`INSERT INTO item 
                                SET producto_codigo = '${item.producto_codigo}', 
                                color = '${item.color}', 
                                talle = '${item.talle}', 
                                cantidad_solicitada = ${item.cantidad_solicitada}, 
                                id_orden_de_compra = ${idOrdenDeCompra} `, {});
                        }
                    }
                    else // Si ya existe (esto es para los casos en que la orden de compras quedo pausada por falta de stock)
                    {
                        await conexionDataBase.query(`UPDATE orden_de_compra
                            SET estado = '${estado}',
                            observaciones = '${observaciones}', 
                            fecha_de_recepcion = '${new Date().toISOString().split('T')[0]}' `, {}); // Fecha de hoy con formato YYYY-MM-DD

                        
                        await conexionDataBase.query(`INSERT INTO despacho
                            SET id = ${idDespacho},
                            id_orden_de_compra = ${idOrdenDeCompra},
                            fecha_de_envio = '${fechaDeEnvio}'  `, {});
                        
                    }
                    
                    console.log('***********************************************************');
                    console.log(`La orden de compra ${idOrdenDeCompra} fue ${estado}`);
                    // Muestro una respuesta diferente según el estado de la orden de compra
                    if(observaciones != 'Sin observaciones') console.log(observaciones);
                    else                                     console.log('La fecha de llegada de la orden de compra es: ' + fechaDeEnvio);
                }
            });

        }

    }
    catch (error) 
    {
        console.error('Error en consumirSolicitudes:', error);
    }
}


/*********************************** EXPORTACIÓN DE LA LÓGICA ***********************************/
exports.consumirNovedades   = consumirNovedades
exports.traerNovedades      = traerNovedades
exports.consumirSolicitudes = consumirSolicitudes