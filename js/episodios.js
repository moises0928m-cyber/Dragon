let todosEpisodios = [];
let filtroTemporada = document.querySelector("#filtroTemporada");
let modal = document.querySelector("#episodeModal");
let modalTitulo = document.querySelector("#modalTitulo");
let modalContenido = document.querySelector("#modalContenido");
let botonCerrarModal = document.querySelector("#cerrarModal");

export function initEpisodios() {
    if (!document.querySelector("#episodios-container")) return;
    getEpisodes();
}


async function getEpisodes() {
    try {

        await new Promise(resolve => setTimeout(resolve,2000));
        
        const res1 = await fetch("https://rickandmortyapi.com/api/episode");
        const data1 = await res1.json();

        const res2 = await fetch("https://rickandmortyapi.com/api/episode?page=2");
        const data2 = await res2.json();

        const res3 = await fetch("https://rickandmortyapi.com/api/episode?page=3");
        const data3 = await res3.json();

        //Guardar todos los episodios en una variable
        todosEpisodios = [...data1.results, ...data2.results, ...data3.results];

        mostrarEpisodios();

    } catch (error) {
        console.error("Error al cargar episodios:", error);
    }
}

function mostrarEpisodios() {
    const container = document.querySelector("#episodios-container");
    container.innerHTML = "";

    //obtener temporada seleccionada
    const temporadaSeleccionada = filtroTemporada.value;

    //filtrar episodios
    let episodiosParaMostrar = todosEpisodios;
    if (temporadaSeleccionada) {
        episodiosParaMostrar = todosEpisodios.filter(({episode}) =>
            episode.startsWith(temporadaSeleccionada)
        );
    }

    //Mostrar cards de episodios
    episodiosParaMostrar.forEach(({episode, name, air_date, ...episodio}) => {
        const card = document.createElement("div");
        card.className = "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow";
        card.innerHTML = `
            <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-2">${name}</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-2">
                <span class="font-semibold">Episodio:</span> ${episode}
            </p>
            <p class="text-gray-600 dark:text-gray-300 mb-2">
                <span class="font-semibold">Fecha:</span> ${air_date}
            </p>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
                <span class="font-semibold">Temporada:</span> ${episode.split('E')[0]}
            </p>
            <button class="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors ver-personajes-btn">
                Ver personajes
            </button>
        `;

        //evento para ver personajes
        card.querySelector('.ver-personajes-btn').addEventListener('click', () => {
            abrirModal({name, episode, air_date, ...episodio});
        });

        //agregar card al contenedor principal
        container.append(card);
    });
}

//Funcion para abrir modal
async function abrirModal({name, episode, characters}) {
    modalTitulo.textContent = `${name} - ${episode}`;
    modalContenido.innerHTML = `<p class="text-center">Cargando personajes...</p>`;

    //remover clase hidden que oculta el modal
    modal.classList.remove("hidden");

    //mostrar solo 8 personajes
    try {
        const personajesParaCargar = characters.slice(0,8);
        const personajesData = await Promise.all(
            personajesParaCargar.map(url => fetch(url).then(res => res.json()))
        );

        //info de personajes
        modalContenido.innerHTML = `
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                ${personajesData.map(({image, name, species}) => `
                    <div class="flex flex-col items-center text-center">
                        <img src="${image}" alt="${name}" class="w-16 h-16 rounded-full mb-2">
                        <p class="text-sm font-semibold">${name}</p>
                        <p class="text-xs text-gray-500">${species}</p>
                    </div>
                `).join('')}
            </div>
        `; 
    } catch (error) {
         console.error("Error al cargar personajes:", error);
    }
}

function cerrarModal() {
    modal.classList.add("hidden");
}

//filtros por temporada
function filtrarPorTemporada() {
    mostrarEpisodios();
}

//cerrar modal cuando se hace click en X
botonCerrarModal.addEventListener("click", cerrarModal);
modal.addEventListener("click", ({e}) => {
    if (e.target === modal) {
        cerrarModal();
    }
});

//evento para filtrar cuando se cambia la seleccion de temporada
filtroTemporada.addEventListener("change", filtrarPorTemporada);

getEpisodes();