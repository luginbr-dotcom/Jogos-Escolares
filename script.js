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

let jogoAtual = null;

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
  contadorJogos.textContent = lista.length === 1 ? "1 jogo encontrado" : lista.length + " jogos encontrados";

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
      </div>
      <div class="card-jogar">🎮 Jogar no site <span aria-hidden="true">→</span></div>`;
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
  jogoAtual = game;

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

    <section class="game-section game-play-cta">
      <div>
        <p class="etiqueta">MODO INTERATIVO</p>
        <h2>🎮 Quer jogar agora?</h2>
        <p>Use o computador, tablet ou celular para conduzir uma rodada diretamente pelo site.</p>
      </div>
      <button class="btn-principal btn-jogar" type="button" onclick="jogarNoSite('${game.id}')">Jogar no site →</button>
    </section>

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

function jogarNoSite(id) {
  const game = games.find(item => item.id === id);
  if (!game) return;
  jogoAtual = game;
  if (id === "escadinha") renderEscadinha();
  if (id === "dado-avanco") renderDado();
  if (id === "palavra-cruzada") renderPalavraCruzada();
  if (id === "cara-a-cara") renderCaraACara();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function voltarRegras() {
  if (jogoAtual) abrirJogo(jogoAtual.id);
}

function painelJogo(titulo, subtitulo, conteudo) {
  gameContent.innerHTML = `
    <section class="play-screen">
      <div class="play-top">
        <button class="btn-secundario" type="button" onclick="voltarRegras()">← Voltar às regras</button>
        <span class="play-badge">🎮 Jogo interativo</span>
      </div>
      <div class="play-title">
        <div class="game-header-emoji">${jogoAtual.emoji}</div>
        <div><p class="etiqueta">${jogoAtual.categoria.toUpperCase()}</p><h1>${titulo}</h1><p>${subtitulo}</p></div>
      </div>
      <div id="playArea">${conteudo}</div>
    </section>`;
}

function renderEscadinha() {
  const desafios = [
    { seq: [1,2,null,4,5,6,7], resposta: 3 },
    { seq: [2,4,null,8,10,12,14], resposta: 6 },
    { seq: [5,10,15,null,25,30,35], resposta: 20 },
    { seq: [20,30,null,50,60,70,80], resposta: 40 },
    { seq: [3,6,9,12,null,18,21], resposta: 15 }
  ];
  let rodada = 0, pontos = 0;

  const iniciar = () => {
    const d = desafios[rodada];
    document.getElementById("playArea").innerHTML = `
      <div class="score-line"><strong>Rodada ${rodada + 1} de ${desafios.length}</strong><span>⭐ Pontos: ${pontos}</span></div>
      <div class="escada" aria-label="Sequência numérica">
        ${d.seq.map((n,i) => `<div class="degrau ${n === null ? "degrau-vazio" : ""}">${n === null ? "?" : n}</div>`).join("")}
      </div>
      <p class="play-question">Qual número completa a escadinha?</p>
      <div class="answer-row"><input id="respostaEscada" type="number" inputmode="numeric" aria-label="Sua resposta"><button class="btn-principal" id="btnResponderEscada">Responder</button></div>
      <p id="feedbackJogo" class="feedback" aria-live="polite"></p>`;
    document.getElementById("respostaEscada").focus();
    document.getElementById("btnResponderEscada").onclick = () => {
      const valor = Number(document.getElementById("respostaEscada").value);
      const feedback = document.getElementById("feedbackJogo");
      if (valor === d.resposta) {
        pontos++;
        feedback.className = "feedback certo";
        feedback.textContent = "🎉 Muito bem! Você descobriu a sequência.";
      } else {
        feedback.className = "feedback errado";
        feedback.textContent = `❌ Ainda não. Pense no intervalo entre os números. A resposta era ${d.resposta}.`;
      }
      document.getElementById("btnResponderEscada").disabled = true;
      const prox = document.createElement("button");
      prox.className = "btn-secundario btn-proximo";
      prox.textContent = rodada === desafios.length - 1 ? "Ver resultado" : "Próxima rodada →";
      prox.onclick = () => {
        rodada++;
        if (rodada >= desafios.length) {
          document.getElementById("playArea").innerHTML = resultado(pontos, desafios.length, "escadinha");
        } else iniciar();
      };
      document.getElementById("playArea").appendChild(prox);
    };
  };
  painelJogo("Escadinha", "Complete as sequências e descubra qual número deve ocupar o próximo degrau.", "");
  iniciar();
}

function renderDado() {
  let pos = [0,0], jogador = 0, terminou = false;
  const total = 20;

  painelJogo("Dado com Casas para Avançar", "Dois jogadores, um dado e uma trilha. Chegue primeiro à casa 20.", `
    <div class="score-line"><strong id="turnoDado">Vez do Jogador 1</strong><span>🎯 Meta: casa ${total}</span></div>
    <div class="tabuleiro" id="tabuleiroDado">${Array.from({length:total}, (_,i) => `<div class="casa" data-casa="${i+1}">${i+1}</div>`).join("")}</div>
    <div class="pecas-legenda"><span>🔵 Jogador 1: <b id="pos1">1</b></span><span>🟠 Jogador 2: <b id="pos2">1</b></span></div>
    <div class="dado-area"><div class="dado-visual" id="dadoVisual">🎲</div><button class="btn-principal" id="btnDado">Rolar dado</button></div>
    <p id="feedbackDado" class="feedback" aria-live="polite">Jogador 1 começa.</p>`);
  const atualizar = () => {
    document.querySelectorAll(".casa").forEach(c => c.classList.remove("p1","p2","p12"));
    pos.forEach((p,i) => {
      const casa = document.querySelector(`.casa[data-casa="${Math.max(1,p)}"]`);
      if (casa) casa.classList.add(i === 0 ? "p1" : "p2");
    });
    document.getElementById("pos1").textContent = Math.max(1,pos[0]);
    document.getElementById("pos2").textContent = Math.max(1,pos[1]);
  };
  document.getElementById("btnDado").onclick = () => {
    if (terminou) return;
    const valor = Math.floor(Math.random()*6)+1;
    document.getElementById("dadoVisual").textContent = ["⚀","⚁","⚂","⚃","⚄","⚅"][valor-1];
    pos[jogador] = Math.min(total, Math.max(0,pos[jogador]) + valor);
    atualizar();
    const fb = document.getElementById("feedbackDado");
    if (pos[jogador] >= total) {
      terminou = true;
      fb.className = "feedback certo";
      fb.textContent = `🏆 Jogador ${jogador+1} chegou à casa ${total} e venceu!`;
      document.getElementById("btnDado").textContent = "Jogo encerrado";
      return;
    }
    fb.className = "feedback";
    fb.textContent = `Jogador ${jogador+1} tirou ${valor} e avançou ${valor} casa(s).`;
    jogador = jogador === 0 ? 1 : 0;
    document.getElementById("turnoDado").textContent = `Vez do Jogador ${jogador+1}`;
  };
  atualizar();
}

function renderPalavraCruzada() {
  const palavras = [
    {nome:"AULA", dica:"Momento em que professor e alunos aprendem juntos.", cells:[[0,4],[1,4],[2,4],[3,4]]},
    {nome:"ESCOLA", dica:"Lugar onde estudamos.", cells:[[2,0],[2,1],[2,2],[2,3],[2,4],[2,5]]},
    {nome:"ALUNO", dica:"Pessoa que participa das aulas.", cells:[[2,5],[3,5],[4,5],[5,5],[6,5]]},
    {nome:"LIVRO", dica:"Pode ser usado para ler e estudar.", cells:[[6,2],[6,3],[6,4],[6,5],[6,6]]}
  ];
  const solucao = {};
  palavras.forEach(p => p.cells.forEach((c,i) => solucao[c.join("-")] = p.nome[i]));

  const grade = Array.from({length:7},()=>Array(7).fill(null));
  Object.entries(solucao).forEach(([key,letter]) => { const [r,c]=key.split("-").map(Number); grade[r][c]=letter; });

  const celulas = grade.flatMap((row,r)=>row.map((letter,c)=>letter === null
    ? '<div class="cross-cell blocked" aria-hidden="true"></div>'
    : `<div class="cross-cell"><input maxlength="1" data-cell="${r}-${c}" aria-label="Letra na linha ${r+1}, coluna ${c+1}"></div>`).join(""));
  painelJogo("Palavra Cruzada", "Leia as pistas e preencha as letras. As palavras se cruzam e algumas casas pertencem a mais de uma palavra.", `
    <div class="cross-layout">
      <div class="cross-grid">${celulas}</div>
      <div class="cross-clues"><h2>📝 Pistas</h2>${palavras.map((p,i)=>`<div class="clue"><strong>${i+1}. ${p.nome.length} letras</strong><p>${p.dica}</p></div>`).join("")}</div>
    </div>
    <button class="btn-principal" id="btnCorrigirCruzada">Corrigir palavra cruzada</button>
    <p id="feedbackCruzada" class="feedback" aria-live="polite"></p>`);
  document.querySelectorAll(".cross-cell input").forEach(input => input.addEventListener("input", e => e.target.value = e.target.value.toUpperCase().replace(/[^A-ZÁÉÍÓÚÃÕÂÊÔÇ]/g,"").slice(0,1)));
  document.getElementById("btnCorrigirCruzada").onclick = () => {
    let acertos=0, total=Object.keys(solucao).length;
    Object.entries(solucao).forEach(([key,letter]) => {
      const input=document.querySelector(`[data-cell="${key}"]`);
      if(input && input.value.toUpperCase()===letter) { acertos++; input.classList.add("ok"); input.classList.remove("bad"); }
      else if(input) { input.classList.add("bad"); input.classList.remove("ok"); }
    });
    const fb=document.getElementById("feedbackCruzada");
    if(acertos===total) { fb.className="feedback certo"; fb.textContent="🎉 Parabéns! Você completou toda a palavra cruzada."; }
    else { fb.className="feedback errado"; fb.textContent=`Você acertou ${acertos} de ${total} letras. Tente novamente!`; }
  };
}

function renderCaraACara() {
  const cartas = [
    {nome:"Gato", emoji:"🐱", grupo:"animal", dica:"Tem quatro patas e costuma miar."},
    {nome:"Cachorro", emoji:"🐶", grupo:"animal", dica:"É um animal doméstico e costuma latir."},
    {nome:"Leão", emoji:"🦁", grupo:"animal", dica:"É um felino e vive em grupos chamados alcateias."},
    {nome:"Peixe", emoji:"🐟", grupo:"animal", dica:"Vive na água e respira por brânquias."},
    {nome:"Maçã", emoji:"🍎", grupo:"fruta", dica:"É uma fruta que pode ser vermelha, verde ou amarela."},
    {nome:"Banana", emoji:"🍌", grupo:"fruta", dica:"É uma fruta comprida e geralmente amarela."},
    {nome:"Bola", emoji:"⚽", grupo:"objeto", dica:"Pode ser usada em vários esportes."},
    {nome:"Livro", emoji:"📚", grupo:"objeto", dica:"Pode ser usado para ler e estudar."}
  ];
  let alvo = cartas[Math.floor(Math.random()*cartas.length)];
  let perguntas = 0;
  const opcoes = cartas.map(c=>`<div class="mystery-card" data-grupo="${c.grupo}"><span>${c.emoji}</span><strong>${c.nome}</strong></div>`).join("");
  painelJogo("Cara a Cara", "O site escolheu uma carta secreta. Faça perguntas que possam ser respondidas com SIM ou NÃO e elimine possibilidades.", `
    <div class="cara-top"><div class="secret-card"><span>❓</span><strong>Personagem secreto</strong><small>Faça perguntas antes de tentar adivinhar.</small></div><div class="score-line"><span>Perguntas: <b id="qtdPerguntas">0</b></span><span>Escolha uma categoria para perguntar:</span></div></div>
    <div class="question-buttons">
      <button class="question-btn" data-q="animal">É um animal?</button>
      <button class="question-btn" data-q="fruta">É uma fruta?</button>
      <button class="question-btn" data-q="objeto">É um objeto?</button>
      <button class="question-btn" data-q="grande">É maior que uma bola?</button>
    </div>
    <p id="feedbackCara" class="feedback" aria-live="polite">Faça uma pergunta ou tente adivinhar.</p>
    <div class="mystery-grid" id="mysteryGrid">${opcoes}</div>`);
  const atualizar = () => {
    document.querySelectorAll(".mystery-card").forEach(card => {
      const nome=card.querySelector("strong").textContent;
      if (card.classList.contains("eliminado")) return;
      card.classList.toggle("eliminado", !cartas.some(c=>c.nome===nome && (c.nome===alvo.nome || !c)));
    });
  };
  document.querySelectorAll(".question-btn").forEach(btn => btn.onclick = () => {
    perguntas++;
    document.getElementById("qtdPerguntas").textContent=perguntas;
    const q=btn.dataset.q;
    let resposta;
    if(q==="animal") resposta=alvo.grupo==="animal";
    if(q==="fruta") resposta=alvo.grupo==="fruta";
    if(q==="objeto") resposta=alvo.grupo==="objeto";
    if(q==="grande") resposta=["Leão","Cachorro"].includes(alvo.nome);
    document.getElementById("feedbackCara").textContent=`🤔 Pergunta: "${btn.textContent}" → ${resposta ? "SIM" : "NÃO"}`;
    document.querySelectorAll(".mystery-card").forEach(card=>{
      const nome=card.querySelector("strong").textContent;
      const c=cartas.find(x=>x.nome===nome);
      let comp=true;
      if(q==="animal") comp=c.grupo==="animal";
      if(q==="fruta") comp=c.grupo==="fruta";
      if(q==="objeto") comp=c.grupo==="objeto";
      if(q==="grande") comp=["Leão","Cachorro"].includes(c.nome);
      if(comp!==resposta && c.nome!==alvo.nome) card.classList.add("eliminado");
    });
  });
  document.querySelectorAll(".mystery-card").forEach(card => card.onclick = () => {
    if(card.classList.contains("eliminado")) return;
    const nome=card.querySelector("strong").textContent;
    const fb=document.getElementById("feedbackCara");
    if(nome===alvo.nome) {
      fb.className="feedback certo";
      fb.textContent=`🏆 Acertou! Era ${alvo.emoji} ${alvo.nome}. Você precisou de ${perguntas} pergunta(s).`;
      document.querySelectorAll(".mystery-card").forEach(c=>c.classList.add("bloqueado"));
    } else {
      fb.className="feedback errado";
      fb.textContent="❌ Não é essa carta. Use as respostas para eliminar possibilidades e tente novamente.";
      card.classList.add("eliminado");
    }
  });
}

function resultado(pontos, total) {
  const percentual=Math.round((pontos/total)*100);
  return `
    <div class="resultado-final">
      <div class="resultado-emoji">${percentual===100 ? "🏆" : "🎉"}</div>
      <h2>Rodada encerrada!</h2>
      <p>Você acertou <strong>${pontos} de ${total}</strong> desafios (${percentual}%).</p>
      <button class="btn-principal" onclick="jogarNoSite('${jogoAtual.id}')">Jogar novamente</button>
      <button class="btn-secundario btn-proximo" onclick="voltarRegras()">Voltar às regras</button>
    </div>`;
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
