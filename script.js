//Declaro la array vacía
let portafolio = [];
//Declaro las variables utilizando DOM y el id
const formulario = document.getElementById("formulario");
const nombre = document.getElementById("nombreAccion");
const costo = document.getElementById("costo");
const precio = document.getElementById("precio");
const tabla = document.getElementById("tabla");

//Le agrego un evento para que escuche cuando el usuario hace submit al formulario
formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  //Agrega a la array vacia el nombre, costo y precio ingresado por el usuario por cada acción. Y a su vez calcula el rendimiento de la misma de acuerdo al costo y precio final del día
  portafolio.push({
    nombre: nombre.value,
    costo: costo.value,
    precio: precio.value,
    rendimiento: (((precio.value / costo.value) - 1) * 100).toFixed(2) + "%"
  });
  //Agrego un header a la tabla ya existente
  tabla.innerHTML = `  <thead>
  <tr>
    <th scope="col">Nombre</th>
    <th scope="col">Precio de compra</th>
    <th scope="col">Cotización del día</th>
    <th scope="col">Rendimiento</th>
  </tr>
</thead>`;

  //Por cada acción que el usuario agrega, se agrega una fila a la tabla utilizando los elementos de la array
  for (const accion of portafolio) {
    let fila = document.createElement("tr"); //Creo la fila

    fila.innerHTML = `<td>${accion.nombre}</td> 
  <td>${accion.costo}</td>
  <td>${accion.precio}</td>
  <td>${accion.rendimiento}</td>`
    tabla.appendChild(fila);
  }
})