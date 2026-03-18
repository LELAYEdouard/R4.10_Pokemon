
// getPokemonByType("Bug")
function getPokemonByType(typeName){
    let liste = Pokemon.all_pokemons.filter(element => {
        return undefined != element.getTypes().find(ele => {
            return ele.name == typeName;
        });
    });


    for (let index = 0; index < liste.length; index++) {
        
        console.log(`- ${index+1}> ${liste[index].toString()}`);
    }
}