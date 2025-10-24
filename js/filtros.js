let searchInput = document.getElementById("searchInput");
let statusFilter = document.getElementById("statusFilter");
let speciesFilter = document.getElementById("speciesFilter");
let container = document.getElementById("characterContainer");
let statusMsg = document.getElementById("statusMsg");
let darkToggle = document.getElementById("darkToggle");

let modal = document.getElementById("modal");
let modalBody = document.getElementById("modalBody");
let closeModal = document.getElementById("closeModal");

let debounceTimer;
let currentQuery = "";
let currentStatus = "";
let currentSpecies = "";
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

// Estado inicial del dark mode
function darkMode() {
    darkToggle.addEventListener("change", () => {
        document.body.classList.toggle("dark");
        let ball = darkToggle.nextElementSibling.firstElementChild;
        ball.style.transform = darkToggle.checked ? "translateX(100%)" : "translateX(0)";
    });
}
darkMode()
if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
}

// 🧠 Debounce búsqueda
searchInput.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        currentQuery = searchInput.value.trim();
    }, 500);
});

// 🎯 Filtros
statusFilter.addEventListener("change", (e) => {
    currentStatus = e.target.value;
    fetchPersonajes();
});

speciesFilter.addEventListener("change", (e) => {
    currentSpecies = e.target.value;
    fetchPersonajes();
});

// 🚀 Fetch de la API
async function fetchPersonajes() {
    statusMsg.textContent = "Cargando...";
    container.innerHTML = "";

    let url = `https://rickandmortyapi.com/api/character/?`;
    if (currentQuery) url += `name=${currentQuery}&`;
    if (currentStatus) url += `status=${currentStatus}&`;
    if (currentSpecies) url += `species=${currentSpecies}`;

    try {
        let res = await fetch(url);
        if (!res.ok) throw new Error("No se encontraron resultados");
        let data = await res.json();

        renderPersonajes(data.results);
        statusMsg.textContent = "";
    } catch (err) {
        container.innerHTML = "";
        statusMsg.textContent = "⚠️ " + err.message;
    }
}

// 🎨 Renderizar tarjetas
function renderPersonajes(Personajes) {
    if (!Personajes || Personajes.length === 0) {
        statusMsg.textContent = "No hay personajes que coincidan.";
        return;
    }

    container.innerHTML = "";
    Personajes.forEach((char) => {
        let isFav = favoritos.some((f) => f.id === char.id);
        let card = document.createElement("div");
        card.className =
            "relative bg-white dark:bg-gray-800 rounded-lg shadow hover:scale-105 transition-transform cursor-pointer overflow-hidden";
        card.dataset.id = char.id;
        card.innerHTML = `
      <img src="${char.image}" alt="${char.name}" class="w-full h-48 object-cover">
      <div class="absolute top-2 right-2">
        <svg data-fav="${char.id}" xmlns="http://www.w3.org/2000/svg" fill="${isFav ? 'red' : 'none'}" viewBox="0 0 24 24" stroke="currentColor" class="w-7 h-7 cursor-pointer hover:scale-110 transition">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 21C12 21 4 13.5 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 13.93 5.08C14.95 3.81 16.62 3 18.36 3C21.44 3 23.86 5.42 23.86 8.5C23.86 13.5 16 21 16 21H12Z" />
        </svg>
      </div>
      <div class="p-3">
        <h3 class="font-bold text-lg">${char.name}</h3>
        <p><span class="font-semibold">Especie:</span> ${char.species}</p>
        <p><span class="font-semibold">Estado:</span> ${char.status}</p>
      </div>
    `;
        container.appendChild(card);
    });
}

// ❤️ Delegación: abrir modal o agregar favorito
container.addEventListener("click", async (e) => {
    let favIcon = e.target.closest("svg[data-fav]");
    let card = e.target.closest("div[data-id]");

    if (favIcon) {
        e.stopPropagation(); // Evita abrir modal
        let id = parseInt(favIcon.dataset.fav);
        toggleFavorito(id, favIcon); // 👈 pasamos también el icono
        return;
    }

    if (card) {
        let id = card.dataset.id;
        await showModal(id);
    }
});


// Agregar o quitar favorito
function toggleFavorito(id, svgIcon) {
    let index = favoritos.findIndex((f) => f.id === id);

    if (index === -1) {
        // Agregar a favoritos
        favoritos.push({ id });
        svgIcon.setAttribute("fill", "red"); // Cambia color a rojo
    } else {
        // Quitar de favoritos
        favoritos.splice(index, 1);
        svgIcon.setAttribute("fill", "none"); // Cambia color a transparente
    }

    // Guardar en localStorage sin recargar
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
}


// 🪄 Mostrar modal
async function showModal(id) {
    try {
        let res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        let char = await res.json();

        modalBody.innerHTML = `
      <img src="${char.image}" alt="${char.name}" class="w-32 h-32 rounded-full mx-auto mb-4">
      <h2 class="text-center text-2xl font-bold mb-2">${char.name}</h2>
      <p><strong>Género:</strong> ${char.gender}</p>
      <p><strong>Origen:</strong> ${char.origin.name}</p>
      <p><strong>Ubicación:</strong> ${char.location.name}</p>
      <p><strong>Episodios:</strong> ${char.episode.length}</p>
      <p><strong>Creado:</strong> ${new Date(char.created).toLocaleDateString()}</p>
    `;

        modal.classList.remove("hidden");
    } catch (err) {
        alert("Error al cargar detalles del personaje.");
    }
}

// 🔒 Cerrar modal
closeModal.addEventListener("click", () => modal.classList.add("hidden"));
modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
});
window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") modal.classList.add("hidden");
});

// Inicial
fetchPersonajes();
