const http = require("node:http");
const jwt = require("jsonwebtoken")
const puerto = 3000;

// Usuario
var usuario_nombre = "Julian";
var usuario_contrasena = "1235";
var usuarion_frase = "katzenlicht"

const llave_secreta_para_firmar_jwt = "qazwsxedcrfvtgbyhnujmikolp1973486250";

const server = http.createServer((request, response) => {

    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    response.setHeader("Access-Control-Allow-Headers", "*");

    const authHeader = request.headers['authorization'];

    switch(request.method){
        case "GET":
            const authHeader = request.headers["authorization"];

            if(!authHeader || !authHeader == null || authHeader == "null"){
                response.statusCode = 401;
                response.setHeader("Content-Type", "application/json");
                response.end(JSON.stringify({
                    mensaje: "Token no proporcionado"
                }));
            return;
            }

            jwt.verify(authHeader, llave_secreta_para_firmar_jwt, (err, decoded) => {
                if(err){
                    response.statusCode = 401;
                    response.setHeader("Content-Type", "application/json");
                    response.end(JSON.stringify({
                        mensaje: "Token invalido o expirado"
                    }));
                    return;
                }
                console.log("Si tengo ese usuario en mis registros");
            });

        break;
        case "POST":
            request.on("data", info => {
                console.log(info.toString());
                const objeto_login = JSON.parse(info);

                if(objeto_login.nombre == usuario_nombre && objeto_login.contrasena == usuario_contrasena){

                    const token = jwt.sign({username: usuario_nombre}, llave_secreta_para_firmar_jwt, {expiresIn: "30s"});

                    console.log(token);
                

                    response.statusCode = 200;
                    response.setHeader("Content-Type", "application/json");
                    response.end(JSON.stringify({mensaje: "Iniciaste sesion correctamente",
                        token_acceso: token
                    }));
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