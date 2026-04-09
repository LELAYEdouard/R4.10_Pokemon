class Type {


    static all_types = {}; // version obj
    static all_types2 = []; // version liste

    // retourne obj Type
    static getType(type) {
        return Type.all_types2.find(element => {
            return element.name == type;
        });
    }

    // retourne les obj Types du poke
    static getTypeByIDPokemon(id_pokemon) {

        // recuper les nom des type
        let pokeType = pokemon_types.find(element => {
            return element.pokemon_id == id_pokemon && element.form == "Normal";
        });

        // recupérer les obj type
        return pokeType.type.map(ele => {
            //console.log(ele);
            //console.log(Type.getType(ele));
            return Type.getType(ele);
        });
    }

    constructor(type, objet) {
        this.name = type;

        let res = []

        //recupère les différent coeff
        let liste_coef = []
        for (const [key, coef] of Object.entries(objet)) {
            //console.log(`${key}: ${coef}`);
            if (liste_coef.every(element => {
                return coef != element;
            })) {
                liste_coef.push(coef);
            }
        }
        //console.table(liste_coef);

        // parcour les coeff
        liste_coef.forEach(element => {
            let ligne_coef = [element];

            // parcour des type (avec leur coef)
            let ligne_type = [];
            for (const [key, coef] of Object.entries(objet)) {
                //console.log(`${key}: ${coef}`);

                // comparaison des coefs
                if (element == coef) {
                    ligne_type.push(key);
                }
            }
            ligne_coef.push(ligne_type);
            res.push(ligne_coef);
        });

        this.effectiveness = res;
    }

    toString() {
        let message = `${this.name} : `;

        this.effectiveness.forEach(element => {
            message += element[0] + ' = [' + element[1].join(', ') + '], ';
        });
        return message.slice(0, -2);
    }

    // renvoi le coef relatif au type paramètre
    effectivenes(type) {
        let res = null;
        this.effectiveness.forEach(element => {
            //console.log(element[0]);

            // cherche la présence du type
            let x = element[1].find(ele => {
                //console.log(`conpare : ${ele}/ ${type} : ${ele == type}`);
                return ele == type;
            });
            //console.log(x);
            if (x != null) {
                res = element[0]; //affecte le coef
            }
        });
        return res;
    }
}

// inisalisalise la variable all_types obj
function fill_types() {
    let res = {};

    for (const [key, value] of Object.entries(type_effectiveness)) {
        //console.log(`${key}: ${value}`);
        
        res[key] = new Type(key, value)
    }
    //console.table(res);
    return res;
}

// inisalisalise la variable all_types liste
function fill_types2() {
    let res = [];

    for (const [key, value] of Object.entries(type_effectiveness)) {
        //console.log(`${key}: ${value}`);
        if (res.find(ele => {
            return ele.name == key;
        }) == null) {
            res.push(new Type(key, value));
        }
    }
    //console.table(res);
    return res;
}

Type.all_types = fill_types();
Type.all_types2 = fill_types2();