const todasAsPaginas = {
    "Personagens": "people.html",
    "Planetas": "planets.html",
    "Espaçonaves": "starships.html",
    "Veículos": "vehicles.html",
    "Filmes": "films.html",
    "Espécies": "species.html"
};

document.querySelector('form[role="search"]').addEventListener('submit', function (e) {
    e.preventDefault();

    // Obtém o valor do campo de pesquisa
    const termoProcurado = this.querySelector('input[type="search"]').value;

    // Obtém o elemento do modal "não encontrado"
    const modalNaoEncontrado = new bootstrap.Modal(document.getElementById('notFoundModal'));

    if (termoProcurado in todasAsPaginas) {
        // Redireciona o usuário para a página correspondente
        const redirectURL = todasAsPaginas[termoProcurado];
        window.location.href = redirectURL;
    } else {
        // Exibe o modal de "não encontrado"
        modalNaoEncontrado.show();
    }
});