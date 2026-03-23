alert(sessionStorage.getItem("token_sesion"));

fetch("http://localhost:3000/obtener_info", {
    method: "GET",
    headers: {
        "Authorization": sessionStorage.getItem("token_sesion")
    }
}).then(recurso => recurso.json()).then(respuesta => {
    console.log(respuesta);
})