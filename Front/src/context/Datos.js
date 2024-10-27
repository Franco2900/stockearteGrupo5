// Datos.js


const usuarios =[{"id":"1","usuario":"eschohier0","password":"AAAA","nombre":"Emalee","apellido":"Schohier","habilitado":false,"tienda_codigo":"asdfgh987"},
  {"id":"2","usuario":"jwheatcroft1","password":"AAAA","nombre":"Julie","apellido":"Wheatcroft","habilitado":true,"tienda_codigo":"asdfgh987"},
  {"id":"3","usuario":"vsmallbone2","password":"AAAA","nombre":"Veronike","apellido":"Smallbone","habilitado":true,"tienda_codigo":"asdfgh987"},
  {"id":"4","usuario":"cmoynham3","password":"AAAA","nombre":"Catriona","apellido":"Moynham","habilitado":true,"tienda_codigo":"asdfgh987"},
  {"id":"5","usuario":"hyerson4","password":"AAAA","nombre":"Humfrey","apellido":"Yerson","habilitado":true,"tienda_codigo":"asdfgh987"},
  {"id":"6","usuario":"arothera5","password":"AAAA","nombre":"Aurora","apellido":"Rothera","habilitado":false,"tienda_codigo":"asdfgh987"},
  {"id":"7","usuario":"daizikov6","password":"AAAA","nombre":"Daniela","apellido":"Aizikov","habilitado":true,"tienda_codigo":"asdfgh987"},
  {"id":"8","usuario":"fmadle7","password":"AAAA","nombre":"Felita","apellido":"Madle","habilitado":true,"tienda_codigo":"asdfgh987"},
  {"id":"9","usuario":"eduxbarry8","password":"AAAA","nombre":"Elisabeth","apellido":"Duxbarry","habilitado":true,"tienda_codigo":"asdfgh987"},
  {"id":"10","usuario":"masif9","password":"AAAA","nombre":"Muffin","apellido":"Asif","habilitado":true,"tienda_codigo":"asdfgh987"},
  {"id":"11","usuario":"larstalla","password":"AAAA","nombre":"Lauren","apellido":"Arstall","habilitado":false,"tienda_codigo":"pqr789xyz"},
  {"id":"12","usuario":"ylearyb","password":"AAAA","nombre":"Yoshi","apellido":"Leary","habilitado":false,"tienda_codigo":"pqr789xyz"},
  {"id":"13","usuario":"bspringc","password":"AAAA","nombre":"Brendin","apellido":"Spring","habilitado":false,"tienda_codigo":"pqr789xyz"},
  {"id":"14","usuario":"dlockwoodd","password":"AAAA","nombre":"Donella","apellido":"Lockwood","habilitado":false,"tienda_codigo":"pqr789xyz"},
  {"id":"15","usuario":"alarticee","password":"AAAA","nombre":"Andeee","apellido":"Lartice","habilitado":true,"tienda_codigo":"pqr789xyz"},
  {"id":"16","usuario":"rgalbrethf","password":"AAAA","nombre":"Retha","apellido":"Galbreth","habilitado":false,"tienda_codigo":"pqr789xyz"},
  {"id":"17","usuario":"bsucreg","password":"AAAA","nombre":"Brandon","apellido":"Sucre","habilitado":true,"tienda_codigo":"pqr789xyz"},
  {"id":"18","usuario":"phaylandh","password":"AAAA","nombre":"Price","apellido":"Hayland","habilitado":true,"tienda_codigo":"pqr789xyz"},
  {"id":"19","usuario":"jwaterdrinkeri","password":"AAAA","nombre":"Jennette","apellido":"Waterdrinker","habilitado":false,"tienda_codigo":"pqr789xyz"},
  {"id":"20","usuario":"cpollockj","password":"AAAA","nombre":"Colman","apellido":"Pollock","habilitado":false,"tienda_codigo":"pqr789xyz"},
  {"id":"21","usuario":"dfreddik","password":"AAAA","nombre":"Daniella","apellido":"Freddi","habilitado":false,"tienda_codigo":"wxyz123abc"},
  {"id":"22","usuario":"lwraggsl","password":"AAAA","nombre":"Lucinda","apellido":"Wraggs","habilitado":true,"tienda_codigo":"wxyz123abc"},
  {"id":"23","usuario":"kmalliam","password":"AAAA","nombre":"Katherina","apellido":"Mallia","habilitado":false,"tienda_codigo":"wxyz123abc"},
  {"id":"24","usuario":"bsalternn","password":"AAAA","nombre":"Bernhard","apellido":"Saltern","habilitado":true,"tienda_codigo":"wxyz123abc"},
  {"id":"25","usuario":"cdownso","password":"AAAA","nombre":"Carlo","apellido":"Downs","habilitado":true,"tienda_codigo":"wxyz123abc"},
  {"id":"26","usuario":"owakefordp","password":"AAAA","nombre":"Ozzy","apellido":"Wakeford","habilitado":true,"tienda_codigo":"wxyz123abc"},
  {"id":"27","usuario":"jbartolq","password":"AAAA","nombre":"Joannes","apellido":"Bartol","habilitado":true,"tienda_codigo":"wxyz123abc"},
  {"id":"28","usuario":"ejealousr","password":"AAAA","nombre":"Earvin","apellido":"Jealous","habilitado":true,"tienda_codigo":"wxyz123abc"},
  {"id":"29","usuario":"vedesss","password":"AAAA","nombre":"Valdemar","apellido":"Edess","habilitado":true,"tienda_codigo":"wxyz123abc"},
  {"id":"30","usuario":"mduchant","password":"AAAA","nombre":"Mirna","apellido":"Duchan","habilitado":true,"tienda_codigo":"wxyz123abc"}]
;

const tiendas = [{"codigo":"asdfgh987","direccion":"18568 Dexter Crossing","ciudad":"Vidzy","provincia":"Bs.Ass","habilitado":false,"central":true},
  {"codigo":"pqr789xyz","direccion":"84037 Sachs Center","ciudad":"Pakkat","provincia":"Salta","habilitado":false,"central":true},
  {"codigo":"wxyz123abc","direccion":"6 Spohn Street","ciudad":"Dobrošte","provincia":"Jujuy","habilitado":false,"central":false}];

const productos = [{"tienda_codigo":"wxyz123abc","codigo":"1","nombre":"Short","talle":"3XL","color":"Indigo","stock":19,"foto":"google.pl"},
  {"tienda_codigo":"pqr789xyz","codigo":"1","nombre":"Short","talle":"M","color":"Aquamarine","stock":12,"foto":"google.co.uk"},
  {"tienda_codigo":"pqr789xyz","codigo":"1","nombre":"Short","talle":"M","color":"Puce","stock":21,"foto":"examiner.com"},
  {"tienda_codigo":"asdfgh987","codigo":"1","nombre":"Short","talle":"XL","color":"Yellow","stock":37,"foto":"people.com.cn"},
  {"tienda_codigo":"wxyz123abc","codigo":"1","nombre":"Short","talle":"XL","color":"Mauv","stock":32,"foto":"theglobeandmail.com"},
  {"tienda_codigo":"wxyz123abc","codigo":"1","nombre":"Short","talle":"L","color":"Pink","stock":3,"foto":"cnn.com"},
  {"tienda_codigo":"wxyz123abc","codigo":"1","nombre":"Short","talle":"XS","color":"Mauv","stock":11,"foto":"utexas.edu"},
  {"tienda_codigo":"wxyz123abc","codigo":"1","nombre":"Short","talle":"M","color":"Fuscia","stock":4,"foto":"1und1.de"},
  {"tienda_codigo":"wxyz123abc","codigo":"1","nombre":"Short","talle":"XL","color":"Indigo","stock":14,"foto":"com.com"},
  {"tienda_codigo":"asdfgh987","codigo":"1","nombre":"Pantalon","talle":"2XL","color":"Teal","stock":1,"foto":"51.la"},
  {"tienda_codigo":"pqr789xyz","codigo":"2","nombre":"Pantalon","talle":"XS","color":"Green","stock":16,"foto":"taobao.com"},
  {"tienda_codigo":"pqr789xyz","codigo":"2","nombre":"Pantalon","talle":"S","color":"Pink","stock":32,"foto":"ocn.ne.jp"},
  {"tienda_codigo":"pqr789xyz","codigo":"2","nombre":"Pantalon","talle":"XS","color":"Maroon","stock":36,"foto":"jimdo.com"},
  {"tienda_codigo":"wxyz123abc","codigo":"2","nombre":"Pantalon","talle":"XS","color":"Yellow","stock":9,"foto":"soup.io"},
  {"tienda_codigo":"pqr789xyz","codigo":"2","nombre":"Pantalon","talle":"M","color":"Green","stock":26,"foto":"com.com"},
  {"tienda_codigo":"asdfgh987","codigo":"2","nombre":"Pantalon","talle":"XL","color":"Purple","stock":33,"foto":"histats.com"},
  {"tienda_codigo":"asdfgh987","codigo":"2","nombre":"Pantalon","talle":"2XL","color":"Mauv","stock":20,"foto":"goo.ne.jp"},
  {"tienda_codigo":"pqr789xyz","codigo":"2","nombre":"Pantalon","talle":"M","color":"Maroon","stock":5,"foto":"scientificamerican.com"},
  {"tienda_codigo":"wxyz123abc","codigo":"2","nombre":"Pantalon","talle":"XL","color":"Orange","stock":34,"foto":"gizmodo.com"},
  {"tienda_codigo":"asdfgh987","codigo":"2","nombre":"Remera","talle":"L","color":"Blue","stock":8,"foto":"1688.com"},
  {"tienda_codigo":"wxyz123abc","codigo":"3","nombre":"Remera","talle":"S","color":"Blue","stock":9,"foto":"addthis.com"},
  {"tienda_codigo":"wxyz123abc","codigo":"3","nombre":"Remera","talle":"XL","color":"Khaki","stock":25,"foto":"narod.ru"},
  {"tienda_codigo":"wxyz123abc","codigo":"3","nombre":"Remera","talle":"M","color":"Green","stock":14,"foto":"elpais.com"},
  {"tienda_codigo":"pqr789xyz","codigo":"3","nombre":"Remera","talle":"3XL","color":"Pink","stock":22,"foto":"ucoz.com"},
  {"tienda_codigo":"wxyz123abc","codigo":"3","nombre":"Remera","talle":"2XL","color":"Indigo","stock":5,"foto":"google.es"},
  {"tienda_codigo":"pqr789xyz","codigo":"3","nombre":"Remera","talle":"L","color":"Teal","stock":12,"foto":"usatoday.com"},
  {"tienda_codigo":"asdfgh987","codigo":"3","nombre":"Remera","talle":"XS","color":"Green","stock":28,"foto":"netscape.com"},
  {"tienda_codigo":"asdfgh987","codigo":"3","nombre":"Remera","talle":"2XL","color":"Turquoise","stock":27,"foto":"guardian.co.uk"},
  {"tienda_codigo":"asdfgh987","codigo":"3","nombre":"Remera","talle":"XL","color":"Yellow","stock":30,"foto":"stanford.edu"},
  {"tienda_codigo":"pqr789xyz","codigo":"3","nombre":"Remera","talle":"L","color":"Mauv","stock":4,"foto":"usatoday.com"}];

  const ordenes=[
    {"tienda_codigo": "ASDF", "id": "1", "estado": "SOLICITADA", "observaciones": "Esperando confirmación", "orden_de_despacho": "OD-001", "fecha_de_solicitud": "2024-10-20", "fecha_de_recepcion": ""},
    {"tienda_codigo": "ASDF", "id": "2", "estado": "RECHAZADA", "observaciones": "No se cumplen requisitos", "orden_de_despacho": "OD-002", "fecha_de_solicitud": "2024-10-22", "fecha_de_recepcion": ""},
    {"tienda_codigo": "ASDF", "id": "3", "estado": "ACEPTADA", "observaciones": "Todo correcto", "orden_de_despacho": "OD-003", "fecha_de_solicitud": "2024-10-24", "fecha_de_recepcion": "2024-10-25"},
    {"tienda_codigo": "ASDF", "id": "4", "estado": "RECIBIDA", "observaciones": "Mercadería recibida con éxito", "orden_de_despacho": "OD-004", "fecha_de_solicitud": "2024-10-26", "fecha_de_recepcion": "2024-10-27"},
    {"tienda_codigo": "ASDF", "id": "5", "estado": "SOLICITADA", "observaciones": "Esperando respuesta", "orden_de_despacho": "OD-005", "fecha_de_solicitud": "2024-10-28", "fecha_de_recepcion": ""}
    ];
  
  export { usuarios, tiendas, productos, ordenes };