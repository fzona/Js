const search = document.getElementById("search");
const searchAccion = document.getElementById("searchAccion");
const contenedor = document.getElementById("contenedor");

/*mediante un evento cuando el usuario busca una accion de la base de acciones posibles, 
se hace un fetch a la api de alphavantage que le devuelve el precio final del día y el porcentaje de variación*/
search.addEventListener("submit", (e) => {
    e.preventDefault();
fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${searchAccion.value}&apikey=1F5ADZP9JKXXORG5`)
.then((resultado) => resultado.json())
.then ((respuesta) => {
    console.log(respuesta);
    const element = document.createElement("div");
    element.classList.add("card");
    element.innerHTML = `<h2 class="accion-nombre">${respuesta["Global Quote"]["01. symbol"]}</h2>
    <h3>Precio:</h3> <p>${respuesta["Global Quote"]["05. price"]}</p>
    <h3>Variación diaria:</h3> <p class>${respuesta["Global Quote"]["10. change percent"]}</p>`;
    console.log(element);
    contenedor.appendChild(element);
})
})
