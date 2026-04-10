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

    // filtre le nom sur le regex
    if (filtre_nom != null) {
        data = data.filter(ele => {
            let reg = new RegExp(filtre_nom, "gi");
            return reg.test(ele.name);
        })
    }

    // filtre sur la présence du type
    if (filtre_type != null) {
        data = data.filter(ele => {
            return null != ele.type.find(element => {
                return element.name == filtre_type
            })
        })
    }

    // filtre sur la présence de l'attaque
    if (filtre_attaque_rapide != null) {
        data = data.filter(ele => {
            return null != ele.attack.fast_moves.find(element => {
                return element.nom == filtre_attaque_rapide
            })
        })
    }
}

function tableFill() {
    // recupe juste le nombre nésésaire
    let liste = data.slice(page * NB_PAR_PAGE, page * NB_PAR_PAGE + NB_PAR_PAGE)
    //cible = $(".listePoke")[0]
    /*
    let poubel = cible.childNodes
    poubel.forEach(element => {
        cible.removeChild(element)
    });*/

    // vide le tableau
    cible = $("table")[0]
    cible.removeChild($("tbody")[0])
    let tbody = document.createElement("tbody");

    //ajoute toute les ligne
    liste.forEach(element => {
        //console.log(element)
        tbody.appendChild(ligneFill(element))
    });
    cible.appendChild(tbody)

}

// suprime la popup image et la recrée vide
function clearPop() {
    let body = window.document.getElementsByTagName("body")[0]
    let child = window.document.getElementsByClassName("popup")[0]
    //console.log(typeof child)
    let newPop = document.createElement("div");
    let attribut = document.createAttribute("class");
    attribut.value = "popup";
    newPop.setAttributeNode(attribut);

    body.removeChild(child)
    body.appendChild(newPop)
}

// ajoute la grande image dans la popup
function popImage(id) {
    //console.log("coucou")
    clearPop()
    let pop = window.document.getElementsByClassName("popup")[0]
    //console.log(pop)
    let img = document.createElement("img");

    let attribut = document.createAttribute("src");
    attribut.value = `./webp/images/${("000" + id).slice(-3)}.webp`;
    img.setAttributeNode(attribut);

    attribut = document.createAttribute("onerror");
    attribut.value = `this.src='./webp/image-none.webp'`;
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
    //crée la ligne
    let ligne = document.createElement("tr");
    ligne.setAttribute("onclick", `detail(${ele.id});`);

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
    attribut.value = `this.src='./webp/sprite-none.webp'`;
    img.setAttributeNode(attribut);

    attribut = document.createAttribute("alt");
    attribut.value = `Pockemun numro ${ele.id}`;
    img.setAttributeNode(attribut);

    // event popup
    img.addEventListener("mouseover", () => { popImage(ele.id) })
    img.addEventListener("mouseleave", () => { clearPop() })

    celule.appendChild(img);
    ligne.appendChild(celule);

    /*<img
src="https://exemple.com/image-inexistante.jpg"
onerror="this.src='/fallback.jpg';"
alt="Image avec fallback"
></img>*/

    return ligne
}

// mees tout les element a jour
function update() {
    filtre()
    paging()
    tableFill()
}

// mes tout les filtre a 0
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
    attribut.value = "selectFiltre" // souligne age

    // enleve le soulignage existent
    cible = $("th")
    for (let index = 0; index < cible.length; index++) {
        cible[index].removeAttribute("class")
    }

    switch (para) {
        case "id":
            // trie croisant
            if (trie_id == false) {

                data = data.sort((Pa, Pb) => {
                    return Pa.id - Pb.id
                });
                trierFalse()
                trie_id = true
            }
            // trie décroisant
            else {
                data = data.sort((Pa, Pb) => {
                    return Pb.id - Pa.id
                });
                trie_id = false
            }

            $("th")[0].setAttributeNode(attribut)
            break;

        case "name":
            // trie croisant
            if (trie_name == false) {

                data = data.sort((Pa, Pb) => {
                    return Pa.name.localeCompare(Pb.name)
                });
                trierFalse()
                trie_name = true
            }
            // trie décroisant
            else {
                data = data.sort((Pa, Pb) => {
                    return Pb.name.localeCompare(Pa.name)
                });
                trie_name = false
            }
            $("th")[1].setAttributeNode(attribut)
            break;

        case "type":
            // trie croisant
            if (trie_type == false) {
                data = data.sort((a, b) => {
                    // si meme nombre de type
                    if (a.type.length == b.type.length) {
                        a.type.sort();
                        b.type.sort();

                        // compare les type a1 b1, a2 b2
                        for (let index = 0; index < a.type.length; index++) {
                            if (a.type[index] != b.type[index]) {
                                //console.log(typeof a.type[index]);
                                return a.type[index].name.localeCompare(b.type[index].name);
                            }
                        }
                        // compare le nom
                        return a.name.localeCompare(b.name);

                    }
                    // si pas meme nombre de type
                    else {
                        // le plus petit est selui qui a le moin de type
                        return a.type.length - b.type.length;
                    }
                });
                trierFalse()
                trie_type = true
            }
            // trie décroisant
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
            // trie croisant
            if (trie_stamina == false) {

                data = data.sort((Pa, Pb) => {
                    return Pa.base.stamina - Pb.base.stamina
                });
                trierFalse()
                trie_stamina = true
            }
            // trie décroisant
            else {
                data = data.sort((Pa, Pb) => {
                    return Pb.base.stamina - Pa.base.stamina
                });
                trie_stamina = false
            }
            $("th")[3].setAttributeNode(attribut)
            break;

        case "attack":
            // trie croisant
            if (trie_attack == false) {

                data = data.sort((Pa, Pb) => {
                    return Pa.base.attack - Pb.base.attack
                });
                trierFalse()
                trie_attack = true
            }
            // trie décroisant
            else {
                data = data.sort((Pa, Pb) => {
                    return Pb.base.attack - Pa.base.attack
                });
                trie_attack = false
            }
            $("th")[4].setAttributeNode(attribut)
            break;

        case "defence":
            // trie croisant
            if (trie_defence == false) {

                data = data.sort((Pa, Pb) => {
                    return Pa.base.defense - Pb.base.defense
                });
                trierFalse()
                trie_defence = true
            }
            // trie décroisant
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
    //paramete de la numro de page

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

    // affiche le numero de la page
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

    // dé/blocage du bouton présédent
    if (page == 0) {
        cible = $('.prec')
        for (let index = 0; index < cible.length; index++) {
            let attribut = document.createAttribute("disabled");

            cible[index].setAttributeNode(attribut)
        }
    }
    else {
        cible = $('.prec')
        for (let index = 0; index < cible.length; index++) {
            let attribut = document.createAttribute("disabled");
            cible[index].removeAttribute("disabled")
        }
    }

    //console.log(`${page} == ${pageMax()}`)
    // dé/blocage du bouton suivant
    if (page == pageMax()) {
        cible = $('.suiv')
        for (let index = 0; index < cible.length; index++) {
            let attribut = document.createAttribute("disabled");
            cible[index].setAttributeNode(attribut)
        }
    }
    else {
        cible = $('.suiv')
        for (let index = 0; index < cible.length; index++) {
            cible[index].removeAttribute("disabled")
        }
    }

    tableFill() //renpli le tableau
}

//renvoie le numero de la page max
function pageMax() {
    //console.log(Math.floor(data.length/NB_PAR_PAGE))
    return Math.ceil(data.length / NB_PAR_PAGE) - 1;
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

function detail(id) {
    let pokemon = Pokemon.getPokemonID(id)

    let detailConteneur = document.querySelector("#detailConteneur");
    let detail = document.querySelector("#detail");

    detail.innerHTML = `
        <div class="infoPoke">
            <h2>${pokemon.name}</h2>
            <p>ID: ${pokemon.id}</p>
            <p>TYPES: ${pokemon.typesName().join(" ")}</p>
            <img src="./webp/thumbnails/${("000" + id).slice(-3)}.webp" onerror="this.src='./webp/thumbnail-none.webp'">
            
            <p>Base stats</p>
            <table>
                <thead>
                    <tr>
                        <td>STAMINA</td>
                        <td>ATTACK</td>
                        <td>DEFENCE</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${pokemon.base.stamina}</td>
                        <td>${pokemon.base.attack}</td>
                        <td>${pokemon.base.defense}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="tableAttaque">
            <p>Fast moves:</p>
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>NAME</td>
                        <td>TYPE</td>
                        <td>POWER</td>
                        <td>DURATION</td>
                    </tr>
                </thead>
                <tbody>
                    ${pokemon.attack.fast_moves.map(att => `<tr>${ligneAttaque(att)}</tr>`).join("")}
                </tbody>
            </table>

            <p>Charged moves:</p>
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>NAME</td>
                        <td>TYPE</td>
                        <td>POWER</td>
                        <td>DURATION</td>
                    </tr>
                </thead>
                <tbody>
                    ${pokemon.attack.charged_moves.map(att => `<tr>${ligneAttaque(att)}</tr>`).join("")}
                </tbody>
            </table>
        </div>
    `;
    //console.log(pokemon.attack)
    detailConteneur.classList.remove("hidden");

    // bouton de fermeture de la popup
    let x = document.createElement("button");
    let texte = document.createTextNode("x");
    x.appendChild(texte);

    let attribut = document.createAttribute("style");
    attribut.value = `color: red; margin-top: 2em;`;
    x.setAttributeNode(attribut);

    x.addEventListener("click", () => {
        //console.log("coucou")
        detailConteneur.classList.add("hidden")
    })
    window.document.getElementsByClassName("infoPoke")[0].appendChild(x);
    //console.log(pokemon)

}

document.querySelector("#detailConteneur").addEventListener("click", (e) => {
    if (e.target.id === "detailConteneur") {
        e.currentTarget.classList.add("hidden");
    }
});

function ligneAttaque(att) {
    return `<td>${att.id}</td><td>${att.nom}</td><td>${att.type}</td><td>${att.puissance}</td><td>${att.duree}</td>`
}

let plus = true

function affichePlus() {
    if (plus) {

        // affiche les th stats de base
        for (let index = 4; index <= 6; index++) {
            let attribut = document.createAttribute("class");
            attribut.value = "plusPlus";
            let ele = document.querySelector(`body>div:first-of-type th:nth-of-type(${index})`)
            //console.log(ele)
            ele.setAttributeNode(attribut)
        }

        // affiche les td stats de base
        for (let index = 4; index <= 6; index++) {
            let ele = document.querySelectorAll(`body>div:first-of-type td:nth-of-type(${index})`)
            //console.log(ele)
            ele.forEach(element => {
                let attribut = document.createAttribute("class");
                attribut.value = "plusPlus";
                element.setAttributeNode(attribut)
            });

        }

        // ajuste le css pour l'affichage
        let ele = document.querySelector(`body>div:first-of-type table`)
        let attribut = document.createAttribute("class");
        attribut.value = "tablePlus";
        //console.log(ele)
        ele.setAttributeNode(attribut)

        plus = false
    }
    else {
        // supprime les th stats de base
        for (let index = 4; index <= 6; index++) {
            let ele = document.querySelector(`body>div:first-of-type th:nth-of-type(${index})`)
            //console.log(ele)
            ele.removeAttribute("class")
        }

        // supprime les td stats de base
        for (let index = 4; index <= 6; index++) {
            let ele = document.querySelectorAll(`body>div:first-of-type td:nth-of-type(${index})`)
            //console.log(ele)
            ele.forEach(element => {
                element.removeAttribute("class")
            });
        }

        // ajuste le css pour l'affichage
        document.querySelector(`body>div:first-of-type table`).removeAttribute("class")
        plus = true
    }
}

// boutton téléphone
document.querySelector(".plus").addEventListener("click", affichePlus)