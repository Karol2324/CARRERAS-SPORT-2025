let puntos = 0;
let respuestasCorrectas = 0;
let logros = [];
let bonificacion = "";

// Preguntas y respuestas de MotoGP y F1
const preguntas = [
    // MotoGP
    { pregunta: "¿Quién ganó el campeonato de MotoGP en 2023?", respuesta: "Pecco Bagnaia" },
    { pregunta: "¿En qué circuito se corre el Gran Premio de Mugello?", respuesta: "Italia" },
    { pregunta: "¿Qué piloto de MotoGP tiene más campeonatos mundiales?", respuesta: "Giacomo Agostini" },
    { pregunta: "¿Qué marca de moto ha ganado más títulos de MotoGP?", respuesta: "Honda" },

    // F1
    { pregunta: "¿Quién ganó el campeonato de F1 en 2023?", respuesta: "Max Verstappen" },
    { pregunta: "¿Qué circuito alberga el Gran Premio de Mónaco?", respuesta: "Montecarlo" },
    { pregunta: "¿Cuántos campeonatos mundiales ha ganado Lewis Hamilton?", respuesta: "7" },
    { pregunta: "¿Qué equipo tiene más títulos en la historia de la F1?", respuesta: "Ferrari" }
];

function iniciarTrivia() {
    const triviaContainer = document.getElementById('trivia');
    let triviaHtml = "";
    preguntas.forEach((item, index) => {
        triviaHtml += `
            <section class="question">
                <label>${item.pregunta}</label><br>
                <input type="text" id="respuesta_${index}" placeholder="Tu respuesta">
            </section>
        `;
    });
    triviaHtml += '<button onclick="verificarRespuestas()">Verificar Respuestas</button>';
    triviaContainer.innerHTML = triviaHtml;
    // Ocultar el botón de iniciar trivia después de hacer clic
    document.getElementById('iniciarTriviaBtn').style.display = 'none';
}

function verificarRespuestas() {
    respuestasCorrectas = 0;
    puntos = 0;

    preguntas.forEach((item, index) => {
        const respuestaUsuario = document.getElementById(`respuesta_${index}`).value.trim();
        if (respuestaUsuario.toLowerCase() === item.respuesta.toLowerCase()) {
            puntos += 10;
            respuestasCorrectas++;
        }
    });

    mostrarResultado();
    verificarLogros();
    verificarBonificacion();
}

function mostrarResultado() {
    const resultadoSection = document.getElementById('resultado');
    resultadoSection.innerHTML = `
        <p>¡Has respondido ${respuestasCorrectas} preguntas correctamente!</p>
        <p>Total de puntos: ${puntos}</p>
    `;
}

function verificarLogros() {
    logros = [];
    if (puntos >= 100) {
        logros.push("¡Logro Desbloqueado! Has ganado 100 puntos.");
    }
    if (respuestasCorrectas >= 3) {
        logros.push("¡Logro Desbloqueado! Has acertado 3 respuestas correctas seguidas.");
    }

    const logrosSection = document.getElementById('logros');
    logrosSection.innerHTML = "";
    if (logros.length > 0) {
        logros.forEach(logro => {
            logrosSection.innerHTML += `<article>${logro}</article>`;
        });
    }
}

function verificarBonificacion() {
    bonificacion = "";
    if (respuestasCorrectas >= 5) {
        bonificacion = "¡Bonificación Especial! Has alcanzado 5 respuestas correctas.";
    }

    const bonificacionSection = document.getElementById('bonificacion');
    bonificacionSection.innerHTML = bonificacion ? `<p>${bonificacion}</p>` : '';
}