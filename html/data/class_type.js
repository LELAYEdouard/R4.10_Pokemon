class Type {

    // inisalisalise la variable all_types
    static initAllTypes() {
        let res = [];

        for (const [key, value] of Object.entries(type_effectiveness)) {
            //console.log(`${key}: ${value}`);
            if (res.find(ele => {
                return ele.name == key;
            }) == null){
                res.push(new Type(key, value));
            }
        }
        //console.table(res);
        return res;
    }

    static all_types = Type.initAllTypes();

    static getType(type){
        return Type.all_types.find(element => {
            return element == type;
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

    effectivenes(type) {
        let res = null;
        this.effectiveness.forEach(element => {
            //console.log(element[0]);
            let x = element[1].find(ele => {
                //console.log(`conpare : ${ele}/ ${type} : ${ele == type}`);
                return ele == type;
            });
            //console.log(x);
            if (x != null) {
                res = element[0];
            }
        });
        return res;
    }
}