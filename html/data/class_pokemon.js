class Pokemon{
    id;
    nom;
    stamina;
    base_att;
    base_def;
    types;
    att_rap;
    att_charg;
    
    static all_pokemons;

    constructor(i,n,s,ba,bd,t,ar,ac){
        this.id=i;
        this.nom=n;
        this.stamina=s;
        this.base_att=ba;
        this.base_def=bd;
        this.types=t;
        this.att_rap=ar;
        this.att_charg=ac;
    }

    toString(){ 
        return `${this.nom} : #${this.id}, [${this.types}], [STA: ${this.stamina},ATK: ${this.base_att},DEF:${this.base_def}], Rapides = [${this.att_rap}], Chargées = [${this.att_charg}]`;
    }

    static all_pokemons(){
 
    }

    getTypes(){
        return this.types;
    }

    getAttacks(){
        return this.att_rap
    }
}