
let nombres = document.getElementById("optionCharacters");
let searchInput = document.getElementById("namesCharacters");
let infoCard = document.getElementById("informationCharacters");
let infoNone = document.getElementById("informationCharactersNone");
let selectEstado = document.querySelector('select[name="filterStatus"]');
let selectEspecie = document.querySelector('select[name="filterSpecie"]');

let personajes = [];
let personajeSeleccionado = null;


fetch("https://rickandmortyapi.com/api/character")
  .then(r => r.json())
  .then(data => {
    personajes = data.results;
    renderOpciones(personajes);
    llenarFiltros(personajes);
  });

// Renderizar lista de nombres
function renderOpciones(lista) {
  nombres.innerHTML = "";
  lista.forEach(p => {
    let div = document.createElement("div");
    div.className = "flex items-center justify-center h-7 w-full border-b border-black cursor-pointer hover:bg-green-200 text-center px-2";
    div.textContent = p.name;
    div.addEventListener("click", () => mostrarInfo(p));
    nombres.appendChild(div);
  });
}

// Llenar selects con valores únicos
function llenarFiltros(data) {
  let estados = [...new Set(data.map(p => p.status))];
  let especies = [...new Set(data.map(p => p.species))];

  estados.forEach(e => {
    let opt = document.createElement("option");
    opt.value = e;
    opt.textContent = e;
    selectEstado.appendChild(opt);
  });

  especies.forEach(e => {
    let opt = document.createElement("option");
    opt.value = e;
    opt.textContent = e;
    selectEspecie.appendChild(opt);
  });
}

// Aplicar filtros en simultáneo
function aplicarFiltros() {
  let texto = searchInput.value.toLowerCase();
  let estado = selectEstado.value;
  let especie = selectEspecie.value;

  let filtrados = personajes.filter(p => {
    let coincideNombre = p.name.toLowerCase().includes(texto);
    let coincideEstado = !estado || p.status === estado;
    let coincideEspecie = !especie || p.species === especie;
    return coincideNombre && coincideEstado && coincideEspecie;
  });

  renderOpciones(filtrados);

  // Si hay personaje seleccionado y ya no está visible en los resultados, ocultar su card
  if (personajeSeleccionado && !filtrados.includes(personajeSeleccionado)) {
    infoCard.classList.add("hidden");
    infoNone.classList.remove("hidden");
    personajeSeleccionado = null;
  }

  // Si no hay personaje seleccionado, mostrar la card de “Selecciona un personaje”
  if (!personajeSeleccionado) {
    infoNone.classList.remove("hidden");
  }
}

// Mostrar la info de un personaje
function mostrarInfo(p) {
  personajeSeleccionado = p;
  infoNone.classList.add("hidden");
  infoCard.classList.remove("hidden");

  infoCard.querySelector("img").src = p.image;
  infoCard.querySelector("h2").textContent = p.name;
  infoCard.querySelectorAll("h3")[0].textContent = `${p.status} - ${p.species}`;
  infoCard.querySelectorAll("p")[1].textContent = `${p.episode[0]}`;
  infoCard.querySelectorAll("p")[2].textContent = `${p.episode[p.episode.length - 1]}`;
}


searchInput.addEventListener("input", aplicarFiltros);
selectEstado.addEventListener("change", aplicarFiltros);
selectEspecie.addEventListener("change", aplicarFiltros);