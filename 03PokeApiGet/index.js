//POKEAPI
//https://pokeapi.co/
//ENDPOINTS:
//https://pokeapi.co/api/v2/pokemon/pikachu

//* 1) TRAERNOS A RERQUEST

const request = require ('request')

//* 2) DECLARO MI URI DE MI API
const URI = 'https://pokeapi.co/api/v2/pokemon'

//* 3) FUNCION QUE PIDA UN POKEMON Y DEVUELVA SUS TIPOS

function getPokemonByName (name){
    //ES BUENA PRACTICA REVISAR SI LA API ES SENSIBLE A MAYUSCULAS Y MINUSCULAS
    //LA POKEAPI NO LO ES, Y PODRIAMOS USAR TANTO MAYUSCULAS COMO MINUSCULAS
    request.get(URI + name, function(error, response, body){
        //SI LA PETICION ES EXITOSA, devolvemos la data
        if(response.statusCode === 200){
            const bodyEnFormatoJs = JSON.parse(body) //parse convierte un objeto JASON en un objeto JavaScript
            const typePokemon = bodyEnFormatoJs.types.map((objeto) => objeto.type.name)
            console.log(`El tipo de ${name} es: ${typePokemon}`)
        } else {
            //SI EL CODIGO DE ESTADO ES CUALQUIER OTRO MUESTRA UNMENSAJE DE ERROR
            console.log(`Ocurrio un error: ${response.statusCode} ${response.statusMessage}`)
                                            //404                   Not Found
        }
    })
}
getPokemonByName("pikachu")
getPokemonByName("charmander")
getPokemonByName("bulbasaur")