const xmlbuilder = require('xmlbuilder');
const fs = require('fs');

// Generar WSDL dinámicamente
const wsdl = xmlbuilder.create('wsdl:definitions', { encoding: 'UTF-8' })
  .att('targetNamespace', 'http://tempuri.org/')
  .att('xmlns:s', 'http://www.w3.org/2001/XMLSchema')
  .att('xmlns:soap12', 'http://schemas.xmlsoap.org/wsdl/soap12/')
  .att('xmlns:http', 'http://schemas.xmlsoap.org/wsdl/http/')
  .att('xmlns:mime', 'http://schemas.xmlsoap.org/wsdl/mime/')
  .att('xmlns:tns', 'http://tempuri.org/')
  .att('xmlns:soap', 'http://schemas.xmlsoap.org/wsdl/soap/')
  .att('xmlns:tm', 'http://microsoft.com/wsdl/mime/textMatching/')
  .att('xmlns:soapenc', 'http://schemas.xmlsoap.org/soap/encoding/')
  .att('xmlns:wsdl', 'http://schemas.xmlsoap.org/wsdl/')
  
  // Definición de los tipos
  .com('Definicion de los tipos')
  .ele('wsdl:types')
    .ele('s:schema', { elementFormDefault: 'qualified', targetNamespace: 'http://tempuri.org/' })
      .ele('s:element', { name: 'MessageSplitterRequest' })
        .ele('s:complexType')
          .ele('s:sequence')
            .ele('s:element', { minOccurs: '1', maxOccurs: '1', name: 'message', type: 's:string' }).up()
            .ele('s:element', { minOccurs: '1', maxOccurs: '1', name: 'splitter', type: 's:string' }).up()
          .up()
        .up()
      .up()
      .ele('s:element', { name: 'MessageSplitterResponse' })
        .ele('s:complexType')
          .ele('s:sequence')
            .ele('s:element', { minOccurs: '1', maxOccurs: 'unbounded', name: 'result', type: 's:string' }).up()
          .up()
        .up()
      .up()
    .up()
  .up()

  // Definición de los mensajes
  .com('Definicion de los mensajes')
  .ele('wsdl:message', { name: 'MessageSplitterSoapIn' })
    .ele('wsdl:part', { name: 'parameters', element: 'tns:MessageSplitterRequest' }).up()
  .up()
  .ele('wsdl:message', { name: 'MessageSplitterSoapOut' })
    .ele('wsdl:part', { name: 'parameters', element: 'tns:MessageSplitterResponse' }).up()
  .up()

  // Definición de portType
  .com('Definicion de portType')
  .ele('wsdl:portType', { name: 'MessageSplitterSoapPort' })
    .ele('wsdl:operation', { name: 'MessageSplitter' })
      .ele('wsdl:documentation', "Funcion 1").up()
      .ele('wsdl:input', { message: 'tns:MessageSplitterSoapIn' }).up()
      .ele('wsdl:output', { message: 'tns:MessageSplitterSoapOut' }).up()
    .up()
  .up()

  // Definición del binding SOAP
  .com('Definicion del binding SOAP')
  .ele('wsdl:binding', { name: 'MessageSplitterServiceSoapBinding', type: 'tns:MessageSplitterSoapPort' })
    .ele('soap:binding', { transport: 'http://schemas.xmlsoap.org/soap/http' }).up()
    .ele('wsdl:operation', { name: 'MessageSplitter' })
      .ele('soap:operation', { soapAction: 'MessageSplitter', style: 'document' }).up()
      .ele('wsdl:input')
        .ele('soap:body', { use: 'literal' }).up()
      .up()
      .ele('wsdl:output')
        .ele('soap:body', { use: 'literal' }).up()
      .up()
    .up()
  .up()

  // Definición del binding SOAP 1.2
  .com('Definicion del binding SOAP 1.2')
  .ele('wsdl:binding', { name: 'MessageSplitterServiceSoap12Binding', type: 'tns:MessageSplitterSoapPort' })
    .ele('soap12:binding', { transport: 'http://schemas.xmlsoap.org/soap/http' }).up()
    .ele('wsdl:operation', { name: 'MessageSplitter' })
      .ele('soap12:operation', { soapAction: 'MessageSplitter', style: 'document' }).up()
      .ele('wsdl:input')
        .ele('soap12:body', { use: 'literal' }).up()
      .up()
      .ele('wsdl:output')
        .ele('soap12:body', { use: 'literal' }).up()
      .up()
    .up()
  .up()

  // Definición del servicio
  .com('Definicion del servicio')
  .ele('wsdl:service', { name: 'MessageSplitterService' })
    .ele('wsdl:port', { name: 'MessageSplitterServiceSoapPort', binding: 'tns:MessageSplitterServiceSoapBinding' })
      .ele('soap:address', { location: 'http://localhost:8000/wsdl' }).up()
    .up()
    .ele('wsdl:port', { name: 'MessageSplitterServiceSoap12Port', binding: 'tns:MessageSplitterServiceSoap12Binding' })
      .ele('soap12:address', { location: 'http://localhost:8000/wsdl' }).up()
    .up()
  .up()
  .end({ pretty: true });

// Guardar el WSDL generado en un archivo

fs.writeFile('service.wsdl', wsdl, (err) => {
    if (err) {
      return console.error(err);
    }
    console.log('Archivo WSDL guardado como service2.wsdl');
  });
