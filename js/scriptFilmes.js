const nomeFilmes = document.querySelectorAll("#list-characters-container ul li a");
const nomeFilmesTitulo = document.querySelector(".card-content .person-name");
const imgFilmes = document.querySelector(".card-content .image-card");
const nomeFilme = document.querySelector(".card-content .titulo span");
const filmeEpisodio = document.querySelector(".card-content .episodio span");
const filmeProdutor = document.querySelector(".card-content .produtor span");
const filmeLancamento = document.querySelector(".card-content .lancamento span");
const filmeDiretor = document.querySelector(".card-content .diretor span")


// Funções 

async function getFilmsData(name) {

    let url = "https://swapi.dev/api/films/?search=" + name;

    let response = await fetch(url);

    if(response.ok) {
        let jsonUser = await response.json();
        showFilmsData(jsonUser.results[0]);
    }   
    else {
        console.log("ERRO API");
    }
}

function showFilmsData(filme) {
    nomeFilmesTitulo.textContent = filme.title; 
    imgFilmes.setAttribute("src", `assets/filmes/${filme.title}.jpg`);
    nomeFilme.textContent = filme.title; 
    filmeEpisodio.textContent = filme.episode_id; 
    filmeProdutor.textContent = filme.producer; 
    filmeDiretor.textContent = filme.director;
    filmeLancamento.textContent = filme.release_date; 
}


function cleanCard() {
    nomeFilmesTitulo.textContent = ""; 
    imgFilmes.setAttribute("src", "");
    nomeFilme.textContent = ""; 
    filmeEpisodio.textContent = ""; 
    filmeProdutor.textContent = ""; 
    filmeLancamento.textContent = ""; 
    filmeDiretor.textContent = "";
}


// Eventos

nomeFilmes.forEach((nome) => {
    nome.addEventListener("click", (e) => {
        e.preventDefault();
        cleanCard();
        getFilmsData(nome.innerText);
    });
});


// Barra de pesquisa

    // Lista todos os ID's de todos os filmes em forma de chave e valor. Se o termo escrito dentro da barra de pesquisa for igual ao valor do objeto, é possível receber uma referência do elemento HTML pelo SelectElementById.

const todosOsFilmes = {
    'A New Hope': 'A New Hope',
    'The Empire Strikes Back': 'The Empire Strikes Back',
    'Return of the Jedi': 'Return of the Jedi',
    'The Phantom Menace': 'The Phantom Menace',
    'Attack of the Clones': 'Attack of the Clones',
    'Revenge of the Sith': 'Revenge of the Sith',
};


document.querySelector('form[role="search"]').addEventListener('submit', function (e) {
    e.preventDefault(); 

    // Obtém o valor do campo de pesquisa e converte para letras minúsculas
    const termoProcurado = this.querySelector('input[type="search"]').value.toLowerCase();
    let count = 0;
    const modalNaoEncontrado = new bootstrap.Modal(document.getElementById('notFoundModal'));

    for (const filme in todosOsFilmes) {
        // Converte o nome do personagem para letras minúsculas
        const lowerCaseFilme = filme.toLowerCase();

        if (termoProcurado === lowerCaseFilme) {
            // Obtém o ID do elemento a ser rolado
            const elementoId = todosOsFilmes[filme];
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