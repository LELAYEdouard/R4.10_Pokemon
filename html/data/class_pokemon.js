

class Pokemon {

    static all_pokemons = [];

    static getPokemonID(id) {
        return Type.all_types.find(element => {
            return element.id == id;
        });
    }

    static getPokemonName(name) {
        return Type.all_types.find(element => {
            return element.name == name;
        });
    }

    static getWeakestEnemies(attackName){
        let ack = Attack.getAttackByName(attackName);
        let type = Type.getType(ack.type);
        console.log(type.toString());
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
        if(print){
            console.log(Pokemon.getWeakestEnemies(pokemonName))
        }else{

        }
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