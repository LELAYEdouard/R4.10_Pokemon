class Pokemon {

    // inisalisalise la variable all_types
    static initAllPokemons() {
        let res = [];

        pokemons.forEach(element => {
            if (element.form == "Normal") {
                if (res.find(ele => {
                    return ele.id == element.pokemon_id;
                }) == null) {
                    res.push(new Pokemon(element));
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


        // reste a deve
    }

    toString() {
        return "a dev";
    }

}