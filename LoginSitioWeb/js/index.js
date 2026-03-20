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
    }).then(recurso => {
        if(recurso.status == 200){
            recurso.json().then(respuesta => {
                alert(respuesta.mensaje);
                //console.log(respuesta.token_acceso);
                sessionStorage.setItem("token_sesion", respuesta.token_acceso);
                window.location.href = "cuenta.html"
            });
        }
        else{
            recurso.json().then(respuesta => {
                alert(respuesta.mensaje);
            })
        }
    });
}

