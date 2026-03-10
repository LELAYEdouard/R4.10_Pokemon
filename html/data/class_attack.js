class Attack {
    id;
    nom;
    type;
    puissance;
    duree;
    static all_attacks = {};

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

        fast_moves.forEach(element => {
            this.all_attacks[element.move_id] = new Attack(element.move_id,element.name,element.type,element.power,element.duration);
        });

        charged_moves.forEach(element => {
            this.all_attacks[element.move_id] = new Attack(element.move_id,element.name,element.type,element.power,element.duration);
        });

       
    }
}

Attack.fill_attacks()
console.log(Attack.all_attacks["13"].toString());