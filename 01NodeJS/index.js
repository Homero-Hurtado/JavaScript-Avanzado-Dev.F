console.log("Node")
var colors = require ("colors") //Este es el paquete npm llamado colors

function Sumar(x, y){
    let suma = x+y 
    console.log("La suma  es: ".yellow + suma)
}

Sumar(25,20)
for(let i=0; i<5; i++){
    console.log("Rene".red)
}

for(let j=0; j<10; j++){
    console.log(`tabla d emultiplicar ${j}*2`.magneta + j*2)
}