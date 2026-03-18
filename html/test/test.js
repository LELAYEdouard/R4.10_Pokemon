
// getPokemonByType("Bug")
function getPokemonByType(typeName){
    let liste = Pokemon.all_pokemons.filter(element => {
        return undefined != element.getTypes().find(ele => {
            return ele.name == typeName;
        });
    });


    console.log(`Liste des ${liste.length} Pokemons :`);
    liste.forEach(element => {
        console.log(`- ${element.toString()}`);
    })
}

function getPokemonByAttack(attackName){
    
    let res = Pokemon.all_pokemons.filter(element =>{
        return undefined != element.getAttacks().find(ele => {
            return ele.name == attackName;
        });
    })

    console.log(res)
}
