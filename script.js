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
