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
            let reg = new RegExp(filtre_nom, "gi");
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
            return null != ele.attack.fast_moves.find(element => {
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

function clearPop(){
    let body = window.document.getElementsByTagName("body")[0]
    let child = window.document.getElementsByClassName("popup")[0]
    //console.log(typeof child)
    let newPop= document.createElement("div");
    let attribut = document.createAttribute("class");
    attribut.value = "popup";
    newPop.setAttributeNode(attribut);

    body.removeChild(child)
    body.appendChild(newPop)
}

function popImage(id){
    //console.log("coucou")
    clearPop()
    let pop = window.document.getElementsByClassName("popup")[0]
    //console.log(pop)
    let img = document.createElement("img");

    let attribut = document.createAttribute("src");
    attribut.value = `./webp/images/${("000" + id).slice(-3)}.webp`;
    img.setAttributeNode(attribut);

    attribut = document.createAttribute("onerror");
    attribut.value = `this.src='./webp/inconu.webp'`;
    img.setAttributeNode(attribut);

    attribut = document.createAttribute("alt");
    attribut.value = `Pockemun numro ${id}`;
    img.setAttributeNode(attribut);

    attribut = document.createAttribute("class");
    attribut.value = "survol";
    img.setAttributeNode(attribut);

    pop.appendChild(img)
}

function ligneFill(ele) {
    let ligne = document.createElement("tr");
    ligne.setAttribute("onclick",`detail(${ele.id});`);

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

    img.addEventListener("mouseover", () => {popImage(ele.id)})
    img.addEventListener("mouseleave", () => {clearPop()})

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
    let attribut = document.createAttribute("class");
    attribut.value = "selectFiltre"

    cible = $("th")
    for (let index = 0; index < cible.length; index++) {
        cible[index].removeAttribute("class")
    }

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
            
            $("th")[0].setAttributeNode(attribut)
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
            $("th")[1].setAttributeNode(attribut)
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
            $("th")[2].setAttributeNode(attribut)
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
            $("th")[3].setAttributeNode(attribut)
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
            $("th")[4].setAttributeNode(attribut)
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
            $("th")[5].setAttributeNode(attribut)
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
            if (page > 0) {
                page--
            }
            break;

        default:
            page = 0
            break;
    }

    cible = $('.page')
    conteur = $(".nbPage")
    for (let index = 0; index < cible.length; index++) {
        let label = document.createElement("label");
        let texte = document.createTextNode(`Page : ${page}`);
        label.appendChild(texte);
        let attribut = document.createAttribute("class");
        attribut.value = "nbPage";
        label.setAttributeNode(attribut);
        cible[index].replaceChild(label, conteur[index])

    }

    if (page == 0){
        cible = $('.prec')
        for (let index = 0; index < cible.length; index++) {
            let attribut = document.createAttribute("disabled");

            cible[index].setAttributeNode(attribut)
        }
    }
    else{
        cible = $('.prec')
        for (let index = 0; index < cible.length; index++) {
            let attribut = document.createAttribute("disabled");
            cible[index].removeAttribute("disabled")
        }
    }

    //console.log(`${page} == ${pageMax()}`)
    if (page == pageMax()){
        cible = $('.suiv')
        for (let index = 0; index < cible.length; index++) {
            let attribut = document.createAttribute("disabled");
            cible[index].setAttributeNode(attribut)
        }
    }
    else{
        cible = $('.suiv')
        for (let index = 0; index < cible.length; index++) {
            cible[index].removeAttribute("disabled")
        }
    }

    tableFill()
}

function pageMax() {
    //console.log(Math.floor(data.length/NB_PAR_PAGE))
    return Math.ceil(data.length/NB_PAR_PAGE)-1;
}

tableFill()
paging()


Object.keys(Type.all_types).forEach(elt => {
    let opt = document.createElement("option")
    opt.innerHTML = elt
    opt.value = elt
    document.getElementById("typeFiltre").appendChild(opt)
})

fast_moves.forEach(elt => {
    let opt = document.createElement("option")
    opt.innerHTML = elt.name
    opt.value = elt.name
    document.getElementById("fastAttackFiltre").appendChild(opt)
})



document.getElementById("nomFiltre").addEventListener('input', () => {
    filtre_nom = document.getElementById("nomFiltre").value
    update()
    console.log("update: ", filtre_nom)
})

document.getElementById("typeFiltre").addEventListener('change', () => {
    filtre_type = document.getElementById("typeFiltre").value
    if (filtre_type === "") {
        filtre_type = null
    }
    update()
    console.log("update: ", filtre_type)
})

document.getElementById("fastAttackFiltre").addEventListener('change', () => {
    filtre_attaque_rapide = document.getElementById("fastAttackFiltre").value
    if (filtre_attaque_rapide === "") {
        filtre_attaque_rapide = null
    }
    update()
    console.log("update: ", filtre_attaque_rapide)
})

function detail(id){
    let pokemon = Pokemon.getPokemonID(id)
    
    let detailConteneur = document.querySelector("#detailConteneur");
    let detail = document.querySelector("#detail");

    detail.innerHTML = `
        <h2>${pokemon.name}</h2>
        <p>ID: ${pokemon.id}</p>
        <p>Fast moves:</p>
        <ul>
            ${pokemon.attack.fast_moves.map(att => `<li>${att.affiche()}</li>`).join("")}
        </ul>
        <p>Charged moves:</p>
        <ul>
            ${pokemon.attack.charged_moves.map(att => `<li>${att.affiche()}</li>`).join("")}
        </ul>
        <p>STAMINA: ${pokemon.base.stamina}</p>
        <p>ATTACK: ${pokemon.base.attack}</p>
        <p>DEFENCE: ${pokemon.base.defense}</p>
        <p>TYPES: ${pokemon.typesName()}</p>
        <img src="./webp/thumbnails/${("000" + id).slice(-3)}.webp">
        
    `;
console.log(pokemon.attack)
    detailConteneur.classList.remove("hidden");

    
    console.log(pokemon)
    
}

document.querySelector("#detailConteneur").addEventListener("click", (e) => {
    if (e.target.id === "detailConteneur") {
        e.currentTarget.classList.add("hidden");
    }
});