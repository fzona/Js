//script para que un usuario ingrese las acciones bursátiles que tiene en su portfolio

let portfolio = 0;
let accion = prompt("Por favor ingresa una acción que se encuentre en tu portfolio");

while (accion != "END") {

    if (portfolio == 0) {
        portfolio = accion;
    } else {
        portfolio = portfolio + ", " + accion;
    }
    //Agrego la accion al portfolio

    accion = prompt("Por favor ingresa otra acción o escribe END para terminar:");
   
}

console.log(`El portfolio esta compuesto por: ${portfolio}`);
