function loadHeader() {
  const headerHTML = `
 
  <header class="bg-amber-200 h-35 w-full relative overflow-hidden border-2 ">
      <img class="h-full object-cover object-center hidden lg:block"
        <source src="../assets/img/logo.png" />

      <img src="../assets/img/logo2.png"
        alt="Rick and Morty"
        class="h-full object-cover object-center md:hidden" />

      <img src="../assets/img/Logo3.png"
        alt="Rick and Morty"
        class="h-full object- object-center hidden md:block lg:hidden" />

    <div class="fixed top-4 right-4 z-50 p-2 md:hidden">
      <input hidden class="check-icon" id="check-icon" name="check-icon" type="checkbox" />
      <label id="menuheader" class="icon-menu cursor-portal" for="check-icon">
        <div class="bar bar--1"></div>
        <div class="bar bar--2"></div>
        <div class="bar bar--3"></div>
      </label>
    </div>
  </header>

  <div class="hidden md:flex gap-6 creepster-regular stroke px-3 py-4 text-4xl">
    <div class="drop-shadow-sm drop-shadow-[#00fc22] hover:scale-105 hover:bg-[#00fc22] hover:p-2 hover:rounded-2xl">
      <a href="#hero-section">Inicio</a>
    </div>

    <div class="drop-shadow-sm drop-shadow-[#00fc22] hover:scale-105 hover:bg-[#00fc22] hover:p-2 hover:rounded-2xl">
      <a href="../pages/espisodios.html" target="_blank">Episodios</a>
    </div>
    
    <div class="drop-shadow-sm drop-shadow-[#00fc22] hover:scale-105 hover:bg-[#00fc22] hover:p-2 hover:rounded-2xl">
      <a href="#filter">Filtros</a>
    </div>


    <div class="drop-shadow-sm drop-shadow-[#00fc22] hover:scale-105 hover:bg-[#00fc22] hover:p-2 hover:rounded-2xl">
      <a href="#" onclick="showFavorites(); return false;">Favoritos</a>
    </div>

    <div class="drop-shadow-sm drop-shadow-[#00fc22] hover:scale-105 hover:bg-[#00fc22] hover:p-2 hover:rounded-2xl">
      <a href="#cards">Personajes</a>
    </div>
    <div class="drop-shadow-sm drop-shadow-[#00fc22] hover:scale-105 hover:bg-[#00fc22] hover:p-2 hover:rounded-2xl">
      <a href="https://rickandmorty.fandom.com/es/wiki/Rickipedia" target="_blank">Rickipedia</a>
    </div>
 
  </div>

  <div id="menumodel" class="hidden absolute z-40 rounded-br-2xl h-[27rem] w-[80%] bg-[url(https://i.pinimg.com/1200x/78/ee/c2/78eec22861c5d625fc304990ce3ace36.jpg)] bg-cover bg-center text-white p-3 gap-2 creepster-regular stroke">
    <div class="absolute inset-0 rounded-br-2xl h-full w-full bg-black/70"></div>
    <div class="relative z-10 flex flex-col gap-3">
      <div class="drop-shadow-sm drop-shadow-[#00fc22]"><a href="#hero-section">Home</a></div>
      <div class="drop-shadow-sm drop-shadow-[#00fc22]"><a href="https://lasaventurasderickymorty6.blogspot.com/2025/08/temporada-1-episodio-1-piloto_9.html" target="_blank">Episodes</a></div>
      <div class="drop-shadow-sm drop-shadow-[#00fc22]"><a href="#cards">Characters</a></div>
      <div class="drop-shadow-sm drop-shadow-[#00fc22]"><a href="https://rickandmorty.fandom.com/es/wiki/Rickipedia" target="_blank">Wiki</a></div>
      <div class="drop-shadow-sm drop-shadow-[#00fc22]"><a href="#search">Search</a></div>
      <div class="drop-shadow-sm drop-shadow-[#00fc22]"><a href="#" onclick="showFavorites(); return false;">Favorites</a></div>
    </div>
  </div>
  `;

  document.getElementById("header").innerHTML = headerHTML;
  click(); 
}

function click() {
  const menuHeader = document.getElementById("menuheader");
  const menuModel = document.getElementById("menumodel");

  if (!menuHeader || !menuModel) return;

  menuHeader.addEventListener("click", () => {
    menuModel.classList.toggle("hidden");
  });
}

export { loadHeader, click };
