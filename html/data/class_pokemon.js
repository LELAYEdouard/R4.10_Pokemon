

class Pokemon {

    static all_pokemons = [];

    static getPokemonID(id) {
        return Pokemon.all_pokemons.find(element => {
            return element.id == id;
        });
    }

    static getPokemonName(name) {
        return Pokemon.all_pokemons.find(element => {
            if(element == undefined){
                return false;
            }
            return element.name == name;
        });
    }

    static getPokemonsByType(type) {
        return Pokemon.all_pokemons.filter(element => {
            return element.type.find(element => {
                return element.name == type;
            }) != undefined;
        });
    }

    static getWeakestEnemies(attackName) {
        let ack = Attack.getAttackByName(attackName);
        let type = Type.getType(ack.type);

        let max = 0;
        let liste_type;

        type.effectiveness.forEach(element => {
            if (element[0] > max) {
                max = element[0];
                liste_type = element[1];
            }
        });

        //console.table(liste_type);
        let liste_poke = [];

        liste_type.forEach(element => {
            //console.log(Pokemon.getPokemonsByType(element));
            liste_poke = liste_poke.concat(Pokemon.getPokemonsByType(element));
        })

        let uniqueArray = liste_poke.filter(function (item, pos) {
            return liste_poke.indexOf(item) == pos;
        })

        //console.log(uniqueArray);

        console.log(`Liste des ${uniqueArray.length} Pokemons ou l'attaque ${attackName} est efficase sur eux : `);
        uniqueArray.forEach(element => {
            console.log(`- ${element.toString()}`);
        });
    }


    constructor(objet) {
        this.id = objet.pokemon_id;
        this.name = objet.pokemon_name;
        this.form = objet.form;

        this.base = {
            attack: objet.base_attack,
            defense: objet.base_defense,
            stamina: objet.base_stamina
        };

        this.type = Type.getTypeByIDPokemon(this.id);
        this.attack = Attack.getAttack(this.id);
        // reste a deve
    }

    toString() {
        return `${this.name} : #${this.id} [${this.typesName().join(", ")}], [STA ${this.base.stamina}, ATK ${this.base.attack}, DEF ${this.base.defense}], Rapides = [${this.attacksFastName().join(", ")}], Chargée = [${this.attacksChargedName().join(", ")}]`;
    }

    typesName() {
        return this.type.map(ele => {
            return ele.name;
        })
    }

    attacksFastName() {
        return this.attack.fast_moves.map(ele => {
            return ele.nom;
        })
    }

    attacksChargedName() {
        return this.attack.charged_moves.map(ele => {
            return ele.nom;
        })
    }

    getTypes() {
        return this.type;
    }

    getAttacks() {
        return this.attack;
    }

    getBestFastAttacksForEnemy(print, pokemonName){
        
        let tabAttack = this.attack.fast_moves;
        let ennemi= Pokemon.getPokemonName(pokemonName);
        let max = -1;
        let obj = {};
        obj.atk = {nom:""}
        obj.pts = 0
        obj.eff = 0
        tabAttack.forEach(element => {
            
            
            let ack = Attack.getAttackByName(element.nom);
            let type = Type.getType(ack.type);
            let coef = 1;
            ennemi.getTypes().forEach(typeEnnemi=>{
                
                coef *=type.effectivenes(typeEnnemi.name)
            })
            let degat = element.puissance * coef * (this.base.attack / ennemi.base.defense)
            if(print){
                console.log(element.toString() ," : ", degat)
            }
            if(max < degat || (max == degat && ack.nom.localeCompare(obj.atk.nom) == -1)){
                max = degat;
                obj.atk = ack
                obj.pts = degat
                obj.eff = coef
            } 
            
        })
        
        return obj;
    }


    
}



// inisalisalise la variable all_types
function fill_pokemons() {
    let res = [];

    pokemons.forEach(element => {
        if (element.form == "Normal") {
            if (res[element.pokemon_id] == undefined) {
                res[element.pokemon_id] = new Pokemon(element);
            }
        }
    });
    //console.table(res);
    return res;
}

Pokemon.all_pokemons = fill_pokemons();