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
    
    static fill_attacks(){
        let res = {};

        fast_moves.forEach(element => {
            res[element.move_id] = new Attack(element.move_id,element.name,element.type,element.power,element.duration);
        });
        
        charged_moves.forEach(element => {
            res[element.move_id] = new Attack(element.move_id,element.name,element.type,element.power,element.duration);
        });
        
        return res;
    }

    static all_attacks = Attack.fill_attacks();
    
    static getAttack(attId){
        return Attack.all_attacks[attId];
    }
}


