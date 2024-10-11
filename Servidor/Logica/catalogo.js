// ESTE ARCHIVO ES UN EXPERIMENTO SOBRE EL PUNTO 3 DEL TP 3. IGNORAR HASTA QUE SEPAMOS COMO EL CLIENTE Y SERVIDOR DEL TP 3
/************************************ CONFIGURACIÓN DE LA BASE DE DATOS **********************************/
const conexionDataBase = require('./conexionDataBase.js');

/************************************ MÓDULOS USADOS  **********************************/
const PDFDocument = require('pdfkit'); // Módulo para trabajar con PDFs
const fs = require('fs');              // Módulo para trabajar con archivos

/********************** DEFINICIÓN DE LA LÓGICA DE LOS MÉTODOS DECLARADOS EN EL ARCHIVO .PROTO ***********************/

async function crearCatalogoPDF(/*call, callback*/)
{
    try
    {
        const doc = new PDFDocument(); // Creo un PDF
        const stream = fs.createWriteStream('archivoDePractica.pdf') // Indico en que archivo se va a poner todo lo que haga. Si ya existe, lo sobreescribe
        doc.pipe(stream); 

        const anchoPagina = doc.page.width;  // Define el ancho de la pagina
        const altoPagina  = doc.page.height; // Define el alto de la pagina

        var resultadosConsulta = await conexionDataBase.query(`SELECT * FROM producto`, {});
        
        // Creo el contenido del PDF
        for(var i = 0; i < resultadosConsulta.length; i++)
        {
            doc.font('Helvetica-Bold').text(`${resultadosConsulta[i].nombre}`, { align: 'center'} );
            doc.text('');

            doc.font('Helvetica').text(`Codigo: ${resultadosConsulta[i].codigo}` );
            doc.text(`Talle: ${resultadosConsulta[i].talle}` );
            doc.text(`Color: ${resultadosConsulta[i].color}` );

            //console.log(Buffer.isBuffer(resultadosConsulta[i].foto) );
            
            let bufferImagen = Buffer.from(resultadosConsulta[i].foto.toString(), 'base64'); // De la base de datos me llega un buffer y lo parseo a un string
            
            doc.image(bufferImagen, (anchoPagina/2)-150, (altoPagina/2)-150, { width: 300, height:300 } ); // Agrega una imagen al PDF            
            doc.rect( (anchoPagina/2)-150, (altoPagina/2)-150, 300, 300).stroke();                         // Agrega un rectángulo para resaltar el borde de la imagen

            if(i != resultadosConsulta.length - 1) doc.addPage(); // Añado una nueva página (solo si no es el último producto)
        }

        doc.end(); // Finaliza el pdf

        stream.on('finish', () => { // Evento que se ejecuta al terminar el stream de datos
            console.log('PDF creado');
        });

    }
    catch(error)
    {
        console.log(error);
    }
}

/*********************************** EXPORTACIÓN DE LA LÓGICA ***********************************/
exports.crearCatalogoPDF = crearCatalogoPDF
