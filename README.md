# Instrucciones de Instalación

Descargar y despúes correr en consola: npm install

Las versiones usadas fueron las siguentes.

Node: V10.15.0.
NPM: V6.4.1
Typescript: V3.5.3
Angular CLI: V8.2.2
Ionic: V5.2.5
Cordova: V9.0.0

Adicional se usaron programas como:
- Postman.
- Android Studio.
- Visual Studio Code. 
- Sass como preprocesador de Estilos.

# Explicación del Código
Se crearon tres "pages" en Ionic.
  - Intro: Página de introducción con un único botón que solo cumple la función de avanzar a la página de registro. En esta página se              creo maquetación sencilla con un ion-content y un ion-grid que contiene un H1. También se incluyo un botón un un (click) que            activa función de redirect a la página de registro.En el archivo Ts solo se importa el Módulo de Router y se inyecta en el              constructor para que nos corra el router.navigate.
  
  - Register: Para la página de Registro se importan los ReactiveForms y el Router. En el HTML se crea la maquetación donde resalta el                 FORM con su ngSubmit a una función y el identificador de este mismo. Se crea cada campo con ngModel y el                                 FormControlName.En el TS a grandes rasgos se crean las validaciones de formulario. Luego valido los campos con un if y el Valid del formulario, si no estan completos no se puede avanzar. Luego con un Else If valido si el campo de Fecha de Nacimiento cumple con la                     condición de que deber ser mayor de 18 años. Si estas dos condiciones se cumples llamo con un GET la información de la base                 de datos y comparo el ID del usuario con los ID's registrado. Si alguno coincide el ciclo se detiene. Si el usuario ya esta                 registrado se muestra un mensaje que lo informa y no se puede avanzar. Si el usuario efectivamente es nuevo, se hace un redirect al HOME y se hace un reset del formulario. 
  
  - Home: El Home como componente tiene una maquetación básica con un botón de salir que llama un Toast el cual da inicio a una función de retornar a la página de Intro. En el ngOnInit tomamos del registro el id de Firebase y llamamos el nombre del usario.Lo mostramos en el header. En el constructor inicializamos en primera instancia el mensaje de que el usuario se registro con exito.
  
Se centralizaron los servicios en un solo archivo:
  - Services: En el archivo service.ts centralizamos las peticiones. registerUser() para hacer el post y registrar el usuario. getUsers() llama con un get todos los usuarios y con estos se compara para ver si se encuentra registrado. getUser() llama con un get y un query al la url al id de firebase que trae unicamente los datos del usuario registrado. Para el get de todos los usuario más abajo existe una función que me transforma la información en un arreglo para poderlo manejar.
  
  
 Para el manejo de información de creo un Modelo de Datos:
 - Models: En el archivo Models creamos una clase que instacia cada valor con su tipo de dato. En este caso todos son un String. Este modelo lo igualamos y lo vamos llenando a medida que el usuario realiza acciones. 
  
# Alertas

Para las alertas todo se manejo a través de los ToastControllers.

  
