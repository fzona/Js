//Declaro la array vacía
let portafolio = JSON.parse(localStorage.getItem("portafolio")) || [];
//Declaro las variables utilizando DOM y el id
const formulario = document.getElementById("formulario");
const nombre = document.getElementById("nombreAccion");
const costo = document.getElementById("costo");
const precio = document.getElementById("precio");
const tabla = document.getElementById("tabla");
const body = document.getElementById("body");


document.addEventListener("DOMContentLoaded", tablaPorta);

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

  //Defino el valor para cada celda de la nueva fila
  cell1.innerHTML=nuevaAccion.nombre;
  cell2.innerHTML=nuevaAccion.costo;
  cell3.innerHTML=nuevaAccion.precio;
  cell4.innerHTML=nuevaAccion.rendimiento;

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
    }
  }};
