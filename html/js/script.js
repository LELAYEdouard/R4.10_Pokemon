const NB_PAR_PAGE = 25;
const table = $(".listePoke");

let page = 0;
let source = Object.values(Pokemon.all_pokemons);
let data = source

let filtre_nom = null;
let filtre_type = null;
let filtre_attaque_rapide = null;


function filtre(){
    data = source

    if (filtre_nom != null){
        data = data.filter(ele => {
            let reg = new RegExp(filtre_nom,"g");
            return reg.test(ele.name);
        })
    }

    if (filtre_type != null){
        data = data.filter(ele => {
            return null != ele.type.find(element => {
                return element.name == filtre_type
            })
        })
    }

    if (filtre_attaque_rapide != null){
        data = data.filter(ele => {
            return null != ele.attack.find(element => {
                return element.nom == filtre_attaque_rapide
            })
        })
    }
}

function tableFill(){
    let liste = data.slice(page*NB_PAR_PAGE, page*NB_PAR_PAGE+NB_PAR_PAGE)
    cible = $(".listePoke")[0]
    
    liste.forEach(element => {
        console.log(element)
        cible.appendChild(ligneFill(element))
    });
}

function ligneFill(ele){
    let ligne = document.createElement("tr");

    let attribut = document.createAttribute("id");
    attribut.value = ele.id;
    ligne.setAttributeNode(attribut);
    
    //id
    let celule = document.createElement("td");
    let texte = document.createTextNode(ele.id);
    celule.appendChild(texte);
    ligne.appendChild(celule);

    //name
    celule = document.createElement("td");
    texte = document.createTextNode(ele.name);
    celule.appendChild(texte);
    ligne.appendChild(celule);

    // type
    celule = document.createElement("td");
    texte = document.createTextNode(ele.typesName().join(" "));
    celule.appendChild(texte);
    ligne.appendChild(celule);

    //stamina
    celule = document.createElement("td");
    texte = document.createTextNode(ele.base.stamina);
    celule.appendChild(texte);
    ligne.appendChild(celule);

    //attack
    celule = document.createElement("td");
    texte = document.createTextNode(ele.base.attack);
    celule.appendChild(texte);
    ligne.appendChild(celule);

    //defance
    celule = document.createElement("td");
    texte = document.createTextNode(ele.base.defense);
    celule.appendChild(texte);
    ligne.appendChild(celule);

    //img
    celule = document.createElement("td");
    let img = document.createElement("img");

    attribut = document.createAttribute("src");
    attribut.value = `./webp/sprites/${("000"+ele.id).slice(-3)}MS.webp`;
    img.setAttributeNode(attribut);

    /*attribut = document.createAttribute("onerror");
    attribut.value = `./webp/${ele.id}MS.webp`;
    img.setAttributeNode(attribut);*/

    attribut = document.createAttribute("alt");
    attribut.value = `Pockemun numro ${ele.id}`;
    img.setAttributeNode(attribut);

    celule.appendChild(img);
    ligne.appendChild(celule);
        /*<img
    src="https://exemple.com/image-inexistante.jpg"
    onerror="this.src='/fallback.jpg';"
    alt="Image avec fallback"
    ></img>*/

    return ligne
}

function update(){
    filtre()
    tableFill()
}

tableFill()