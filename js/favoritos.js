let personajes = [
  { nombre: "Rick", imagen: "https://rickandmortyapi.com/api/character/avatar/1.jpeg", descripcion: "Científico loco" },
  { nombre: "Morty", imagen: "https://rickandmortyapi.com/api/character/avatar/2.jpeg", descripcion: "Nieto nervioso" },
  { nombre: "Summer", imagen: "https://rickandmortyapi.com/api/character/avatar/3.jpeg", descripcion: "Hermana mayor" }
];

let favoritos = document.querySelector("#cards")


personajes.forEach((person) =>{
    favoritos.innerHTML +=` <div class="bg-gray-800 p-6 rounded-2xl shadow-xl relative w-64 text-center">
    <img src="${person.imagen} " alt="Rick Sanchez" class="rounded-xl mb-3 mx-auto">
    <h2 class="text-xl font-bold">${person.nombre} </h2>
    <p class="text-gray-400 text-sm">${person.descripcion}</p>
    <button 
      class="btnFavorito  absolute top-3 right-3 text-yellow-400 text-2xl hover:scale-110 transition"
      title="Agregar a favoritos">
      ⭐
    </button>
  </div>  `
}) 

favoritos.addEventListener("click", (e)=>{
  if (e.target.classList.contains("btnFavorito")) {
    let eliminar = e.target.closest("div");
    eliminar.remove();
}})
   