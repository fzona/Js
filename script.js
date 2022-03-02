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

  //Guardo la nueva array en el local storage
  localStorage.setItem("portafolio", JSON.stringify(portafolio));

  //Agrego un header a la tabla ya existente
  tabla.innerHTML = `  <thead>
  <tr>
    <th scope="col">Nombre</th>
    <th scope="col">Precio de compra</th>
    <th scope="col">Cotización del día</th>
    <th scope="col">Rendimiento</th>
  </tr>
</thead>
<tbody id = "body">
</tbody>`;

  const body = document.getElementById("body");
  //Llamo la información del local Storage y la parseo
  const portafolioLocalStorage = JSON.parse(localStorage.getItem("portafolio"));

  //Por cada acción que el usuario agrega, se agrega una fila a la tabla utilizando los elementos de la array
  for (const accion of portafolioLocalStorage) {
    let fila = document.createElement("tr"); //Creo la fila

    fila.innerHTML = `<td>${accion.nombre}</td> 
  <td>${accion.costo}</td>
  <td>${accion.precio}</td>
  <td id ="${accion.nombre}">${accion.rendimiento}</td>`;

  
  body.appendChild(fila);
  
  parseInt(accion.rendimiento) > 0 ? document.getElementById(accion.nombre).className = "rendPositivo" : document.getElementById(accion.nombre).className = "rendNegativo";
    // Utilizando un operador ternario 
  }
})
