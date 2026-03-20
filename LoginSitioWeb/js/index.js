const input_nombre = document.querySelector("#input_nombre");
const input_contrasena = document.querySelector("#input_contrasena");

function IniciarSesion(){
    const informacion_login = {
        nombre: input_nombre.value,
        contrasena: input_contrasena.value
    }

    fetch("http://localhost:3000/login", {
        method: "POST",
        body: JSON.stringify(informacion_login)
    }).then(recurso => recurso.json()).then(respuesta => {
        console.log(respuesta);
    });
}

