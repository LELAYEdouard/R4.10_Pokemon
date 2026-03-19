



// getPokemonByType("Bug")
function getPokemonByType(typeName){
    console.log(Attack.all_attacks)
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
    console.log(`Liste des ${res.length} Pokemons avec l'attaque ${attackName}:`);
    res.forEach(element => {
        console.log(`- ${element.toString()}`);
    })
}

function getAttacksByType(typeName){
    console.log(Attack.all_attacks)
    Attack.all_attacks.forEach(element => {
        console.log(element)
        
    });
    // console.log(`Liste des ${res.length} Attaques du type ${typeName}:`);
    // res.forEach(element => {
    //     console.log(`- ${element.toString()}`);
    // })
}

function sortPokemonByTypeThenName(){
    let liste = Pokemon.all_pokemons.sort((a,b) => {
        if (a.type.length == b.type.length){
            a.type.sort();
            b.type.sort();
            
            for (let index = 0; index < a.type.length; index++) {
                if (a.type[index] != b.type[index]){
                    //console.log(typeof a.type[index]);
                    return a.type[index].name.localeCompare(b.type[index].name);
                }
            }
            return a.name.localeCompare(b.name);

        }
        else {
            return a.type.length - b.type.length;
        }
    });

    console.log(`Liste des ${liste.length} Pokemons trier avec leurs types puis leur nom :`);
    liste.forEach(element => {
        console.log(`- ${element.toString()}`);
    });
}



function getBestFastAttacksForEnemy(print, pokemonName){
    
}

