let portafolio = [];
const formulario = document.getElementById("formulario");
const nombre = document.getElementById("nombreAccion");
const costo = document.getElementById("costo");
const precio = document.getElementById("precio");
const tabla = document.getElementById("tabla");

formulario.addEventListener("submit", function (e){
  e.preventDefault();

  portafolio.push({
    nombre: nombre.value,
    costo: costo.value,
    precio: precio.value,
    rendimiento: (((precio.value / costo.value) - 1) * 100).toFixed(2) + "%"
  });
  tabla.innerHTML= `  <thead>
  <tr>
    <th scope="col">Nombre</th>
    <th scope="col">Precio de compra</th>
    <th scope="col">Cotización del día</th>
    <th scope="col">Rendimiento</th>
  </tr>
</thead>`;
for (const accion of portafolio){
  let fila = document.createElement("tr");
  fila.innerHTML = `<td>${accion.nombre}</td>
  <td>${accion.costo}</td>
  <td>${accion.precio}</td>
  <td>${accion.rendimiento}</td>`
  tabla.appendChild(fila);
}
}
)
console.log(portafolio);
