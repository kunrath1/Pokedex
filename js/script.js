const pokemonName = document.querySelector('.pokemon_name');
const pokemonNum = document.querySelector('.pokemon_num');
const pokemonImg = document.querySelector('.pokemon_img');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonAnt = document.querySelector('.btn-ant');
const buttonProx = document.querySelector('.btn-prox');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200){
    const data = await APIResponse.json();
    return data;
    }
}
const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Carregando...';
    pokemonNum.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data){
        pokemonImg.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNum.innerHTML = data.id;
        pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    } else{
        pokemonImg.style.display = 'none';
        pokemonName.innerHTML = 'Não encontrado!';
        pokemonNum.innerHTML = '';
    }
}

form.addEventListener('submit', (event) =>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonAnt.addEventListener('click', () =>{
    if(searchPokemon > 1){
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
    }
});

buttonProx.addEventListener('click', () =>{
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);