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

    static all_attacks = [];
    
    static getAttack(pokId){
        
        let pok = pokemon_moves.find((element) => {
            return element.pokemon_id == pokId && element.form == "Normal";
        });
        
        let tabAC = [];
        let tabAF = [];

        pok.charged_moves.forEach(element => {
            
            let var1 = charged_moves.find(elt =>{
                return elt.name == element;
            })
            

            if(var1){
                tabAC.push(Attack.all_attacks[var1.move_id])
            }
            
            
        });
        
        pok.fast_moves.forEach(element => {

            let var1 = fast_moves.find(elt =>{
                return elt.name == element;
            })
            

            if(var1){
                tabAF.push(Attack.all_attacks[var1.move_id])
            }
            
        });
        return {charged_moves : tabAC, fast_moves : tabAF};

    }

    static getAttackByName(nom){
        //console.log(Attack.all_attacks);
        let res = Attack.all_attacks.find((element) => {
            if (element == undefined){
                return false;
            }
            return element.nom == nom;
        });

        return res;   
    }
}


function _fill_attacks(){
    let res = [];
    
    fast_moves.forEach(element => {
        res[element.move_id] = new Attack(element.move_id,element.name,element.type,element.power,element.duration);
    });
    
    charged_moves.forEach(element => {
        res[element.move_id] = new Attack(element.move_id,element.name,element.type,element.power,element.duration);
    });

    return res;
    
}

Attack.all_attacks = _fill_attacks()