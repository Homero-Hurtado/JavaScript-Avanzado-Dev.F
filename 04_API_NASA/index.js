console.log("Estamos consumiendeo la API de la NASA");
//import fetch from "node-fetch"
//variable de entorno
const llave = "vPSFJImmFdpcQVrQcSXhKxQLYJ7FnBX1VGPiWiBL"
//variables locales
let fechaInicio = "2021-11-08"
let fechaFinal = "2021-11-12"
//End Point o direccion de API a consultar
var apiNasa = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${fechaInicio}&end_date=${fechaFinal}&api_key=${llave}`

//Consultamos la API
//EJEMPLO DE METEORITOS PELIGROSOS

/*const respuestaApi = await fetch(apiNasa)
//console.log(respuestaApi)
var respuestaApiJson = await respuestaApi.json()
//console.log(respuestaApiJson.near_earth_objects)

Object.keys(respuestaApiJson.near_earth_objects).forEach(elemento => {

    const meteoritos = respuestaApiJson.near_earth_objects[elemento]
    meteoritos.forEach(elem => {
        let diamMin = elem.estimated_diameter.meters.estimated_diameter_min
        let diamMax = elem.estimated_diameter.meters.estimated_diameter_max
        let peligroso = elem.is_potentially_hazardous_asteroid
        if(diamMin > 10 && diamMax < 100000000 && peligroso) {
            console.log(`El asteroide ${elem.name} mide menos de 90 metros y es peligroso`)
        }
    })
})
*/

//EJEMPLO DE ENDPOINT MARTE
function fechaHoy() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + "-" + mm + '-' + dd;
    return today
}
function fecha(){
    let yourDate = new Date();
    const offset = yourDate.getTimezoneOffset()
    yourDate = new Date (yourDate.getTime()-(offset*60*1000));
    return yourDate.toISOString().split('T')[0];
}

const marte = async (rov, cam, sol) => {
    var martianApi = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rov}/photos?sol=${sol}&camera=${cam}&api_key=${llave}`
    let fechaFoto = fechaHoy()
    let fechaFotoIngrid =fechaIngrid()
    var fotoDia = `https://api.nasa.gov/planetary/apod?start_date=${fechaFoto}&end_date=${fechaFoto}&api_key=${llave}`
    const resultadoMarte = await fetch(martianApi)
    const marteJson = await resultadoMarte.json()
    const resultadoFotoDia = await fetch(fotoDia)
    const fotoJson = await resultadoFotoDia.json()
    console.log(fotoJson)

    console.log(marteJson)
    let cartasDiv = document.getElementById("contenedorCartas")
    while (cartasDiv.firstChild) {
        cartasDiv.removeChild(cartasDiv.firstChild)
    }

    let arregloFotos = marteJson.photos
    if (arregloFotos.length == 0) {
        cartasDiv.innerHTML = `<div class="card col-sm-12 col-md-12 col-lg-12" style="width: 18rem;">
        <img class="card-img-top" src=${fotoJson[0].url} alt=${fotoJson[0].copyright}>
        <div class="card-body">
        <h5 class="card-title">${fotoJson[0].title}</h5>
        <p class="card-text">${fotoJson[0].explanation}</p>

        </div>
        </div>`
    } else {
        arregloFotos.forEach(foto => {
            cartasDiv.innerHTML += `<div class="card mb-2 col-sm-12 col-md-6 col-lg-4 " style="width: 18rem;">
            <img class="card-img-top" src=${foto.img_src} alt=${foto.id}>
            <div class="card-body">
            <h5 class="card-title">${foto.rover.name}</h5>
            <p class="card-text">${foto.camera.full_name}</p>
            <p class="card-text">Foto tomada el día: ${foto.earth_date}</p>
            </div>
            </div>`
        })
    }
}
function traerDatos() {
    let rover = document.getElementById("roverid")
    let camara = document.getElementById("camaraid")
    let solar = document.getElementById("solarid")
    let roverv = rover.value
    let camarav = camara.value
    let solarv = solar.value
    console.log(roverv + camarav + String(solarv))
    marte(roverv, camarav, String(solarv))
}
