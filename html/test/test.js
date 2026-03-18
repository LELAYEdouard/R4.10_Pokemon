
function getPokemonByType(){
    let liste = Pokemon.all_pokemons.filter(element => {
        return null != element.getTypes();
    });
}