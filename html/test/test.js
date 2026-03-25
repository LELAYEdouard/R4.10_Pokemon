



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
    console.log(`Liste des ${res.length} Pokemons avec l'attaque ${attackName}:`);
    res.forEach(element => {
        console.log(`- ${element.toString()}`);
    })
}

function getAttacksByType(typeName){
    let res = Attack.all_attacks.filter(element => { 
        return element.type == typeName;
    });
    console.log(`Liste des ${res.length} Attaques du type ${typeName}:`);
    res.forEach(element => {
        console.log(`- ${element.toString()}`);
    })
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


function fastFight(pokemonNameA, pokemonNameB){
    pokeA = Pokemon.getPokemonName(pokemonNameA);
    pokeB = Pokemon.getPokemonName(pokemonNameB);
    pvA = pokeA.base.stamina;
    pvB = pokeB.base.stamina;

    console.log(pokeA);
    console.log(pokeB);

    let scrore = [];

    while (pvA >= 0 && pvB >= 0){
        if (scrore.length%2 == 0){
            let attack = pokeA.getBestFastAttacksForEnemy(false, pokemonNameB);
            scrore.push({
                round : (scrore.length)+1,
                attack : pokemonNameA,
                ack : pokeA.base.attack,
                defender : pokemonNameB,
                def : pokeB.base.defense,
                nameAttack : attack.atk.nom,
                effis : attack.eff,
                damage :  attack.pts,
                pvLeft : pvA=pvA-attack.pts,
            })
            //console.table(scrore);
        }
        else{
            let attack = pokeB.getBestFastAttacksForEnemy(false, pokemonNameA);
            scrore.push({
                round : (scrore.length)+1,
                attack : pokemonNameB,
                ack : pokeB.base.attack,
                defender : pokemonNameA,
                def : pokeA.base.defense,
                nameAttack : attack.atk.nom,
                effis : attack.eff,
                damage :  attack.pts,
                pvLeft : pvB=pvB-attack.pts,
            })
            //console.table(scrore);
        }
    }

    res = scrore.map(ele => {
        return {
                "Tour" : ele.round,
                "Attaquant" : ele.attack,
                "ATK" : ele.ack,
                "Défenseur" : ele.defender,
                "DEF" : ele.def,
                "Nom Attaque" : ele.nameAttack,
                "Efficacité" : ele.effis,
                "Dégâts" : ele.damage,
                "Reste" : ele.pvLeft,
        }
    });

    console.table(res);
}


