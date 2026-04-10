class Attack {
    id;
    nom;
    type;
    puissance;
    duree;
    
    constructor(i,n,t,p,d){
        this.id = i;
        this.nom=n;
        this.type=t;
        this.puissance=p;
        this.duree=d;
        
    }
    
    toString(){
        return `${this.nom} : #${this.id}, ${this.type}, ${this.puissance}, ${this.duree}ms`;
    }

    affiche(){
        return `${this.nom} : N°${this.id}, Type: ${this.type}, Puissance: ${this.puissance}, Duree: ${this.duree}ms`;
    }

    static all_attacks = {};
    static all_attacks2 = [];

    //renvoie les attaques d'un pokemon par son ID
    static getAttack(pokId){
        
        //recupere les attaques d'un pokemon Normal par son id
        let pok = pokemon_moves.find((element) => {
            return element.pokemon_id == pokId && element.form == "Normal";
        });
        
        let tabAC = [];
        let tabAF = [];

        //boucle sur les attaques chargés
        pok.charged_moves.forEach(element => {
            
            let var1 = charged_moves.find(elt =>{
                return elt.name == element;
            })
            
            //met dans la liste des attaques l'objet Attack correspondant a l'attaque du pokemon
            if(var1){
                tabAC.push(Attack.all_attacks[var1.move_id])
            }
            
        });
        
        //boucle sur les attaques rapides
        pok.fast_moves.forEach(element => {

            let var1 = fast_moves.find(elt =>{
                return elt.name == element;
            })
            
            //met dans la liste des attaques l'objet Attack correspondant a l'attaque du pokemon
            if(var1){
                tabAF.push(Attack.all_attacks[var1.move_id])
            }
            
        });
        //renvoie un objet contenant les listes des objet Attack 
        return {charged_moves : tabAC, fast_moves : tabAF};

    }

    //renvoire toutes les attaques rapides 
    static getAllAttackFast(){
        fast_moves.forEach(element => {
            console.log(element.name)
        })
    }

    //renvoie une attaque par son nom en parametre
    static getAttackByName(nom){
        //console.log(Attack.all_attacks);
        let res = Attack.all_attacks2.find((element) => {
            if (element == undefined){
                return false;
            }
            return element.nom == nom;
        });

        return res;   
    }
}

//renvoie un objet de toutes les attaques indexés sur leur id
function fill_attacks(){
    let res = {};
    
    fast_moves.forEach(element => {
        res[element.move_id] = new Attack(element.move_id,element.name,element.type,element.power,element.duration);
    });
    
    charged_moves.forEach(element => {
        res[element.move_id] = new Attack(element.move_id,element.name,element.type,element.power,element.duration);
    });

    return res;
    
}

//renvoie un tableau de toutes les attaques indexés sur leur id
function fill_attacks2(){
    let res = [];
    
    fast_moves.forEach(element => {
        res[element.move_id] = new Attack(element.move_id,element.name,element.type,element.power,element.duration);
    });
    
    charged_moves.forEach(element => {
        res[element.move_id] = new Attack(element.move_id,element.name,element.type,element.power,element.duration);
    });

    return res;
    
}

Attack.all_attacks = fill_attacks()
Attack.all_attacks2 = fill_attacks2()