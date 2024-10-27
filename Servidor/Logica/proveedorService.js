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

/********************** DEFINICIÓN DE LA LÓGICA DE LOS MÉTODOS DECLARADOS EN EL ARCHIVO .PROTO ***********************/

const productorOrdenesDeCompra = kafka.producer(); // Creo un productor

async function altaOrdenDeCompra(call, callback)
{
    // Recibo los datos
    const registro =
    {
        tienda_codigo: call.request.tienda_codigo,
        items:         call.request.items.slice() // slice() copia un arreglo
    }

    // Obtener la fecha actual
    var fechaActual = new Date();
    
    var anio = fechaActual.getFullYear();
    var mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Los meses empiezan en 0
    var dia = String(fechaActual.getDate() ).padStart(2, '0');     // padStart() rellena un string con otro hasta que alcance cierta longitud (sirve para cuando el dia o el mes es de un solo digito)
    
    var fechaFormateada = `${anio}-${mes}-${dia}`;


    // CARGA A LA BASE DE DATOS
    await conexionDataBase.query(`INSERT INTO orden_de_compra 
        SET estado = 'SOLICITADA', 
        observaciones = 'Sin observaciones', 
        fecha_de_solicitud = '${fechaFormateada}',
        tienda_codigo = '${registro.tienda_codigo}' `, {});

    
    var resultadosConsulta = await conexionDataBase.query(`SELECT MAX(id) AS id FROM orden_de_compra `, {}); 
    // Otra forma de obtener el último id: SELECT LAST_INSERT_ID()
    var IdUltimaOrdenDeCompra = resultadosConsulta[0].id;

    for (let item of registro.items) 
    {
        await conexionDataBase.query(`INSERT INTO item 
            SET producto_codigo = '${item.producto_codigo}', 
            color = '${item.color}', 
            talle = '${item.talle}', 
            cantidad_solicitada = ${item.cantidad_solicitada}, 
            id_orden_de_compra = ${IdUltimaOrdenDeCompra} `, {});
    }

 
    // CARGA AL TOPIC
    await productorOrdenesDeCompra.connect(); // El productor se conecta

    await productorOrdenesDeCompra.send({  // El productor envia uno o varios mensajes al topic indicado. Si no existe el topic, lo crea.
        topic: 'orden-de-compra',
        messages: [
          { value: JSON.stringify({ tienda_codigo: `${registro.tienda_codigo}`, idOrdenDeCompra: IdUltimaOrdenDeCompra, itemsSolicitados: registro.items, fechaSolicitud: fechaFormateada, estado: 'SOLICITADA'}) }, // Envio el mensaje en json
        ],
    });

    await productorOrdenesDeCompra.disconnect();  // El productor se desconecta
    
    console.log('***********************************************************');
    console.log(`Se hizo el alta de la orden de compra ${IdUltimaOrdenDeCompra}`);
    return callback(null, { mensaje: `Se hizo el alta de la orden de compra ${IdUltimaOrdenDeCompra}` });
}



const consumidorNovedades   = kafka.consumer({ groupId: 'consumidorNovedades' }); // Creo un consumidor. Le indico a que grupo de consumidores pertenece.
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
        
            console.log('***********************************************************');
            console.log('Hay disponible un nuevo producto: ' + codigo);
        }
    })

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

                        // En caso de que este todo bien con la orden de compra y haya stock suficiente
                        if(idDespacho !== null)
                        {
                            await conexionDataBase.query(`INSERT INTO despacho
                                SET id = ${idDespacho},
                                id_orden_de_compra = ${idOrdenDeCompra},
                                fecha_de_envio = '${fechaDeEnvio}'  `, {});
                        }
                    }

                    if(estado == 'ACEPTADA' && observaciones != 'Sin observaciones') // Si ya existe (esto es para los casos en que la orden de compras quedo pausada por falta de stock)
                    {
                        await conexionDataBase.query(`UPDATE orden_de_compra
                            SET estado = '${estado}',
                            observaciones = '${observaciones}'
                            WHERE  id = ${idOrdenDeCompra} `, {}); 
                        
                    }

                    if(estado == 'ACEPTADA' && observaciones == 'Sin observaciones')
                    {
                        await conexionDataBase.query(`UPDATE orden_de_compra
                            SET estado = '${estado}',
                            observaciones = '${observaciones}'
                            WHERE  id = ${idOrdenDeCompra} `, {}); 

                        await conexionDataBase.query(`INSERT INTO despacho
                            SET id = ${idDespacho},
                            id_orden_de_compra = ${idOrdenDeCompra},
                            fecha_de_envio = '${fechaDeEnvio}'  `, {});
                    }

                    if(estado == 'RECHAZADA')
                        {
                            await conexionDataBase.query(`UPDATE orden_de_compra
                                SET estado = '${estado}',
                                observaciones = '${observaciones}'
                                WHERE  id = ${idOrdenDeCompra} `, {});
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


async function traerOrdenesDeCompraAceptadasYConDespacho(call, callback) 
{
    try 
    {
        // Recibo los datos
        const registro =
        {
            tienda_codigo: call.request.tienda_codigo
        }

        var resultadosConsulta = await conexionDataBase.query(`SELECT (orc.id) AS id_orden_de_compra, item.producto_codigo, item.color, item.talle, item.cantidad_solicitada
            FROM orden_de_compra orc
            INNER JOIN item ON orc.id = item.id_orden_de_compra
            INNER JOIN despacho ON orc.id = despacho.id_orden_de_compra
            WHERE orc.tienda_codigo = '${registro.tienda_codigo}' `, {});

        var respuesta = [];
        for(var i = 0; i < resultadosConsulta.length; i++)
        {
            respuesta.push({
                id_orden_de_compra:  resultadosConsulta[i].id_orden_de_compra,
                producto_codigo:     resultadosConsulta[i].producto_codigo,
                color:               resultadosConsulta[i].color,
                talle:               resultadosConsulta[i].talle,
                cantidad_solicitada: resultadosConsulta[i].cantidad_solicitada,
            });
        }


        // Muestro los resultados y se los envio al cliente
        console.log('************************************************************');
        console.log('Trayendo ordenes de compra aceptadas por el proveedor y en camino hacia la tienda');
        console.log('Datos devueltos al cliente:');
        console.log(respuesta);
        return callback(null, {arregloItems: respuesta});
    }
    catch (error) 
    {
        console.error('Error en consumirSolicitudes:', error);
    }
}


const productorRecepcion = kafka.producer(); // Creo un productor

async function aceptarDespacho(call, callback) 
{
    try 
    {
        // Recibo los datos
        const registro =
        {
            id_orden_de_compra: call.request.id_orden_de_compra
        }


        // Obtener la fecha actual
        var fechaActual = new Date();
        
        var anio = fechaActual.getFullYear();
        var mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Los meses empiezan en 0
        var dia = String(fechaActual.getDate() ).padStart(2, '0');     // padStart() rellena un string con otro hasta que alcance cierta longitud (sirve para cuando el dia o el mes es de un solo digito)
        
        var fechaFormateada = `${anio}-${mes}-${dia}`;
        
        // Actualizo el estado de la orden de compra
        await conexionDataBase.query(`UPDATE orden_de_compra
            SET fecha_de_recepcion = '${fechaFormateada}',
            estado = 'RECIBIDA'
            WHERE id = ${registro.id_orden_de_compra} `, {});

        var resultadoCondigoTienda = await conexionDataBase.query(`SELECT tienda_codigo FROM orden_de_compra WHERE id =  ${registro.id_orden_de_compra}`, {});
        var resultadosItems = await conexionDataBase.query(`SELECT producto_codigo, cantidad_solicitada from item where id_orden_de_compra =  ${registro.id_orden_de_compra}`, {});
        console.log(resultadoCondigoTienda);
        console.log(resultadosItems); //hasta aca va perfecto
        for (var i = 0; i < resultadosItems.length; i++) {
            
            var stockActual = await conexionDataBase.query(`SELECT stock FROM tienda_x_producto WHERE tienda_codigo = '${resultadoCondigoTienda[0].tienda_codigo}' and producto_codigo = '${resultadosItems[i].producto_codigo}'`, {});
            var nuevoStock = stockActual[0].stock + resultadosItems[i].cantidad_solicitada;
            console.log("Stock actual: " + stockActual);
            console.log("Stock a agregar: " + resultadosItems[i].cantidad_solicitada);
            console.log("Nuevo stock: " + nuevoStock);
            await conexionDataBase.query(`
                UPDATE tienda_x_producto
                SET stock = ${nuevoStock}
                WHERE tienda_codigo = '${resultadoCondigoTienda[0].tienda_codigo}' AND producto_codigo = '${resultadosItems[i].producto_codigo}'`, {});
        }

        // Envio el mensaje al topic recepcion
        var resultadosConsulta = await conexionDataBase.query(`SELECT id FROM despacho WHERE id_orden_de_compra = ${registro.id_orden_de_compra} `, {});
        var idDespacho = resultadosConsulta[0].id;

        await productorRecepcion.connect();

        await productorRecepcion.send({ 
            topic: `recepcion`,
            messages: [
                { value: JSON.stringify({ idOrdenDeCompra: registro.id_orden_de_compra, idDespacho: idDespacho, fechaRecepcion: fechaFormateada, estado: 'RECIBIDA' }) }, 
            ],
        });

        await productorRecepcion.disconnect();

        // Muestro los resultados y se los envio al cliente
        console.log('************************************************************');
        console.log(`Orden de compra ${registro.id_orden_de_compra} recibida`);
        return callback(null, { mensaje: `Orden de compra ${registro.id_orden_de_compra} recibida` });
    }
    catch (error) 
    {
        console.error('Error en consumirSolicitudes:', error);
    }
}

async function traerOrdenesDeCompraTienda(call, callback) { 
    try {
        const registro = {
            tienda_codigo: call.request.codigo
        };
        
        const resultadosConsulta = await conexionDataBase.query(
            `SELECT OC.*, D.fecha_de_envio
            FROM ORDEN_DE_COMPRA OC
            LEFT JOIN DESPACHO D ON OC.id = D.id_orden_de_compra
            WHERE tienda_codigo = '${registro.tienda_codigo}'`, {}
        );

        const formatDate = (date) => date ? new Date(date).toLocaleString() : 'No disponible';

        var respuesta = [];
        for (var i = 0; i < resultadosConsulta.length; i++) {
            respuesta.push({
                tienda_codigo: registro.tienda_codigo,
                id_orden_de_compra: resultadosConsulta[i].id,
                estado: resultadosConsulta[i].estado,
                observaciones: resultadosConsulta[i].observaciones,
                fecha_de_solicitud: formatDate(resultadosConsulta[i].fecha_de_solicitud),
                fecha_de_recepcion: formatDate(resultadosConsulta[i].fecha_de_recepcion),
                //fecha_de_envio: formatDate(resultadosConsulta[i].fecha_de_envio) // Asegúrate de incluir esto
            });
        }

        console.log('************************************************************');
        console.log('Trayendo ordenes de compra de la tienda');
        console.log('Datos devueltos al cliente:');
        console.log(respuesta);
        return callback(null, { arregloOrdenCompra: respuesta });
        
    } catch (error) {
        console.error('Error en traerOrdenesDeCompra:', error);
        callback(error); // Maneja el error
    }
}

async function traerItems(call, callback) { 
    try {
        const registro = {
            id_orden_de_compra: call.request.id_orden_de_compra 
        };
        
        const resultadosConsulta = await conexionDataBase.query(
            `SELECT producto_codigo, color, talle, cantidad_solicitada
            FROM item
            WHERE id_orden_de_compra = '${registro.id_orden_de_compra}'`, {}
        );

        var respuesta = [];
        for (var i = 0; i < resultadosConsulta.length; i++) {
            respuesta.push({
                id_orden_de_compra: registro.id_orden_de_compra,
                producto_codigo: resultadosConsulta[i].producto_codigo,
                color: resultadosConsulta[i].color,
                talle: resultadosConsulta[i].talle,
                cantidad_solicitada: resultadosConsulta[i].cantidad_solicitada
            });
        }

        console.log('************************************************************');
        console.log('Trayendo ordenes de compra de la tienda');
        console.log('Datos devueltos al cliente:');
        console.log(respuesta);
        return callback(null, { arregloItems: respuesta });
        
    } catch (error) {
        console.error('Error en traerOrdenesDeCompra:', error);
        callback(error); // Maneja el error
    }
}

/*********************************** EXPORTACIÓN DE LA LÓGICA ***********************************/
exports.altaOrdenDeCompra   = altaOrdenDeCompra
exports.consumirNovedades   = consumirNovedades
exports.consumirSolicitudes = consumirSolicitudes
exports.traerOrdenesDeCompraAceptadasYConDespacho = traerOrdenesDeCompraAceptadasYConDespacho
exports.aceptarDespacho     = aceptarDespacho
exports.traerOrdenesDeCompraTienda = traerOrdenesDeCompraTienda
exports.traerItems = traerItems