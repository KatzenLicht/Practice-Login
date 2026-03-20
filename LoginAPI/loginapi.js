const http = require("node:http");
const puerto = 3000;

// Usuario
var usuario_nombre = "Julian";
var usuario_contrasena = "1235";
var usuarion_frase = "katzenlicht"

const server = http.createServer((request, response) => {

    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

    const authHeader = request.headers['authorization'];

    switch(request.method){
        case "GET":
            
        break;
        case "POST":
            request.on("data", info => {
                console.log(info.toString());
                const objeto_login = JSON.parse(info);

                if(objeto_login.nombre == usuario_nombre && objeto_login.contrasena == usuario_contrasena){
                    response.statusCode = 200;
                    response.setHeader("Content-Type", "application/json");
                    response.end(JSON.stringify({mensaje: "Iniciaste sesion correctamente"}));
                }
                else{
                    response.statusCode = 401;
                    response.setHeader("Content-Type", "application/json");
                    response.end(JSON.stringify({mensaje: "Usuario y/o contraseña incorrectos"}));
                }
            })
        break;
        case "PUT":
            
        break;
        case "OPTIONS":
            response.writeHead(204);
            response.end();
        break;
    }

    /*
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");
    response.end();
    */
});

server.listen(puerto, () =>{
    console.log("Servidor a la escucha en http://localhost:" + puerto);
});