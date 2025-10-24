  let contenedor = document.querySelector("#cards");

// 🔹 Leer los favoritos de tu compañero
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

if (favoritos.length === 0) {
    contenedor.innerHTML = `<p class="text-gray-400 col-span-3 text-center">No hay favoritos aún 😢</p>`;
} else {
    favoritos.forEach(fav => {
        // Para cada favorito, vamos a buscar los datos completos desde la API
        fetch(`https://rickandmortyapi.com/api/character/${fav.id}`)
          .then(res => res.json())
          .then(char => {
              let card = document.createElement("div");
              card.className = "relative bg-gray-800 rounded-lg shadow p-4 text-center w-64";
              card.innerHTML = `
                <img src="${char.image}" alt="${char.name}" class="rounded-xl mb-3 mx-auto w-32 h-32">
                <h2 class="text-xl font-bold">${char.name}</h2>
                <p><strong>Género:</strong> ${char.gender}</p>
                <p><strong>Especie:</strong> ${char.species}</p>
                <p><strong>Estado:</strong> ${char.status}</p>
                <button class="removeFav absolute top-2 right-2 text-red-500 text-2xl">❌</button>
              `;
              contenedor.appendChild(card);

              
              card.querySelector(".removeFav").addEventListener("click", () => {
                  favoritos = favoritos.filter(f => f.id !== char.id);
                  localStorage.setItem("favoritos", JSON.stringify(favoritos));
                  card.remove();
              });
          });
    });
}
    