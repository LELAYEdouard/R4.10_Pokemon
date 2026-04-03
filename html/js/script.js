const NB_PAR_PAGE = 25;
const table = $(".listePoke");

let page = 0;
let source = Object.values(Pokemon.all_pokemons);
let data = source

let filtre_nom = null;
let filtre_type = null;
let filtre_attaque_rapide = null;

let trie_id = false
let trie_type = false
let trie_name = false
let trie_stamina = false
let trie_attack = false
let trie_defence = false

function filtre() {
    data = source

    if (filtre_nom != null) {
        data = data.filter(ele => {
            let reg = new RegExp(filtre_nom, "g");
            return reg.test(ele.name);
        })
    }

    if (filtre_type != null) {
        data = data.filter(ele => {
            return null != ele.type.find(element => {
                return element.name == filtre_type
            })
        })
    }

    if (filtre_attaque_rapide != null) {
        data = data.filter(ele => {
            return null != ele.attack.find(element => {
                return element.nom == filtre_attaque_rapide
            })
        })
    }
}

function tableFill() {
    let liste = data.slice(page * NB_PAR_PAGE, page * NB_PAR_PAGE + NB_PAR_PAGE)
    //cible = $(".listePoke")[0]
    /*
    let poubel = cible.childNodes
    poubel.forEach(element => {
        cible.removeChild(element)
    });*/
    cible = $("table")[0]
    cible.removeChild($("tbody")[0])
    let tbody = document.createElement("tbody");

    liste.forEach(element => {
        //console.log(element)
        tbody.appendChild(ligneFill(element))
    });
    cible.appendChild(tbody)

}

function ligneFill(ele) {
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
    attribut.value = `./webp/sprites/${("000" + ele.id).slice(-3)}MS.webp`;
    img.setAttributeNode(attribut);

    attribut = document.createAttribute("onerror");
    attribut.value = `this.src='./webp/inconu.webp'`;
    img.setAttributeNode(attribut);

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

function update() {
    filtre()
    paging()
    tableFill()
}

function trierFalse() {
    trie_id = false
    trie_name = false
    trie_type = false
    trie_stamina = false
    trie_attack = false
    trie_defence = false
}

function trier(para) {
    switch (para) {
        case "id":
            if (trie_id == false) {

                data = data.sort((Pa, Pb) => {
                    return Pa.id - Pb.id
                });
                trierFalse()
                trie_id = true
            }
            else {
                data = data.sort((Pa, Pb) => {
                    return Pb.id - Pa.id
                });
                trie_id = false
            }
            break;

        case "name":
            if (trie_name == false) {

                data = data.sort((Pa, Pb) => {
                    return Pa.name.localeCompare(Pb.name)
                });
                trierFalse()
                trie_name = true
            }
            else {
                data = data.sort((Pa, Pb) => {
                    return Pb.name.localeCompare(Pa.name)
                });
                trie_name = false
            }

            break;

        case "type":
            if (trie_type == false) {
                data = data.sort((a, b) => {
                    if (a.type.length == b.type.length) {
                        a.type.sort();
                        b.type.sort();

                        for (let index = 0; index < a.type.length; index++) {
                            if (a.type[index] != b.type[index]) {
                                //console.log(typeof a.type[index]);
                                return a.type[index].name.localeCompare(b.type[index].name);
                            }
                        }
                        return a.name.localeCompare(b.name);

                    }
                    else {
                        return a.type.length - b.type.length;
                    }
                });
                trierFalse()
                trie_type = true
            }
            else {
                data = data.sort((b, a) => {
                    if (a.type.length == b.type.length) {
                        a.type.sort();
                        b.type.sort();

                        for (let index = 0; index < a.type.length; index++) {
                            if (a.type[index] != b.type[index]) {
                                //console.log(typeof a.type[index]);
                                return a.type[index].name.localeCompare(b.type[index].name);
                            }
                        }
                        return a.name.localeCompare(b.name);

                    }
                    else {
                        return a.type.length - b.type.length;
                    }
                });
                trie_type = false
            }





            break;

        case "stamina":
            if (trie_stamina == false) {

                data = data.sort((Pa, Pb) => {
                    return Pa.base.stamina - Pb.base.stamina
                });
                trierFalse()
                trie_stamina = true
            }
            else {
                data = data.sort((Pa, Pb) => {
                    return Pb.base.stamina - Pa.base.stamina
                });
                trie_stamina = false
            }


            break;

        case "attack":
            if (trie_attack == false) {

                data = data.sort((Pa, Pb) => {
                    return Pa.base.attack - Pb.base.attack
                });
                trierFalse()
                trie_attack = true
            }
            else {
                data = data.sort((Pa, Pb) => {
                    return Pb.base.attack - Pa.base.attack
                });
                trie_attack = false
            }


            break;

        case "defence":
            if (trie_defence == false) {

                data = data.sort((Pa, Pb) => {
                    return Pa.base.defense - Pb.base.defense
                });
                trierFalse()
                trie_defence = true
            }
            else {
                data = data.sort((Pa, Pb) => {
                    return Pb.base.defense - Pa.base.defense
                });
                trie_defence = false
            }


            break;

        default:
            break;
    }

    tableFill()
}

function paging(para = '0') {
    switch (para) {
        case '+':
            page++
            break;
        case '-':
            page--
            break;

        default:
            page = 0
            break;
    }
    
    /*cible = Object.values($('.nbPage'))
    console.log(typeof cible)
    cible.forEach(element => {
        let texte = document.createTextNode(`Page : ${page}`);
        element.appendChild(texte);
    });*/

    

    let label = document.createElement("label");
    let texte = document.createTextNode(`Page : ${page}`);
    let attribut = document.createAttribute("class");
    attribut.value = "nbPage";
    label.setAttributeNode(attribut);

    $(".nbPage")[0]
    label.appendChild(texte);
    $(".page")[0].replaceChild(label,$(".nbPage")[0])

    tableFill()
}
tableFill()