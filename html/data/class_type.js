class Type {
    
    static init_all_types() {
        let res = [];
        
        pokemon_types.forEach(element => {
            res.push(new Type());
        });

        return res;
    }
    
    static all_types = Type.init_all_types();

    constructor(objet){
        this.nom = objet.
    }
}