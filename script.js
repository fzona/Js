////Declaro un array vacío de acciones en un portafolio
const portafolio = [];

//Defino la clase constructora de Accion que recibirá como parámetros nombre, costo, precio, rendimiento
class Accion {
  constructor(accion) {
    this.nombre = accion.nombre;
    this.costo = accion.costo;
    this.precio = accion.precio;
    this.rendimiento = (((this.precio / this.costo) - 1) * 100).toFixed(2) + "%";
  }
}

////Le pido al usuario que ingrese una accion al portafolio. Si la respuesta es si, obtengo las variables nuevoNombre, nuevoCosto.... para pasarlos como parámetros a mi clase constructora y realizar el método push en el array portafolio.
let entrada = prompt("Quieres agregar una acción a tu portafolio? (Si o No)");

while (entrada === "Si") {
  let nuevoNombre = prompt("Ingresa el nombre de la acción");
  let nuevoCosto = parseInt(prompt("Ingresa a cuanto la compraste"));
  let nuevoPrecio = parseInt(prompt("A que valor cerró el día de hoy?"));
  let accionNueva = new Accion({
    nombre: nuevoNombre,
    costo: nuevoCosto,
    precio: nuevoPrecio
  }); //Utilizando los prompts ingreso el nuevo objeto a la array
  portafolio.push(accionNueva);
  entrada = prompt("Quieres agregar una nueva acción a tu portafolio? (Si o No)");
}

//Utilizo un sort para que reordene la array por la letra incial del nombre de la acción
portafolio.sort((a, b) => {
  if (a.nombre > b.nombre) {
    return 1;
  }
  if (a.nombre < b.nombre) {
    return -1;
  }
  // a es igual a b
  return 0;
})

console.log(portafolio);