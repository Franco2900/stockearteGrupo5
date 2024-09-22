/*************************************** CONSIGNA ****************************************/
/*
4) Detalle: el detalle se muestra mediante alguna opción dentro de cada resultado de la búsqueda y va a 
permitir ver la información completa para modificar o eliminar dicho registro. 

A) Usuario: permite modificar todos los campos. 

B) Tiendas: permite modificar todos los campos, incluyendo asignar/desasignar productos/usuarios. 

C) Productos:  permite  modificar  stock  (solo  usuario  de  tienda).  Para  los  usuarios  de  casa  central, 
deberá poder ver el stock que tiene cada tienda, y podrá modificar los demás campos (excepto el 
código único generado en el alta).
*/

/************************************ CONFIGURACIÓN DE LA BASE DE DATOS **********************************/
const conexionDataBase = require('./conexionDataBase.js');

/********************** DEFINICIÓN DE LA LÓGICA DE LOS MÉTODOS DECLARADOS EN EL ARCHIVO .PROTO ***********************/

// PUNTO 4.A
// Modificar todos los campos de usuario
async function modificarUsuario(call, callback)
{
    console.log('************************************************************');
    console.log('Modificando datos');

    // Acá van los datos que nos llegan del cliente desde gRPC
    const registro =
    {
        usuarioAModificar: call.request.usuarioAModificar, // ESTE CAMPO ES NUEVO
        usuario:           call.request.usuario,
        password:          call.request.password,
        nombre:            call.request.nombre,
        apellido:          call.request.apellido,
        habilitado:        call.request.habilitado,
        tienda_codigo:     call.request.tienda_codigo
    }
    
    /*const registro = // DATO HARDCODEADO PARA PRUEBAS
    {
        usuarioAModificar: 'Racing Campeon',
        usuario:           'Racing Campeon',
        password:          '1967',
        nombre:            'Pepe',
        apellido:          'Argento',
        habilitado:        false, // CAMBIA ACÁ CON RESPECTO A LOS DATOS DE PRUEBA
        tienda_codigo:     'sanji32542'
    }*/

    var existeUsuarioAModificar = await conexionDataBase.chequearExistenciaUsuario(registro.usuarioAModificar);
    var existeTienda            = await conexionDataBase.chequearExistenciaTienda(registro.tienda_codigo);

    if(!existeUsuarioAModificar) return callback(null, { mensaje: `ERROR: No existe el usuario ${registro.usuarioAModificar} ` });
    if(!existeTienda)            return callback(null, { mensaje: `ERROR: No existe la tienda ${registro.tienda_codigo} ` });

    if(existeUsuarioAModificar && existeTienda)
    {
        console.log('Modificación solicitada: Modificar usuario');
        console.log('Usuario a modificar: ' + registro.usuarioAModificar);

        console.log('Datos antes de la modificación');
        var resultados = await conexionDataBase.query(
            `SELECT *
            FROM usuario
            WHERE usuario = '${registro.usuarioAModificar}' `, {}
        );
        console.log(resultados);


        console.log('Datos después de la modificación');
        await conexionDataBase.query(
            `UPDATE usuario
            SET usuario = '${registro.usuario}', password = '${registro.password}', nombre = '${registro.nombre}', apellido = '${registro.apellido}', habilitado = ${registro.habilitado}, tienda_codigo = '${registro.tienda_codigo}'
            WHERE usuario = '${registro.usuarioAModificar}' `, {}
        );
        console.log(registro);

        return callback(null, { mensaje: `Modificación del usuario ${registro.usuarioAModificar} realizada correctamente` });
    }

}


// PUNTO 4.B
// Modificar todos los campos de tienda
async function modificarTienda(call, callback)
{
    console.log('************************************************************');
    console.log('Modificando datos');

    // Acá van los datos que nos llegan del cliente desde gRPC
    const registro =
    {
        codigoTiendaAModificar: call.request.codigoTiendaAModificar, // ESTE CAMPO ES NUEVO
        codigo:                 call.request.codigo,
        direccion:              call.request.direccion,
        ciudad:                 call.request.ciudad,
        provincia:              call.request.provincia,
        habilitado:             call.request.habilitado
    }
    
    /*const registro = // DATO HARDCODEADO PARA PRUEBAS
    {
        tiendaAModificar: 'asdfgh987',
        codigo:           'asdfgh987',
        direccion:        'Juan Justo 200',
        ciudad:           'Monte Chingolo',
        provincia:        'Buenos Aires',
        habilitado:       false // CAMBIA ACÁ CON RESPECTO A LOS DATOS DE PRUEBA
    }*/

    var existeTiendaAModificar  = await conexionDataBase.chequearExistenciaTienda(registro.codigoTiendaAModificar);
    if(!existeTiendaAModificar) return callback(null, { mensaje: `ERROR: No existe la tienda ${registro.codigoTiendaAModificar}` });

    if(existeTiendaAModificar)
    {
        console.log('Modificación solicitada: Modificar tienda');
        console.log('Tienda a modificar: ' + registro.codigoTiendaAModificar);

        console.log('Datos antes de la modificación');
        var resultados = await conexionDataBase.query(
            `SELECT *
            FROM tienda
            WHERE codigo = '${registro.codigoTiendaAModificar}' `, {}
        );
        console.log(resultados);


        console.log('Datos después de la modificación');
        await conexionDataBase.query(
            `UPDATE tienda
            SET codigo = '${registro.codigo}', direccion = '${registro.direccion}', ciudad = '${registro.ciudad}', provincia = '${registro.provincia}', habilitado = ${registro.habilitado}
            WHERE codigo = '${registro.codigoTiendaAModificar}' `, {}
        );
        console.log(registro);

        return callback(null, { mensaje: `Modificación de la tienda ${registro.codigoTiendaAModificar} realizada correctamente` });
    }

}


// PUNTO 4.C
// 1° NOTA: ESTE PUNTO ESTE REPETIDO EN EL PDF. EL PUNTO 1.D TAMBIÉN PIDE MODIFICAR STOCK
// ACÁ LO HICE DE VUELTA PERO MEJORADO. LA DIFERENCIA ES QUE AHORA SI HACE LOS CHEQUEOS QUE TIENE QUE HACER

// 2° NOTA: ESTE PUNTO LO DIVIDO EN DOS FUNCIONES, UNA PARA LOS USUARIOS DE TIENDA Y OTRO PARA USUARIOS DE TIENDA CENTRAL

// Como usuario de tienda, modificar el stock de los productos de mi tienda
async function modificarStock(call, callback) {
    
    console.log('************************************************************');
    console.log('Modificando datos');

    // Acá van los datos que nos llegan del cliente desde gRPC
    const registro =
    {
        usuario:         call.request.usuario,
        stock:           call.request.stock,
        producto_codigo: call.request.producto_codigo
    }
    /*
    const registro = // DATO HARDCODEADO PARA PRUEBAS
    {
        usuario: 'Racing Campeon',
        stock:   10,
        producto_codigo: 'CB123'
    }*/

    var existeUsuario = await conexionDataBase.chequearExistenciaUsuario(registro.usuario);
    if(!existeUsuario) return callback(null, { mensaje: `ERROR: No existe el usuario ${registro.usuario} ` });


    var existeProducto = await conexionDataBase.chequearExistenciaProducto(registro.producto_codigo);
    if(!existeProducto) return callback(null, { mensaje: `ERROR: No existe el producto ${registro.producto_codigo} ` });


    var resultados = await conexionDataBase.query( // Averiguo a que tienda pertenece el usuario
        `SELECT (tienda.codigo) AS tienda_codigo
        FROM usuario
        INNER JOIN tienda 
        ON usuario.tienda_codigo = tienda.codigo
        WHERE usuario.usuario = '${registro.usuario}' AND usuario.habilitado = 1`, {}
    )
    var usuarioTiendaCodigo = resultados[0].tienda_codigo;

    resultados = await conexionDataBase.query( // Averiguo a que tiendas pertenece el producto
        `SELECT tienda_codigo
        FROM tienda_x_producto
        WHERE producto_codigo = '${registro.producto_codigo}' `, {}
    )
    
    var existenEnLaMismaTienda = false; // Averiguo si el usuario y el producto están en la misma tienda
    for(var i = 0; i < resultados.length; i++) 
    {
        if(usuarioTiendaCodigo == resultados[i].tienda_codigo) existenEnLaMismaTienda = true
    }
    if(!existenEnLaMismaTienda) return callback(null, { mensaje: `ERROR: El usuario y el producto no se encuentran en la misma tienda` });


    if(existeUsuario && existeProducto && existenEnLaMismaTienda)
    {
        console.log('Modificación solicitada: Modificar stock del producto');
        console.log('Producto a modificar: ' + registro.producto_codigo);

        console.log('Datos antes de la modificación');
        resultados = await conexionDataBase.query(
            `SELECT *
            FROM tienda_x_producto
            WHERE tienda_codigo = '${usuarioTiendaCodigo}' AND producto_codigo = '${registro.producto_codigo}' `, {}
        );
        console.log(resultados);


        await conexionDataBase.query( // Actualizo el stock
            `UPDATE tienda_x_producto
            SET stock = ${registro.stock}
            WHERE tienda_codigo = '${usuarioTiendaCodigo}' AND producto_codigo = '${registro.producto_codigo}' `, {}
        )


        console.log('Datos después de la modificación');
        resultados = await conexionDataBase.query(
            `SELECT *
            FROM tienda_x_producto
            WHERE tienda_codigo = '${usuarioTiendaCodigo}' AND producto_codigo = '${registro.producto_codigo}' `, {}
        );
        console.log(resultados);

        return callback(null, { mensaje: `Modificación del stock del producto ${registro.producto_codigo} realizada correctamente` });
    }

}

// INCOMPLETO
// Como usuario de casa cental, modificar todos los campos de cualquier producto de cualquier tienda (excepto el código)
async function modificarProducto(call, callback)
{
    console.log('************************************************************');
    console.log('Modificando datos');

    // Acá van los datos que nos llegan del cliente desde gRPC
    const registro =
    {
        codigo:             call.request.codigo,
        nombre:             call.request.nombre,
        talle:              call.request.talle,
        foto:               call.request.foto,
        color:              call.request.color
    }

    console.log('Datos después de la modificación');
    resultados = await conexionDataBase.query(
        `SELECT *
        FROM producto
        WHERE codigo = '${registro.codigo}' `, {}
    );

    await conexionDataBase.query( // Actualizo el producto
        `UPDATE producto
        SET nombre = '${registro.nombre}', talle = '${registro.talle}', foto = '${registro.foto}', color = '${registro.color}'
        WHERE codigo = '${registro.codigo}' `, {}
    )


    console.log('Datos después de la modificación');
    resultados = await conexionDataBase.query(
        `SELECT *
        FROM producto
        WHERE codigo = '${registro.codigo}' `, {}
    );
    console.log(resultados);

}


/*********************************** EXPORTACIÓN DE LA LÓGICA ***********************************/
exports.modificarUsuario = modificarUsuario
exports.modificarTienda = modificarTienda
exports.modificarStock = modificarStock
exports.modificarProducto = modificarProducto