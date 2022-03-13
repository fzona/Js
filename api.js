const search = document.getElementById("search");
const searchAccion = document.getElementById("searchAccion");

search.addEventListener("submit", (e) => {
    e.preventDefault();
fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${searchAccion.value}&apikey=1F5ADZP9JKXXORG5`)
.then((resultado) => resultado.json())
.then ((respuesta) => {
    console.log(respuesta)
})
})
