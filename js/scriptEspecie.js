const todasEspecies = document.querySelectorAll("#list-characters-container ul li a");
const especieTituloNome = document.querySelector(".card-content .person-name");
const especieImg = document.querySelector(".card-content .image-card");
const especieNome = document.querySelector(".card-content .nome span");
const especieClassificacao = document.querySelector(".card-content .classificacao span");
const especieDenominacao = document.querySelector(".card-content .denominacao span");
const especieAltura = document.querySelector(".card-content .altura span");
const especieOlhos = document.querySelector(".card-content .olhos span");
const especieVida = document.querySelector(".card-content .vida span");
const especiePlanetaNatal = document.querySelector(".card-content .planeta-natal span");
const especieIdioma = document.querySelector(".card-content .idioma span");
const especiePele = document.querySelector(".card-content .pele span");
const especieCabelo = document.querySelector(".card-content .cabelo span");


// Funções

async function getSpeciesData(name) {

    let url = "https://swapi.dev/api/species/?search=" + name;

    let response = await fetch(url);

    if(response.ok) {
        let jsonUser = await response.json();
        showSpeciesData(jsonUser.results[0]);
    }   
    else {
        console.log("ERRO API");
    }
}

function cleanCard() {
    especieTituloNome.textContent = ""; 
    especieImg.setAttribute("src", "");
    especieNome.textContent = ""; 
    especieClassificacao.textContent = ""; 
    especieDenominacao.textContent = ""; 
    especieAltura.textContent = ""; 
    especieOlhos.textContent = "";
    especieVida.textContent = "";
    especiePlanetaNatal.textContent = "";
    especieIdioma.textContent = "";
    especieCabelo.textContent = "";
    especiePele.textContent = "";
}

async function showSpeciesData(specie) {
    especieTituloNome.textContent = specie.name; 
    especieImg.setAttribute("src", `assets/especies/${specie.name}.jpg`);
    especieNome.textContent = specie.name;
    especieClassificacao.textContent = specie.classification;
    especieDenominacao.textContent = specie.designation; 
    especieAltura.textContent = specie.average_height; 
    especieOlhos.textContent = specie.eye_colors;
    especieVida.textContent = specie.average_lifespan;
    especiePlanetaNatal.textContent = await getHomeworldData(specie.homeworld);
    especieIdioma.textContent = specie.language;
    especieCabelo.textContent = specie.hair_colors;
    especiePele.textContent = specie.skin_colors;
}

async function getHomeworldData(homeworld) {

    let url =  homeworld;

    let response = await fetch(url);

    if(response.ok) {
        let jsonUser = await response.json();
        return jsonUser.name;
    }   
    else {
        console.log("ERRO API");
    }
}


// Eventos

todasEspecies.forEach((names) => {
    names.addEventListener("click", (e) => {
        e.preventDefault();
        cleanCard();
        getSpeciesData(names.innerText);
    });
});


// Barra de pesquisa

    // Lista todos os ID's de todos as espécies em forma de chave e valor. Se o termo escrito dentro da barra de pesquisa for igual ao valor do objeto, é possível receber uma referência do elemento HTML pelo SelectElementById.

const todasAsEspecies = {
    "Aleena": "Aleena",
    "Besalisk": "Besalisk",
    "Cerean": "Cerean",
    "Chagrian": "Chagrian",
    "Clawdite": "Clawdite",
    "Droid": "Droid",
    "Ewok": "Ewok",
    "Geonosian": "Geonosian",
    "Gungan": "Gungan",
    "Human": "Human",
    "Hutt": "Hutt",
    "Iktotchi": "Iktotchi",
    "Kaleesh": "Kaleesh",
    "Kaminoan": "Kaminoan",
    "Mirialan": "Mirialan",
    "Mon Calamari": "Mon Calamari",
    "Muun": "Muun",
    "Nautolan": "Nautolan",
    "Neimodian": "Neimodian",
    "Quermian": "Quermian",
    "Rodian": "Rodian",
    "Skakoan": "Skakoan",
    "Sullustan": "Sullustan",
    "Tholothian": "Tholothian",
    "Togruta": "Togruta",
    "Toong": "Toong",
    "Toydarian": "Toydarian",
    "Trandoshan": "Trandoshan",
    "Twi'lek": "Twi'lek",
    "Vulptereen": "Vulptereen",
    "Wookie": "Wookie",
    "Xexto": "Xexto",
    "Yoda's species": "Yoda's species",
    "Zabrak": "Zabrak",
};


document.querySelector('form[role="search"]').addEventListener('submit', function (e) {
    e.preventDefault();

    // Obtém o valor do campo de pesquisa e converte para letras minúsculas
    const termoProcurado = this.querySelector('input[type="search"]').value.toLowerCase();
    let count = 0;
    const modalNaoEncontrado = new bootstrap.Modal(document.getElementById('notFoundModal'));
    
    for (const especie in todasAsEspecies) {
        // Converte o nome do personagem para letras minúsculas
        const lowerCaseEspecie = especie.toLowerCase();

        if (termoProcurado === lowerCaseEspecie) {
            // Obtém o ID do elemento a ser rolado
            const elementoId = todasAsEspecies[especie];
            const elemento = document.getElementById(elementoId);
            count++;
            
            if (elemento) {
                // Adiciona a classe de fundo temporário ao elemento de texto
                elemento.classList.add('background-temp');

                // Rola até o elemento
                elemento.scrollIntoView({ behavior: 'smooth' });

                // Remove a classe de fundo temporário após 1 segundo
                setTimeout(() => {
                    elemento.classList.remove('background-temp');
                }, 1000);

                return; // Sai do loop se a correspondência for encontrada
            }
        }  
    }

    if(count == 0) {
        modalNaoEncontrado.show();
    }
});