//Declaro la array que tomará las acciones ya ingresadas por el usuario y que se guardaron en el local storage o será un array vacío
let portafolio = JSON.parse(localStorage.getItem("portafolio")) || [];
//Declaro las variables utilizando DOM y el id
const formulario = document.getElementById("formulario");
const nombre = document.getElementById("nombreAccion");
const costo = document.getElementById("costo");
const precio = document.getElementById("precio");
const tabla = document.getElementById("tabla");
const body = document.getElementById("body");


document.addEventListener("DOMContentLoaded", tablaPorta);

//Creo un objeto accion, que contiene el nombre, el costo, el precio y el rendimiento
class Accion {
    constructor(nombre, costo, precio) {
        this.nombre = nombre;
        this.costo = costo;
        this.precio = precio;
        this.rendimiento = (((this.precio / this.costo) - 1)*100).toFixed(2)+"%";
    }
}

//Le agrego un evento para que escuche cuando el usuario hace submit al formulario
formulario.addEventListener("submit", function (e) {
  e.preventDefault();
  //Creo una nueva accion con los valores introducidos por el usuario
  const nuevaAccion = new Accion(nombre.value, costo.value, precio.value);

  portafolio.push(nuevaAccion);
  //Agrega la nueva accion al portafolio

  //Guardo la nueva array en el local storage
  localStorage.setItem("portafolio", JSON.stringify(portafolio));

  //Creo una nueva fila en la tabla
  let r = body.insertRow();
  let cell1=r.insertCell();
  let cell2=r.insertCell();
  let cell3=r.insertCell();
  let cell4=r.insertCell();

  //Creo un boton para eliminar la accion del portafolio
  let button=document.createElement("button");
  button.innerHTML="Eliminar";
  button.className ="eliminar";
  button.id = nuevaAccion.nombre;
  r.appendChild(button);

  //Defino el valor para cada celda de la nueva fila
  cell1.innerHTML=nuevaAccion.nombre;
  cell2.innerHTML=nuevaAccion.costo;
  cell3.innerHTML=nuevaAccion.precio;
  cell4.innerHTML=nuevaAccion.rendimiento;

  //Utilizando un operador ternario, defino la clase de la celda que corresponde al rendimiento dependiendo si el mismo es negativo o positivo
  parseInt(nuevaAccion.rendimiento) > 0 ? cell4.className = "rendPositivo" : cell4.className = "rendNegativo";

  //Cambio la clase de la tabla para que se muestre, ya que cuando se cargo el documento por la funcion tablaPorta se había ocultado
  tabla.className = "table table-striped";

  //Envio un mensaje al usuario de que ha agregado una nueva acción al portafolio
  Toastify({
    text: "Has agregado una acción a tu portafolio",
    duration: 2000,
    gravity: "bottom",
    position: "right",
    style: {
      background: "linear-gradient(to right, #6f0abd, #5d079e)"
    }
}).showToast();
})

//Esta función se encarga de mostrar las acciones que hay en el local storage en la tabla, si no existen acciones, hace que la tabla no sea vea
function tablaPorta() {
  if (portafolio.length === 0) {
    tabla.className = "ocultar";
  } else {
    for(i=0; i<portafolio.length; i++){
      let r = body.insertRow();
      let cell1=r.insertCell();
      let cell2=r.insertCell();
      let cell3=r.insertCell();
      let cell4=r.insertCell();

      cell1.innerHTML=portafolio[i].nombre;
      cell2.innerHTML=portafolio[i].costo;
      cell3.innerHTML=portafolio[i].precio;
      cell4.innerHTML=portafolio[i].rendimiento;

      let button=document.createElement("button");
    button.innerHTML="Eliminar";
    button.className ="eliminar";
    button.id = portafolio[i].nombre;
    r.appendChild(button);

      parseInt(portafolio[i].rendimiento) > 0 ? cell4.className = "rendPositivo" : cell4.className = "rendNegativo";
    }
  }};

//Con esta funcion elimino una entrada del local storage y de la tabla al presionar el boton eliminar
body.onclick = function(e){
  if(e.target && e.target.classList.contains("eliminar")){
    eliminar(e.target.id);
  }}

  function eliminar(nombre){
    for (let i = 0; i < portafolio.length; i += 1) {
    if (portafolio[i].nombre === nombre) {
      portafolio.splice(i, 1);
      localStorage.setItem("portafolio", JSON.stringify(portafolio));
      Toastify({
        text: "Has eliminado una acción de tu portafolio",
        duration: 2000,
        gravity: "bottom",
        position: "right",
        style: {
          background: "linear-gradient(to right, #6f0abd, #5d079e)"
        }
    }).showToast();
    }
  }actualizarTabla();
}


//Esta funcion actualiza la tabla con las acciones que hay en el local storage
function actualizarTabla(){
  let str ="";
  for (let i = 0; i < portafolio.length; i += 1) {
    str += `<tr>
    <td>${portafolio[i].nombre}</td>
    <td>${portafolio[i].costo}</td>
    <td>${portafolio[i].precio}</td>
    <td>${portafolio[i].rendimiento}</td>
    <td><button class="eliminar" id="${portafolio[i].nombre}">Eliminar</button></td>
    </tr>`;
  }
  body.innerHTML = str;
  if (portafolio.length === 0) {
    tabla.className = "ocultar";
  }
}