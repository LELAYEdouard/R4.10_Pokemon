class Pokemon {

    // inisalisalise la variable all_types
    static initAllPokemons() {
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

    static all_pokemons = Pokemon.initAllPokemons();

    static getPokemonID(id){
        return Type.all_types.find(element => {
            return element.id == id;
        });
    }

    static getPokemonName(name){
        return Type.all_types.find(element => {
            return element.name == name;
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
        this.attack= [];
        // reste a deve
    }

    toString() {
        return `${this.name} : #${this.id} [${this.form}], [STA ${this.base.stamina}, ATK ${this.base.attack}, DEF ${this.base.defense}], Rapides = [], Chargée = []`;
    }

    getTypes(){
        return this.type;
    }

    getAttacks(){
        return this.attack;
    }
}