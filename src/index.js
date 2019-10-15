const PREFIX_URL = "http://localhost:3000/pokemon"
const pokemonList = document.getElementById("pokemon-container")
const input = document.getElementById("pokemon-search-input")
document.addEventListener('DOMContentLoaded', () => {
  console.log(POKEMON)
  //YOUR CODE HERE
  fetchPokemons().then(pokemons => pokemons.forEach(pokemon => pokemonList.innerHTML += pokemonCard(pokemon)))
})

input.addEventListener('input', (event)=>{
  filterPokemons(event.target.value);
  console.log(event.target.value)
})

pokemonList.addEventListener('click', ()=> {
  let toggle = false;
  if (event.target.tagName === "IMG" ){
    toggle = !toggle;
    
    if(event.target.style.display == "block"){
      // event.target.parentNode.getElementsByClassName("toggle-front")
      event.target.style.display = "none";
      if(event.target.nextElementSibling){
        event.target.nextElementSibling.style.display = "block";
      }else{
        event.target.previousElementSibling.style.display = "block";
      }
    }
  }
})

function fetchPokemons(){
  return fetch(PREFIX_URL)
  .then(resp => resp.json());
}

function filterPokemons(string){
  let allPokemons = document.querySelectorAll(".pokemon-card");
  allPokemons.forEach(pokemon => {
    if (pokemon.innerText.includes(string)){
      pokemon.style.display = "block"
    }else{
      pokemon.style.display = "none";
    }
  })
}

//************************************************Helper Mehtod*************************************************

function pokemonCard(pokemon){
  return `
  <div class="pokemon-card">
  <div class="pokemon-frame">
    <h1 class="center-text">${pokemon.name}</h1>
    <div class="pokemon-image">
      <img data-id=${pokemon.id} data-action="flip" class="toggle-front" src=${pokemon.sprites.front} style = "display: block;">
      <img data-id=${pokemon.id} data-action="flip" class="toggle-back" src=${pokemon.sprites.back} style= "display: none;">
    </div>
    <p>Height: ${pokemon.height}<br>Weight: ${pokemon.weight}<br>Type: ${pokemon.types.join("/")}<p>
  </div>
</div>
  `
}