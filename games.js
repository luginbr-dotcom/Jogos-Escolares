/*
 * BANCO DE JOGOS
 * Para adicionar um jogo, copie um objeto, cole antes de "]"
 * e altere seus campos. Não é necessário mexer no script.js.
 */
const games = [
  {
    id: "escadinha",
    nome: "Escadinha",
    emoji: "🪜",
    categoria: "Matemática",
    idade: "6 a 10 anos",
    tempo: 20,
    tamanhoDaTurma: "8 a 35 alunos",
    organizacaoDaTurma: "Turma toda",
    descricao: "Uma brincadeira de sequência numérica em que a turma ajuda a construir uma escada no quadro.",
    materiais: ["Quadro", "Giz ou pincel"],
    objetivo: "Desenvolver a contagem, a percepção de sequência e o raciocínio matemático.",
    papelDoProfessor: [
      "Explique que a turma vai construir uma escada de números e que cada aluno poderá ajudar em uma parte.",
      "Faça a primeira sequência como exemplo e pergunte qual número deve aparecer depois.",
      "Chame os alunos alternadamente para evitar que poucos respondam sempre.",
      "Se um aluno não souber, permita uma pista de um colega sem entregar imediatamente a resposta.",
      "Em caso de agitação, combine que somente o aluno chamado poderá responder."
    ],
    comoJogar: [
      "Desenhe uma escada no quadro com vários degraus.",
      "Escreva os primeiros números de uma sequência.",
      "Apague ou deixe alguns degraus sem número.",
      "Chame um aluno para descobrir qual número completa o próximo degrau.",
      "Continue até completar toda a escada.",
      "Faça novas rodadas com sequências diferentes."
    ],
    variacoes: [
      "Para facilitar, use números consecutivos começando pelo 1.",
      "Para dificultar, use sequências de 2 em 2, 5 em 5 ou 10 em 10.",
      "Use operações simples, como somar 2 a cada degrau.",
      "Em uma turma grande, divida a sala em equipes.",
      "Em espaço pequeno, faça a atividade inteiramente no quadro."
    ],
    fechamento: [
      "Como vocês descobriram qual número deveria vir depois?",
      "O que muda quando a sequência aumenta de 2 em 2?",
      "Qual sequência foi mais fácil e qual foi mais difícil?"
    ],
    habilidades: ["Contagem", "Sequência numérica", "Raciocínio lógico", "Atenção"]
  },
  {
    id: "dado-avanco",
    nome: "Dado com Casas para Avançar",
    emoji: "🎲",
    categoria: "Matemática",
    idade: "6 a 11 anos",
    tempo: 30,
    tamanhoDaTurma: "6 a 30 alunos",
    organizacaoDaTurma: "Grupos",
    descricao: "Os alunos percorrem uma trilha usando um dado para descobrir quantas casas podem avançar.",
    materiais: ["1 dado por grupo", "Folhas de papel", "Lápis", "Tampinhas ou pequenos objetos"],
    objetivo: "Praticar contagem, comparação de quantidades, atenção e tomada de decisões.",
    papelDoProfessor: [
      "Explique que cada jogador terá uma peça e que o dado determina quantas casas deverá avançar.",
      "Faça uma rodada demonstrando lentamente como contar as casas.",
      "Organize pequenos grupos para que todos tenham oportunidades de jogar.",
      "Controle a ordem das jogadas, por exemplo seguindo o sentido horário.",
      "Se houver discussão sobre uma jogada, peça que os alunos contem as casas novamente."
    ],
    comoJogar: [
      "Desenhe uma trilha com aproximadamente 20 casas.",
      "Cada jogador escolhe uma tampinha para representar sua peça.",
      "Todos colocam suas peças na primeira casa.",
      "O primeiro jogador joga o dado.",
      "Conta as casas correspondentes e move sua peça.",
      "O próximo jogador faz o mesmo.",
      "Ganha a rodada quem chegar primeiro à casa final."
    ],
    variacoes: [
      "Coloque perguntas matemáticas em algumas casas.",
      "Crie casas especiais que façam o jogador avançar ou voltar.",
      "Peça que o aluno diga em qual número vai parar antes de mover a peça.",
      "Para turmas grandes, monte várias trilhas.",
      "Em pouco espaço, faça a trilha em uma folha sobre cada mesa."
    ],
    fechamento: [
      "Como vocês descobriram quantas casas deveriam avançar?",
      "O que aconteceu quando saiu um número maior no dado?",
      "Foi importante prestar atenção na jogada dos colegas? Por quê?"
    ],
    habilidades: ["Contagem", "Atenção", "Comparação", "Raciocínio matemático", "Respeito à vez"]
  },
  {
    id: "palavra-cruzada",
    nome: "Palavra Cruzada",
    emoji: "✏️",
    categoria: "Linguagem",
    idade: "8 a 12 anos",
    tempo: 25,
    tamanhoDaTurma: "6 a 35 alunos",
    organizacaoDaTurma: "Duplas",
    descricao: "Os alunos descobrem palavras a partir de pistas relacionadas ao conteúdo estudado.",
    materiais: ["Folhas com a atividade", "Lápis ou caneta", "Quadro"],
    objetivo: "Ampliar o vocabulário, estimular a leitura e relacionar palavras aos conteúdos trabalhados em aula.",
    papelDoProfessor: [
      "Explique que as pistas ajudam a descobrir as palavras e que os alunos devem conversar antes de preencher.",
      "Resolva uma pista como exemplo na frente da turma.",
      "Organize os alunos em duplas para que possam trocar ideias.",
      "Circule pela sala fazendo perguntas que ajudem no raciocínio.",
      "Se houver disputa por respostas, peça que mostrem qual pista levou à conclusão."
    ],
    comoJogar: [
      "Entregue uma palavra cruzada para cada dupla.",
      "Leia as instruções e explique como as pistas funcionam.",
      "Resolva a primeira pista junto com a turma.",
      "As duplas continuam resolvendo as demais pistas.",
      "Quando uma dupla não souber, ela pode passar para outra pista e voltar depois.",
      "Corrija as respostas com toda a turma.",
      "Peça que os alunos expliquem algumas respostas."
    ],
    variacoes: [
      "Monte a atividade com palavras do conteúdo da aula.",
      "Para facilitar, coloque um banco de palavras.",
      "Para dificultar, retire o banco de palavras.",
      "Em turmas grandes, forme equipes de quatro alunos.",
      "Para pouco espaço, faça a atividade individualmente na carteira."
    ],
    fechamento: [
      "Qual palavra vocês não conheciam antes?",
      "Qual pista ajudou mais vocês?",
      "Como o contexto da aula ajudou a descobrir as palavras?"
    ],
    habilidades: ["Leitura", "Vocabulário", "Interpretação", "Escrita", "Trabalho em equipe"]
  },
  {
    id: "cara-a-cara",
    nome: "Cara a Cara",
    emoji: "🕵️",
    categoria: "Raciocínio",
    idade: "7 a 12 anos",
    tempo: 25,
    tamanhoDaTurma: "6 a 30 alunos",
    organizacaoDaTurma: "Duplas",
    descricao: "Um aluno escolhe secretamente uma pessoa, objeto ou personagem e o colega tenta descobrir quem é fazendo perguntas que possam ser respondidas com sim ou não.",
    materiais: ["Cartões de papel", "Lápis", "Quadro", "Opcional: imagens ou figuras relacionadas ao conteúdo"],
    objetivo: "Desenvolver a capacidade de formular perguntas, observar características, eliminar possibilidades e construir estratégias de raciocínio.",
    papelDoProfessor: [
      "Explique que o objetivo não é adivinhar rapidamente, mas fazer boas perguntas que eliminem possibilidades.",
      "Faça uma rodada de demonstração com um aluno e mostre como uma pergunta objetiva funciona.",
      "Mostre a diferença entre uma pergunta ampla e uma pergunta útil, como 'É um animal?'.",
      "Organize os alunos em duplas e determine quem começa.",
      "Para incluir alunos tímidos, permita que escolham o personagem enquanto o colega faz as perguntas.",
      "Se houver discussão, relembre que a resposta deve ser sim ou não quando a pergunta permitir.",
      "Se a turma ficar agitada, estabeleça uma pergunta por vez e um tempo para cada rodada."
    ],
    comoJogar: [
      "Prepare cartões com nomes, imagens, objetos ou personagens conhecidos pela turma.",
      "Divida os alunos em duplas.",
      "Cada aluno recebe ou escolhe secretamente um cartão.",
      "O primeiro jogador faz uma pergunta que possa ser respondida com sim ou não.",
      "O colega responde sem dar pistas adicionais.",
      "O jogador usa a resposta para eliminar possibilidades.",
      "Os alunos alternam as perguntas até alguém descobrir o cartão.",
      "Troquem os papéis e façam uma nova rodada."
    ],
    variacoes: [
      "Para facilitar, use apenas 6 a 10 possibilidades visíveis para a dupla.",
      "Para dificultar, aumente a quantidade de cartões.",
      "Use animais para trabalhar Ciências.",
      "Use personagens ou acontecimentos históricos para trabalhar História.",
      "Use figuras geométricas para trabalhar Matemática.",
      "Use palavras da aula de Língua Portuguesa para trabalhar vocabulário.",
      "Em turmas grandes, organize grupos de quatro alunos e faça dois jogadores por vez.",
      "Em espaço pequeno, todos podem permanecer sentados nas carteiras."
    ],
    fechamento: [
      "Qual tipo de pergunta ajudou mais a eliminar possibilidades?",
      "Foi melhor fazer muitas perguntas ou pensar bem antes de perguntar?",
      "Como vocês usaram as respostas para chegar à conclusão?"
    ],
    habilidades: ["Raciocínio lógico", "Formulação de perguntas", "Atenção", "Observação", "Comunicação", "Tomada de decisão"]
  }
];