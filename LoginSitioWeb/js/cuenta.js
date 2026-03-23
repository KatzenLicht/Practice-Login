const input_frase = document.querySelector("input");
const SaludoUsuario = document.querySelector("#SaludoUsuario");

fetch("http://localhost:3000/obtener_info", {
    method: "GET",
    headers: {
        "Authorization": sessionStorage.getItem("token_sesion")
    }
}).then(recurso => {
    if(recurso.status == 200){
        recurso.json().then(respuesta => {
            input_frase.value = respuesta.frase;
            SaludoUsuario.innerHTML = "Hola " + respuesta.usuario.username;
        });
    }
    else{
        recurso.json().then(respuesta => {
            alert(respuesta.mensaje);
            window.location.href = "index.html"
        });
    }
});

function CambiarFrase(){
    fetch("http://localhost:3000/cambiar_frase", {
        method: "POST",
        body: JSON.stringify({
            frase: input_frase.value
        }),
        headers: {
            "Authorization": sessionStorage.getItem("token_sesion")
        }
    }).then(recurso => {
        if(recurso.status == 200){
            recurso.json().then(respuesta => {
                alert(respuesta.mensaje);
                input_frase.value = respuesta.nueva_frase;
                return;
            })
        }
        recurso.json().then (respuesta => {
            alert(respuesta.mensaje);
            window.location.href = "index.html"
        });
    });
}