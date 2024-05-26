El proyecto que estuve construyendo para la entrega final consiste en renovar la idea de la última entrega que hice, mezclándola con la de la primera entrega realizada. 
Las entregas consistieron en desarrollar un sistema de logueo y de registro, y la última entrega consistió en una aplicación para poder hacer compras online.

Para ello, al ingresar a la plataforma, el index de la misma se basa en poder seleccionar productos, los cuales se mostrarán en dos listas separadas. 
Estas listas harán un filtro de una lista principal, generándose un botón "más" y un botón "menos" para cada uno de los elementos. Al pulsar el botón "más", se generará una nueva lista 
a la cual se le añadirán ítems, y al pulsar el botón "menos" se quitarán. Todo esto se realizará mediante la función reduce, generando un subtotal. 
Luego, al apretar el botón "continuar", se redirigirá a una página que pedirá loguearse.

Para ello, creé un array en el cual se almacenan en un archivo JSON algunos usuarios de prueba. En el caso de que la persona no esté registrada, se redirigirá a la página "registrarse", 
la cual pedirá los campos correspondientes y se almacenará en la session storage. Cuando se levanta el archivo JSON, se carga en una variable a la cual se le añade lo que está guardado en la memoria del navegador, 
para no tener listas con archivos duplicados. Después de registrarse, o no, se redirige a una pestaña en la cual se permite al usuario realizar el pago de forma externa, sin involucrarnos con medios de pago. 
Simplemente se hace una transferencia y se envía el comprobante de la transacción escaneando un QR que figura en la página. Al pulsar el botón "continuar", se borra el contenido del carrito de la memoria 
y el listado queda en cero para poder realizar otro pedido.

Utilicé una liberia sweetalert para mostrar en la pestaña "registrarse" y "login" los carteles correspondientes a los errores. Utilicé un try-catch para levantar el archivo; 
en caso de que haya algún error al levantar el archivo, se muestra un error por consola. Si no, se levanta el archivo y continúa.

Por último, me dediqué a través de la librería Framework Bootstrap a darle web responsive a todo el proyecto, para que se adapte a los distintos modos de pantalla, controlando todo esto mediante dos ramas paralelas de GitHub.
