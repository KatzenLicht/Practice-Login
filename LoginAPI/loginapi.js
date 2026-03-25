const http = require("node:http");
const jwt = require("jsonwebtoken")
const puerto = 3000;

// Usuario
var usuario_nombre = "Julian";
var usuario_contrasena = "1235";
var usuario_frase = "katzenlicht"

const llave_secreta_para_firmar_jwt = "qazwsxedcrfvtgbyhnujmikolp1973486250";

const server = http.createServer((request, response) => {

    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    response.setHeader("Access-Control-Allow-Headers", "*");

    const authHeader = request.headers['authorization'];

    switch(request.method){
        case "GET":
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
                response.statusCode = 200;
                response.setHeader("Content-Type", "application/json");
                response.end(JSON.stringify({
                    "frase" : usuario_frase,
                    "mensaje" : "Acceso concedido",
                    "usuario" : decoded
                }))
            });

        break;
        case "POST":
            if(request.url == "/login"){
                request.on("data", info => {
                    const objeto_login = JSON.parse(info);

                    if(objeto_login.nombre == usuario_nombre && objeto_login.contrasena == usuario_contrasena){

                        const token = jwt.sign({username: usuario_nombre}, llave_secreta_para_firmar_jwt, {expiresIn: "5m"});

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
            }
            else if(request.url == "/cambiar_frase"){
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
                    request.on("data", info => {
                        const objeto_frase = JSON.parse(info);
                        usuario_frase = objeto_frase.frase;

                        response.statusCode = 200;
                        response.setHeader("Content-Type", "application/json");
                        response.end(JSON.stringify({
                            mensaje : "Frase cambiada correctamente",
                            nueva_frase : usuario_frase
                        }));
                    });
                }); 
            }
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