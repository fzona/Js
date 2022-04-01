    function autocompletar(inp, arr) {
      //la funcion de autocompletar lleva dos argumentos, el input y un array de posibles valores a autocompletar
      var currentFocus;
      //ejectua la función cuando el usuario escribe en el campo de busqueda
      inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        //elimina las opciones de autocompletar que no correspondan
        closeAllLists();
        if (!val) {
          return false;
        }
        currentFocus = -1;
        //crea un div con los valores que se ingresan
        a = document.createElement("div");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        //se hace append de ese div al contenedor
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          //revisa si el item comienza con las misma letras que las ingresadas en el input
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            //crea un div para cada elemento que sea igual a lo ingresado
            b = document.createElement("DIV");
            //pone las letras que coinciden en negrita
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            b.addEventListener("click", function (e) {
              inp.value = this.getElementsByTagName("input")[0].value;
              //cierra la lista de los valores autocompletados
              closeAllLists();
            });
            a.appendChild(b);
          }
        }
      });

      inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          //Si se preciosa la tecla de flecha para abajo, aumenta el focus y hace el item más visible
          currentFocus++;
          addActive(x);
        } else if (e.keyCode == 38) { //up
          //Si se preciosa la tecla de flecha para arriba, disminuye el focus y hace el item más visible
          currentFocus--;
          addActive(x);
        } else if (e.keyCode == 13) {
          //Previene que se envíe el formulario si el usuario presiona la tecla ENTER y simula un click en el item activo
          e.preventDefault();
          if (currentFocus > -1) {
            if (x) x[currentFocus].click();
          }
        }
      });

      function addActive(x) {
        //funcion para clasificar un item como activo
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        //agrega la clase autocomplete-active
        x[currentFocus].classList.add("autocomplete-active");
      }

      function removeActive(x) {
        //funcion para remover la clase de activo de los items de autocomplete
        for (var i = 0; i < x.length; i++) {
          x[i].classList.remove("autocomplete-active");
        }
      }

      function closeAllLists(elmnt) {
        //cierra todas las listas de autocompletar, salvo aquellas que coincidan con lo ingresado
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
          if (elmnt != x[i] && elmnt != inp) {
            x[i].parentNode.removeChild(x[i]);
          }
        }
      }
      //cierra las listas de autocompletar cuando el usuario hace click en el documento
      document.addEventListener("click", function (e) {
        closeAllLists(e.target);
      });
    }

    //Hago un fetch al archivo json para obtener los tickers posibles para la lista de autocompletar
    fetch('./json/tickers.json')
      .then(res => res.json())
      .then(data => {
        const tickers = data;

        autocompletar(document.getElementById("searchAccion"), tickers);
      })