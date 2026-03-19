
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
    
    let res = Pokemon.all_pokemons.filter(element => {
        let tabAttack = element.attack.charged_moves.concat(element.attack.fast_moves);
        return tabAttack.find(move => {
            return move.nom == attackName;
        })
    });

    console.log(res)
}

function getAttacksByType(typeName){

}

function sortPokemonByTypeThenName(){

}

function getWeakestEnemies(attackName){

}

function getBestFastAttacksForEnemy(print, pokemonName){
    
}