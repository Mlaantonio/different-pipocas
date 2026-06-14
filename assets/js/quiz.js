// VARIÁVEIS DO DOM
const quizBox = document.getElementById('quiz-box');
const resultBox = document.getElementById('result-box');
const resultContent = document.getElementById('result-content');
const restartButton = document.getElementById('restart-button');

// ESTADO DO QUIZ
let currentQuestionIndex = 0;
let scores = {}; // Objeto para armazenar as pontuações de cada sabor

// 1. Definição dos Sabores e Perguntas
//
// *************************************************************************
// ******* CUSTOMIZE ESTA SEÇÃO COM SEUS SABORES E PONTUAÇÕES!   *********
// *************************************************************************

// Mapa dos resultados: Chave (ID do Sabor) e Valor (Objeto com Nome e Descrição)
const results = {
    caramelo_flor_sal: {
        name: "Caramelo e Flor de Sal 🧂🍬",
        description: "Você é sofisticado e adora um equilíbrio perfeito. Seu sabor é a união do doce e do salgado, ideal para acompanhar um bom vinho ou maratonar aquela série de drama."
    },
    leite_ninho: {
        name: "Chocolate Branco e Leite Ninho 🥛🤍",
        description: "Você é nostálgico e busca conforto! Seu sabor é doce, cremoso e lembra a infância, perfeito para ser devorado enquanto assiste a uma comédia romântica."
    },
    cheddar_picante: {
        name: "Cheddar Picante e Páprica 🔥🧀",
        description: "Você é aventureiro e cheio de energia! Seu sabor é intenso, salgado e com um toque de ardência, feito para quem assiste a filmes de ação e não tem medo de inovar."
    },
    chocolate_belga: {
        name: "Chocolate Belga 70% Cacau 🍫✨",
        description: "Você é clássico, mas com um toque de requinte. Seu sabor é o chocolate puro, intenso e gourmet, ideal para uma noite de cinema 'cult' ou um momento de autocuidado."
    }
};

// Array de perguntas: 'question' e as 'options'.
// Cada opção tem um 'text' (o que o usuário vê) e um 'scores' (objeto de pontuação)
const questions = [
    {
        question: "1. Qual o seu 'vibe' de filme/série preferido?",
        options: [
            { text: "Comédia Romântica / Clássico da Sessão da Tarde", scores: { leite_ninho: 3, chocolate_belga: 1 } },
            { text: "Suspense / Ação com muita adrenalina", scores: { cheddar_picante: 3, caramelo_flor_sal: 1 } },
            { text: "Documentário / Filme Cult e de Arte", scores: { chocolate_belga: 3, caramelo_flor_sal: 2 } },
            { text: "Fantasia / Animação com um toque de nostalgia", scores: { leite_ninho: 2, cheddar_picante: 1 } }
        ]
    },
    {
        question: "2. Qual o seu tipo de sobremesa favorito?",
        options: [
            { text: "Torta de Limão ou Mousse de Maracujá (Doce e Cítrico)", scores: { caramelo_flor_sal: 3, cheddar_picante: 1 } },
            { text: "Brigadeiro Gourmet ou Petit Gâteau (Muito Doce e Cremoso)", scores: { leite_ninho: 3, chocolate_belga: 2 } },
            { text: "Brownie com Sorvete e Calda de Chocolate Amargo", scores: { chocolate_belga: 3, caramelo_flor_sal: 1 } },
            { text: "Nenhuma, prefiro um bom petisco salgado!", scores: { cheddar_picante: 3, caramelo_flor_sal: 1 } }
        ]
    },
    {
        question: "3. No quesito 'sabor', qual você prefere?",
        options: [
            { text: "Um toque de sal que realça o sabor (Agridoce)", scores: { caramelo_flor_sal: 3, cheddar_picante: 2 } },
            { text: "O mais doce e açucarado possível!", scores: { leite_ninho: 3 } },
            { text: "Sabor forte, intenso e marcante (Umami/Apimentado)", scores: { cheddar_picante: 3, chocolate_belga: 1 } },
            { text: "Sabor amargo, que equilibra a doçura", scores: { chocolate_belga: 3, caramelo_flor_sal: 1 } }
        ]
    }
];

// *************************************************************************
// ******* FIM DA SEÇÃO DE CUSTOMIZAÇÃO!                           *********
// *************************************************************************


// 2. Funções do Quiz

/**
 * Inicializa a pontuação de todos os sabores.
 */
function initializeScores() {
    scores = {};
    Object.keys(results).forEach(key => {
        scores[key] = 0;
    });
}

/**
 * Exibe a pergunta atual no quiz.
 */
function showQuestion() {
    // Esconde o resultado e mostra o quiz
    resultBox.classList.add('hidden');
    quizBox.classList.remove('hidden');
    
    // Limpa a caixa de perguntas
    quizBox.innerHTML = ''; 

    // Pega a pergunta atual
    const q = questions[currentQuestionIndex];

    // Cria o card da pergunta
    const questionCard = document.createElement('div');
    questionCard.classList.add('question-card');
    questionCard.innerHTML = `<h3>${q.question}</h3><div class="options-container"></div>`;

    // Adiciona as opções de resposta
    const optionsContainer = questionCard.querySelector('.options-container');
    q.options.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('option-button');
        button.textContent = option.text;
        
        // Adiciona o evento de clique para a resposta
        button.addEventListener('click', () => selectAnswer(option.scores));
        optionsContainer.appendChild(button);
    });

    quizBox.appendChild(questionCard);
}

/**
 * Lógica ao selecionar uma resposta.
 * @param {object} answerScores - O objeto de pontuação da resposta.
 */
function selectAnswer(answerScores) {
    // Adiciona as pontuações da resposta à pontuação geral
    for (const key in answerScores) {
        if (scores.hasOwnProperty(key)) {
            scores[key] += answerScores[key];
        }
    }

    // Avança para a próxima pergunta
    currentQuestionIndex++;

    // Verifica se o quiz terminou
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

/**
 * Calcula e exibe o sabor vencedor.
 */
function showResult() {
    // Encontra o sabor com a maior pontuação
    let bestMatch = '';
    let maxScore = -1;

    for (const flavor in scores) {
        if (scores[flavor] > maxScore) {
            maxScore = scores[flavor];
            bestMatch = flavor;
        }
    }

    const finalResult = results[bestMatch] || { name: "Pipoca Clássica", description: "O seu gosto é único! Você combinaria com o sabor clássico. Ou talvez você deva experimentar todos eles!" };

    // Atualiza o conteúdo do resultado
    resultContent.innerHTML = `
        <h3>${finalResult.name}</h3>
        <p>${finalResult.description}</p>
        <p>Gostou? Clique abaixo e garanta o seu match perfeito!</p>
    `;

    // Esconde o quiz e mostra o resultado
    quizBox.classList.add('hidden');
    resultBox.classList.remove('hidden');
}

/**
 * Reinicia o quiz.
 */
function restartQuiz() {
    currentQuestionIndex = 0;
    initializeScores();
    showQuestion();
}


// 3. Inicialização
initializeScores();
showQuestion(); // Começa mostrando a primeira pergunta

// Adiciona o evento para o botão de Reiniciar
restartButton.addEventListener('click', restartQuiz);