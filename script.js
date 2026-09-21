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
  painelModo(game);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function painelModo(game) {
  gameContent.innerHTML = `
    <section class="play-screen">
      <div class="play-top">
        <button class="btn-secundario" type="button" onclick="voltarRegras()">← Voltar às regras</button>
        <span class="play-badge">🎮 Escolha o nível</span>
      </div>
      <div class="play-title">
        <div class="game-header-emoji">${game.emoji}</div>
        <div>
          <p class="etiqueta">${game.categoria.toUpperCase()}</p>
          <h1>${game.nome}</h1>
          <p>Escolha uma versão adequada à turma.</p>
        </div>
      </div>
      <div class="modo-grid">
        <button class="modo-card" type="button" onclick="iniciarModo('${game.id}','basico')">
          <span class="modo-icone">🟢</span>
          <strong>Modo básico</strong>
          <small>Ideal para uma primeira rodada.</small>
          <b>Jogar →</b>
        </button>
        <button class="modo-card modo-avancado" type="button" onclick="iniciarModo('${game.id}','avancado')">
          <span class="modo-icone">🔥</span>
          <strong>Modo avançado</strong>
          <small>8º ano ao 3º ano do Ensino Médio.</small>
          <b>Jogar →</b>
        </button>
      </div>
    </section>`;
}
function iniciarModo(id, modo) {
  if (id === "escadinha") modo === "avancado" ? renderEscadinhaAvancada() : renderEscadinha();
  if (id === "dado-avanco") modo === "avancado" ? renderDadoAvancado() : renderDado();
  if (id === "palavra-cruzada") modo === "avancado" ? renderPalavraCruzadaAvancada() : renderPalavraCruzada();
  if (id === "cara-a-cara") modo === "avancado" ? renderCaraACaraAvancado() : renderCaraACara();
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
  const total = 32;

  // Tabuleiro em formato de circuito, inspirado na lógica visual de jogos de percurso
  // como o Jogo da Vida: caminho contínuo ao redor de um centro, com casas especiais.
  const especiais = {
    5: {tipo:"bonus", texto:"🎁 Bônus! Avance 2 casas."},
    9: {tipo:"pergunta", texto:"🧠 Desafio: responda uma pergunta do professor."},
    13: {tipo:"bonus", texto:"🚀 Atalho! Avance 3 casas."},
    17: {tipo:"volta", texto:"↩️ Imprevisto! Volte 2 casas."},
    21: {tipo:"pergunta", texto:"📚 Desafio: explique um conceito estudado."},
    25: {tipo:"bonus", texto:"⭐ Boa jogada! Avance 2 casas."},
    29: {tipo:"volta", texto:"🛑 Pare um turno."}
  };

  // Ordem em zigue-zague para criar um percurso visual parecido com um tabuleiro
  // de jogo de percurso, em vez de uma simples lista.
  const casas = Array.from({length: total}, (_,i) => i + 1);
  const linha = n => Math.floor((n - 1) / 8);
  const coluna = n => {
    const c = (n - 1) % 8;
    return linha(n) % 2 === 0 ? c : 7 - c;
  };

  const casaHTML = casas.map(n => {
    const especial = especiais[n];
    const classe = especial ? " casa-especial " + especial.tipo : "";
    const rotulo = n === total ? "🏁 CHEGADA" : n;
    return `<div class="casa${classe}" data-casa="${n}" style="grid-row:${linha(n)+1};grid-column:${coluna(n)+1}">
      <span class="numero-casa">${rotulo}</span>
      ${especial ? `<small>${especial.texto.split(" ")[0]}</small>` : ""}
    </div>`;
  }).join("");

  painelJogo(
    "Dado com Casas para Avançar",
    "Um tabuleiro de percurso inspirado nos jogos de vida e jornada: role o dado, avance pelo caminho e enfrente casas especiais.",
    `
      <div class="score-line">
        <strong id="turnoDado">Vez do Jogador 1</strong>
        <span>🏁 Meta: casa ${total}</span>
      </div>

      <div class="tabuleiro-vida-wrap">
        <div class="tabuleiro-vida" id="tabuleiroDado" aria-label="Tabuleiro de percurso com 32 casas">
          ${casaHTML}
          <div class="centro-tabuleiro">
            <span>🎲</span>
            <strong>Jornada</strong>
            <small>Chegue ao final!</small>
          </div>
        </div>
      </div>

      <div class="pecas-legenda">
        <span>🔵 Jogador 1: <b id="pos1">1</b></span>
        <span>🟠 Jogador 2: <b id="pos2">1</b></span>
      </div>

      <div class="dado-area">
        <div class="dado-visual" id="dadoVisual">🎲</div>
        <button class="btn-principal" id="btnDado">Rolar dado</button>
      </div>
      <p id="feedbackDado" class="feedback" aria-live="polite">Jogador 1 começa na casa 1.</p>
      <div class="legenda-casas">
        <span>🎁 Avance</span><span>↩️ Volte</span><span>🧠 Desafio</span><span>🏁 Chegada</span>
      </div>`
  );

  const atualizar = () => {
    document.querySelectorAll(".casa").forEach(c => {
      c.classList.remove("p1","p2","p12");
      const n = Number(c.dataset.casa);
      if (pos[0] === n && pos[1] === n) c.classList.add("p12");
      else if (pos[0] === n) c.classList.add("p1");
      else if (pos[1] === n) c.classList.add("p2");
    });
    document.getElementById("pos1").textContent = Math.max(1,pos[0]);
    document.getElementById("pos2").textContent = Math.max(1,pos[1]);
  };

  document.getElementById("btnDado").onclick = () => {
    if (terminou) return;

    const valor = Math.floor(Math.random()*6)+1;
    document.getElementById("dadoVisual").textContent =
      ["⚀","⚁","⚂","⚃","⚄","⚅"][valor-1];

    let novaPos = Math.min(total, Math.max(1,pos[jogador]) + valor);
    let mensagem = `Jogador ${jogador+1} tirou ${valor} e avançou ${valor} casa(s), chegando à casa ${novaPos}.`;

    if (especiais[novaPos]) {
      const e = especiais[novaPos];
      mensagem += " " + e.texto;

      if (e.tipo === "bonus") novaPos = Math.min(total, novaPos + (novaPos === 13 ? 3 : 2));
      if (e.tipo === "volta") {
        if (novaPos === 29) {
          mensagem += " O jogador perde a próxima rodada.";
        } else {
          novaPos = Math.max(1, novaPos - 2);
        }
      }
      if (e.tipo === "pergunta") {
        mensagem += " O professor pode fazer uma pergunta antes da próxima jogada.";
      }
    }

    pos[jogador] = novaPos;
    atualizar();

    const fb = document.getElementById("feedbackDado");
    if (pos[jogador] >= total) {
      terminou = true;
      fb.className = "feedback certo";
      fb.textContent = `🏆 Jogador ${jogador+1} chegou à casa ${total} e venceu a jornada!`;
      document.getElementById("btnDado").textContent = "Jogo encerrado";
      return;
    }

    fb.className = "feedback";
    fb.textContent = mensagem;
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

function renderEscadinhaAvancada(){const ds=[{s:["3","7","11","15","?"],r:"19",e:"Aumenta de 4 em 4."},{s:["2","6","18","54","?"],r:"162",e:"Cada termo é multiplicado por 3."},{s:["2","5","10","17","26","?"],r:"37",e:"As diferenças são +3,+5,+7,+9,+11."},{s:["1","1","2","3","5","8","?"],r:"13",e:"Cada termo é a soma dos dois anteriores."},{s:["4","9","7","12","10","15","?"],r:"13",e:"Alterna +5 e -2."},{s:["5","9","17","33","?"],r:"65",e:"Multiplica por 2 e subtrai 1."}];let i=0,p=0;const go=()=>{const d=ds[i];document.getElementById("playArea").innerHTML=`<div class="score-line"><strong>Desafio ${i+1} de ${ds.length}</strong><span>🔥 Pontos: ${p}</span></div><div class="desafio-avancado"><p class="etiqueta">8º ANO → 3º ENSINO MÉDIO</p><div class="sequencia-avancada">${d.s.map(n=>`<span>${n}</span>`).join("")}</div></div><p class="play-question">Qual é o próximo termo?</p><div class="answer-row"><input id="respostaEscada" type="text"><button class="btn-principal" id="btnResponderEscada">Responder</button></div><p id="feedbackJogo" class="feedback"></p>`;document.getElementById("btnResponderEscada").onclick=()=>{const v=document.getElementById("respostaEscada").value.trim(),f=document.getElementById("feedbackJogo");if(v===d.r){p++;f.className="feedback certo";f.textContent="🎯 Correto! "+d.e}else{f.className="feedback errado";f.textContent="❌ "+d.e+" Resposta: "+d.r+"."}document.getElementById("btnResponderEscada").disabled=true;const b=document.createElement("button");b.className="btn-secundario btn-proximo";b.textContent=i===ds.length-1?"Ver resultado":"Próximo desafio →";b.onclick=()=>{i++;i>=ds.length?document.getElementById("playArea").innerHTML=resultado(p,ds.length):go()};document.getElementById("playArea").appendChild(b)}};painelJogo("Escadinha — Modo avançado","Sequências, padrões e raciocínio algébrico.","");go()}

function renderDadoAvancado(){let pos=[0,0],j=0,fim=false;const total=30;const ds=[["Quanto é 15% de 200?","30"],["Se 3x+4=19, qual é x?","5"],["Raiz quadrada de 144?","12"],["Média de 6, 8 e 10?","8"],["2³ + 3² = ?","17"],["f(x)=2x+1; f(4)=?","9"],["3/4 de 80?","60"],["0,25 × 120?","30"],["Próximo primo depois de 29?","31"],["2x-6=10. Qual é x?","8"]];painelJogo("Dado Estratégico — Modo avançado","Role o dado e resolva um desafio para validar o avanço até a casa 30.",`<div class="score-line"><strong id="turnoDado">Vez do Jogador 1</strong><span>🎯 Meta: casa ${total}</span></div><div class="tabuleiro tabuleiro-avancado" id="tabuleiroDado">${Array.from({length:total},(_,i)=>`<div class="casa" data-casa="${i+1}">${i+1}</div>`).join("")}</div><div class="pecas-legenda"><span>🔵 Jogador 1: <b id="pos1">0</b></span><span>🟠 Jogador 2: <b id="pos2">0</b></span></div><div class="dado-area"><div class="dado-visual" id="dadoVisual">🎲</div><button class="btn-principal" id="btnDado">Rolar dado</button></div><div id="desafioDado" class="desafio-box hidden"></div><p id="feedbackDado" class="feedback">Jogue o dado para receber um desafio.</p>`);const up=()=>{document.querySelectorAll(".casa").forEach(c=>c.classList.remove("p1","p2"));pos.forEach((x,k)=>{const c=document.querySelector(`.casa[data-casa="${Math.max(1,x)}"]`);if(c)c.classList.add(k?"p2":"p1")});document.getElementById("pos1").textContent=pos[0];document.getElementById("pos2").textContent=pos[1]};document.getElementById("btnDado").onclick=()=>{if(fim)return;const n=Math.floor(Math.random()*6)+1,d=ds[Math.floor(Math.random()*ds.length)],box=document.getElementById("desafioDado");document.getElementById("dadoVisual").textContent=["⚀","⚁","⚂","⚃","⚄","⚅"][n-1];box.classList.remove("hidden");box.innerHTML=`<strong>Desafio:</strong><p>${d[0]}</p><input id="respostaDado"><button class="btn-principal" id="validarDado">Validar</button>`;document.getElementById("btnDado").disabled=true;document.getElementById("validarDado").onclick=()=>{const a=document.getElementById("respostaDado").value.trim().replace(",",".");const f=document.getElementById("feedbackDado");if(a===d[1]){pos[j]=Math.min(total,pos[j]+n);f.className="feedback certo";f.textContent="🎯 Correto! Avançou "+n+" casa(s)."}else{f.className="feedback errado";f.textContent="❌ Resposta: "+d[1]+". Não avança nesta rodada."}up();document.getElementById("validarDado").disabled=true;if(pos[j]>=total){fim=true;f.className="feedback certo";f.textContent="🏆 Jogador "+(j+1)+" venceu!";return}j=j?0:1;document.getElementById("turnoDado").textContent="Vez do Jogador "+(j+1);document.getElementById("btnDado").disabled=false}};up()}

function renderPalavraCruzadaAvancada(){const ps=[["ALGORITMO","Sequência ordenada de instruções para resolver um problema."],["HIPOTESE","Explicação provisória que pode ser testada."],["ENERGIA","Grandeza associada à capacidade de produzir transformações."],["CIDADANIA","Condição ligada a direitos, deveres e participação social."],["ARGUMENTO","Razão usada para sustentar uma ideia."]];painelJogo("Palavra Cruzada — Modo avançado","Vocabulário interdisciplinar para 8º ano ao Ensino Médio.",`<div class="cruzada-avancada"><p class="etiqueta">DESAFIO INTERDISCIPLINAR</p><div class="lista-definicoes">${ps.map((p,k)=>`<label><strong>${k+1}.</strong> ${p[1]}<input data-resposta="${p[0]}" placeholder="Digite a palavra"></label>`).join("")}</div><button class="btn-principal" id="btnCorrigirAvancada">Corrigir respostas</button><p id="feedbackCruzada" class="feedback"></p><details><summary>Banco de palavras opcional</summary><p>ALGORITMO • HIPOTESE • ENERGIA • CIDADANIA • ARGUMENTO</p></details></div>`);document.getElementById("btnCorrigirAvancada").onclick=()=>{let a=0;document.querySelectorAll("[data-resposta]").forEach(x=>{const ok=x.value.trim().toUpperCase()===x.dataset.resposta;x.classList.toggle("ok",ok);x.classList.toggle("bad",!ok);if(ok)a++});const f=document.getElementById("feedbackCruzada");f.className=a===ps.length?"feedback certo":"feedback errado";f.textContent=a===ps.length?"🎉 Desafio concluído!":"Você acertou "+a+" de "+ps.length+". Revise as definições."}}

function renderCaraACaraAvancado(){const cs=[["Computador","💻",["objeto","tecnologia","energia","escola"]],["Livro","📚",["objeto","cultura","escola"]],["Árvore","🌳",["vivo","natureza"]],["Bicicleta","🚲",["objeto","transporte"]],["Celular","📱",["objeto","tecnologia","energia","comunicacao"]],["Cachorro","🐶",["vivo","animal"]],["Livro digital","📖",["tecnologia","cultura","escola","energia"]],["Carro","🚗",["objeto","transporte","energia"]],["Professor","🧑‍🏫",["vivo","pessoa","escola","trabalho"]],["Robô","🤖",["objeto","tecnologia","energia","trabalho"]]];const qs=[["vivo","É um ser vivo?"],["tecnologia","Envolve tecnologia?"],["energia","Usa energia para funcionar?"],["escola","Tem relação direta com a escola?"],["transporte","Está relacionado ao transporte?"],["cultura","Está relacionado à cultura ou leitura?"],["trabalho","Pode estar ligado ao trabalho?"],["pessoa","É uma pessoa?"]];let alvo=cs[Math.floor(Math.random()*cs.length)],n=0;painelJogo("Cara a Cara — Modo avançado","Use perguntas estratégicas e tente identificar a carta com poucas perguntas.",`<div class="score-line"><strong>Perguntas: <b id="qtdPerguntas">0</b></strong><span>💡 Tente dividir as possibilidades.</span></div><div class="question-buttons">${qs.map(q=>`<button class="question-btn" data-q="${q[0]}">${q[1]}</button>`).join("")}</div><p id="feedbackCara" class="feedback">Faça uma pergunta ou tente adivinhar.</p><div class="mystery-grid">${cs.map(c=>`<div class="mystery-card" data-nome="${c[0]}"><span>${c[1]}</span><strong>${c[0]}</strong></div>`).join("")}</div>`);document.querySelectorAll(".question-btn").forEach(b=>b.onclick=()=>{n++;document.getElementById("qtdPerguntas").textContent=n;const yes=alvo[2].includes(b.dataset.q),f=document.getElementById("feedbackCara");f.textContent="🔎 "+b.textContent+" → "+(yes?"SIM":"NÃO");document.querySelectorAll(".mystery-card").forEach(card=>{if(card.classList.contains("eliminado"))return;const c=cs.find(x=>x[0]===card.dataset.nome);if(c[2].includes(b.dataset.q)!==yes&&c[0]!==alvo[0])card.classList.add("eliminado")})});document.querySelectorAll(".mystery-card").forEach(card=>card.onclick=()=>{if(card.classList.contains("eliminado"))return;const f=document.getElementById("feedbackCara");if(card.dataset.nome===alvo[0]){f.className="feedback certo";f.textContent="🏆 Acertou: "+alvo[1]+" "+alvo[0]+"! "+n+" pergunta(s).";document.querySelectorAll(".mystery-card").forEach(c=>c.classList.add("bloqueado"))}else{f.className="feedback errado";f.textContent="❌ Não é essa. Use as características.";card.classList.add("eliminado")}})}
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
