const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const speciesFilter = document.getElementById("speciesFilter");
const container = document.getElementById("characterContainer");
const statusMsg = document.getElementById("statusMsg");
const toggleDark = document.getElementById("toggleDark");

// Modal
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

let debounceTimer;
let currentQuery = "";
let currentStatus = "";
let currentSpecies = "";

// Estado inicial del dark mode
let darkToggle = document.getElementById("darkToggle");
darkToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark");
    let ball = darkToggle.nextElementSibling.firstElementChild;
    ball.style.transform = darkToggle.checked ? "translateX(100%)" : "translateX(0)";
});

if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
}

// 🧠 Debounce búsqueda
searchInput.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        currentQuery = searchInput.value.trim();
        fetchPersonajes();
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
        const res = await fetch(url);
        if (!res.ok) throw new Error("No se encontraron resultados");
        const data = await res.json();

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

    Personajes.forEach((char) => {
        const card = document.createElement("div");
        card.className =
            "bg-white dark:bg-gray-800 rounded-lg shadow hover:scale-105 transition-transform cursor-pointer overflow-hidden";
        card.dataset.id = char.id;
        card.innerHTML = `
      <img src="${char.image}" alt="${char.name}" class="w-full h-48 object-cover">
      <div class="p-3">
        <h3 class="font-bold text-lg">${char.name}</h3>
        <p><span class="font-semibold">Especie:</span> ${char.species}</p>
        <p><span class="font-semibold">Estado:</span> ${char.status}</p>
      </div>
    `;
        container.appendChild(card);
    });
}

// 🪄 Delegación de eventos para modal
container.addEventListener("click", async (e) => {
    const card = e.target.closest("div[data-id]");
    if (!card) return;
    const id = card.dataset.id;
    await showModal(id);
});

async function showModal(id) {
    try {
        const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        const char = await res.json();

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
