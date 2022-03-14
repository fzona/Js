const search = document.getElementById("search");
const searchAccion = document.getElementById("searchAccion");
const contenedor = document.getElementById("contenedor");

search.addEventListener("submit", (e) => {
    e.preventDefault();
fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${searchAccion.value}&apikey=1F5ADZP9JKXXORG5`)
.then((resultado) => resultado.json())
.then ((respuesta) => {
    console.log(respuesta);
    const element = document.createElement("div");
    element.classList.add("card");
    element.innerHTML = `<h2 class="accion-nombre">${respuesta["Global Quote"]["01. symbol"]}</h2>
    <p>Precio: ${respuesta["Global Quote"]["05. price"]}</p>
    <p>Variación diaria: ${respuesta["Global Quote"]["10. change percent"]}</p>`;
    console.log(element);
    contenedor.appendChild(element);
})
})
