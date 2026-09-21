const paginaInicial = document.getElementById("paginaInicial");
const paginaJogos = document.getElementById("paginaJogos");
const paginaJogo = document.getElementById("paginaJogo");
const btnEscolherJogo = document.getElementById("btnEscolherJogo");
const btnInicio = document.getElementById("btnInicio");
const btnVoltar = document.getElementById("btnVoltar");
const btnImprimir = document.getElementById("btnImprimir");
const busca = document.getElementById("busca");
const categoriaFiltro = document.getElementById("categoriaFiltro");
const tempoFiltro = document.getElementById("tempoFiltro");
const gamesGrid = document.getElementById("gamesGrid");
const contadorJogos = document.getElementById("contadorJogos");
const gameContent = document.getElementById("gameContent");

function mostrarPagina(pagina) {
  paginaInicial.classList.add("hidden");
  paginaJogos.classList.add("hidden");
  paginaJogo.classList.add("hidden");
  pagina.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

btnEscolherJogo.addEventListener("click", () => mostrarPagina(paginaJogos));
btnInicio.addEventListener("click", () => mostrarPagina(paginaInicial));
btnVoltar.addEventListener("click", () => mostrarPagina(paginaJogos));
btnImprimir.addEventListener("click", () => window.print());

function renderGames(lista) {
  gamesGrid.innerHTML = "";
  contadorJogos.textContent = lista.length === 1
    ? "1 jogo encontrado"
    : lista.length + " jogos encontrados";

  if (!lista.length) {
    gamesGrid.innerHTML = '<div class="sem-resultados"><h2>🔎 Nenhum jogo encontrado</h2><p>Tente mudar o nome ou retirar algum filtro.</p></div>';
    return;
  }

  lista.forEach(game => {
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.categoria = game.categoria;
    card.tabIndex = 0;
    card.setAttribute("aria-label", "Abrir regras do jogo " + game.nome);
    card.innerHTML = `
      <div class="card-emoji" aria-hidden="true">${game.emoji}</div>
      <h2>${game.nome}</h2>
      <p class="card-descricao">${game.descricao}</p>
      <div class="card-tags">
        <span class="tag">⏱ ${game.tempo} min</span>
        <span class="tag">👧 ${game.idade}</span>
        <span class="tag">👥 ${game.organizacaoDaTurma}</span>
      </div>`;
    card.addEventListener("click", () => abrirJogo(game.id));
    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        abrirJogo(game.id);
      }
    });
    gamesGrid.appendChild(card);
  });
}

function abrirJogo(id) {
  const game = games.find(item => item.id === id);
  if (!game) return;

  gameContent.innerHTML = `
    <header class="game-header">
      <div class="game-header-top">
        <div class="game-header-emoji" aria-hidden="true">${game.emoji}</div>
        <div><p class="etiqueta">${game.categoria.toUpperCase()}</p><h1>${game.nome}</h1></div>
      </div>
      <p class="game-intro">${game.descricao}</p>
      <div class="info-grid">
        <div class="info-box"><strong>👧 Faixa etária</strong>${game.idade}</div>
        <div class="info-box"><strong>👥 Tamanho da turma</strong>${game.tamanhoDaTurma}</div>
        <div class="info-box"><strong>⏱ Tempo estimado</strong>${game.tempo} minutos</div>
      </div>
    </header>

    <section class="game-section"><h2>🎯 Objetivo pedagógico</h2><p>${game.objetivo}</p></section>
    <section class="game-section"><h2>🏫 Como organizar a sala</h2><p><strong>Organização:</strong> ${game.organizacaoDaTurma}</p><p>Organize os alunos de maneira que todos consigam acompanhar as instruções e participar da atividade.</p></section>
    <section class="game-section"><h2>✏️ Materiais necessários</h2><ul>${game.materiais.map(item => `<li>${item}</li>`).join("")}</ul></section>
    <section class="game-section"><h2>👩‍🏫 Papel do professor</h2><ul>${game.papelDoProfessor.map(item => `<li>${item}</li>`).join("")}</ul></section>
    <section class="game-section"><h2>▶️ Como jogar</h2><ol>${game.comoJogar.map(item => `<li>${item}</li>`).join("")}</ol></section>
    <section class="game-section"><h2>🔄 Variações e adaptações</h2><ul>${game.variacoes.map(item => `<li>${item}</li>`).join("")}</ul></section>
    <section class="game-section"><h2>💬 Fechamento</h2><p>Ao terminar, converse rapidamente com a turma:</p><ul>${game.fechamento.map(item => `<li>${item}</li>`).join("")}</ul></section>
    <section class="game-section"><h2>🧠 Habilidades trabalhadas</h2><div class="habilidades">${game.habilidades.map(item => `<span class="habilidade">${item}</span>`).join("")}</div></section>
  `;

  mostrarPagina(paginaJogo);
}

function aplicarFiltros() {
  const texto = busca.value.trim().toLowerCase();
  const categoria = categoriaFiltro.value;
  const tempo = tempoFiltro.value;

  const filtrados = games.filter(game =>
    game.nome.toLowerCase().includes(texto) &&
    (!categoria || game.categoria === categoria) &&
    (!tempo || game.tempo <= Number(tempo))
  );

  renderGames(filtrados);
}

busca.addEventListener("input", aplicarFiltros);
categoriaFiltro.addEventListener("change", aplicarFiltros);
tempoFiltro.addEventListener("change", aplicarFiltros);
renderGames(games);