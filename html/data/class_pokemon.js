class Pokemon {

    // inisalisalise la variable all_types
    static initAllPokemons() {
        let res = [];

        pokemons.forEach(element => {
            if (element.form == "Normal") {

                if (res.find(ele => {
                    return ele.id == element.pokemon_id;
                }) == null) {
                    res.push(new Pokemon(key, value));
                }
            }
        });
        //console.table(res);
        return res;
    }

    static all_pokemons = Pokemon.initAllPokemons();

    constructor(objet) {
        this.id = objet.pokemon_id;
        this.nom = objet.pokemon_name;


        
    }

    toString() {
        return "a dev";
    }

}