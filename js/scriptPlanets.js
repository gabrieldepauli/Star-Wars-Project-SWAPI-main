const planetsNames = document.querySelectorAll("#list-characters-container ul li a");
const planetNameTitle = document.querySelector(".card-content .planet-name");
const planetImg = document.querySelector(".card-content .image-card");
const planetName = document.querySelector(".nome span");
const planetRotacao = document.querySelector(".rotacao span");
const planetOrbita = document.querySelector(".orbita span");
const planetDiametro = document.querySelector(".diametro span");
const planetClima = document.querySelector(".clima span");
const planetGravidade = document.querySelector(".gravidade span");
const planetTerreno = document.querySelector(".terreno span");
const planetAgua = document.querySelector(".agua span");
const planetPopulacao = document.querySelector(".populacao span");


// Funções

async function getPlanetData(name) {

    let url = "https://swapi.dev/api/planets/?search=" + name;

    let response = await fetch(url);

    if(response.ok) {
        let jsonUser = await response.json();
        showPlanetData(jsonUser.results[0]);
    }   
    else {
        console.log("ERRO API");
    }
}

function cleanCard() {
    planetNameTitle.textContent = "";
    planetImg.setAttribute("src", ``);
    planetName.textContent = "";
    planetRotacao.textContent = "";
    planetOrbita.textContent = "";
    planetDiametro.textContent = "";
    planetClima.textContent = "";
    planetGravidade.textContent = "";
    planetTerreno.textContent = "";
    planetAgua.textContent = "";
    planetPopulacao.textContent = "";
}

function showPlanetData(planet) {

    planetNameTitle.textContent = planet.name;
    planetImg.setAttribute("src", `assets/planetas/${planet.name}.jpg`);
    planetName.textContent = planet.name;
    planetRotacao.textContent = planet.rotation_period;
    planetOrbita.textContent = planet.orbital_period;
    planetDiametro.textContent = planet.diameter;
    planetClima.textContent = planet.climate;
    planetGravidade.textContent = planet.gravity;
    planetTerreno.textContent = planet.terrain;
    planetAgua.textContent = planet.surface_water;

    let populacao = planet.population;
    planetPopulacao.textContent = formatNumberWithCommas(populacao);
}

function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}


// Eventos

planetsNames.forEach((names) => {
    names.addEventListener("click", (e) => {
        e.preventDefault();
        cleanCard();
        getPlanetData(names.innerText);
    });
});


// Barra de pesquisa

    // Lista todos os ID's de todos os planetas em forma de chave e valor. Se o termo escrito dentro da barra de pesquisa for igual ao valor do objeto, é possível receber uma referência do elemento HTML pelo SelectElementById.

const todosOsPlanetas = {
    "Alderaan": "Alderaan",
    "Aleen Minor": "Aleen Minor",
    "Bespin": "Bespin",
    "Bestine IV": "Bestine IV",
    "Cato Neimoidia": "Cato Neimoidia",
    "Cerea": "Cerea",
    "Champala": "Champala",
    "Chandrila": "Chandrila",
    "Concord Dawn": "Concord Dawn",
    "Corellia": "Corellia",
    "Coruscant": "Coruscant",
    "Dagobah": "Dagobah",
    "Dantooine": "Dantooine",
    "Dathomir": "Dathomir",
    "Dorin": "Dorin",
    "Endor": "Endor",
    "Eriadu": "Eriadu",
    "Felucia": "Felucia",
    "Geonosis": "Geonosis",
    "Glee Anselm": "Glee Anselm",
    "Haruun Kal": "Haruun Kal",
    "Hoth": "Hoth",
    "Iktotch": "Iktotch",
    "Iridonia": "Iridonia",
    "Kalee": "Kalee",
    "Kamino": "Kamino",
    "Kashyyyk": "Kashyyyk",
    "Malastare": "Malastare",
    "Mirial": "Mirial",
    "Mon Cala": "Mon Cala",
    "Mustafar": "Mustafar",
    "Muunilinst": "Muunilinst",
    "Naboo": "Naboo",
    "Nal Hutta": "Nal Hutta",
    "Ojom": "Ojom",
    "Ord Mantell": "Ord Mantell",
    "Polis Massa": "Polis Massa",
    "Quermia": "Quermia",
    "Rodia": "Rodia",
    "Ryloth": "Ryloth",
    "Saleucami": "Saleucami",
    "Serenno": "Serenno",
    "Shili": "Shili",
    "Skako": "Skako",
    "Socorro": "Socorro",
    "Stewjon": "Stewjon",
    "Sullust": "Sullust",
    "Tatooine": "Tatooine",
    "Tholoth": "Tholoth",
    "Toydaria": "Toydaria",
    "Trandosha": "Trandosha",
    "Troiken": "Troiken",
    "Tund": "Tund",
    "Umbara": "Umbara",
    "Utapau": "Utapau",
    "Vulpter": "Vulpter",
    "Yavin IV": "Yavin IV",
    "Zolan": "Zolan",
};


document.querySelector('form[role="search"]').addEventListener('submit', function (e) {
    e.preventDefault(); 

    // Obtém o valor do campo de pesquisa e converte para letras minúsculas
    const termoProcurado = this.querySelector('input[type="search"]').value.toLowerCase();
    let count = 0;
    const modalNaoEncontrado = new bootstrap.Modal(document.getElementById('notFoundModal'));

    for (const planeta in todosOsPlanetas) {
        // Converte o nome do personagem para letras minúsculas
        const lowerCasePlaneta = planeta.toLowerCase();

        if (termoProcurado === lowerCasePlaneta) {
            // Obtém o ID do elemento a ser rolado
            const elementoId = todosOsPlanetas[planeta];
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