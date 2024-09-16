/************************************ CONFIGURACIÓN DE LA BASE DE DATOS **********************************/
const conexionDataBase = require('../Servidor/Logica/conexionDataBase.js');

/************************************ FUNCIONES DE BORRADO DE DATOS **********************************/
async function borradoDatosDePrueba()
{
    console.log('Borrando datos');
    var tablasABorrar = ['usuario', 'tienda_x_producto', 'producto', 'tienda'];

    for (const tabla of tablasABorrar) {
        await conexionDataBase.query(`DELETE FROM ${tabla}`, {} );
    }

    console.log('Datos completamente borrados de la base de datos Stockearte');
}

borradoDatosDePrueba();
