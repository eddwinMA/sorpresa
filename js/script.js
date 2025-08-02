// =============================
// DESBLOQUEO DE AUDIO (para que no lo bloquee el navegador)
// =============================
document.body.addEventListener("click", () => {
    const unlockAudio = new Audio("sounds/falcon-sound.mp3");
    unlockAudio.play().then(() => {
        unlockAudio.pause();
        unlockAudio.currentTime = 0;
    }).catch(() => {
        console.log("Audio no disponible");
    });
}, { once: true });


// =============================
// CONFIGURACIÓN CANVAS ESTRELLAS + CORAZONES
// =============================
const canvas = document.getElementById("spaceCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const hearts = [];
const numStars = 200;
const numHearts = 15;

// Crear estrella
function createStar() {
    return {
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * canvas.width,
        size: Math.random() * 2 + 1
    };
}

// Crear corazón
function createHeart() {
    return {
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * canvas.width,
        size: Math.random() * 3 + 2,
        color: `hsl(${Math.random() * 360}, 80%, 60%)`
    };
}

// Inicializar partículas
for (let i = 0; i < numStars; i++) stars.push(createStar());
for (let i = 0; i < numHearts; i++) hearts.push(createHeart());

// Dibujar partícula
function drawParticle(particle, shape = "star") {
    const perspective = 300;
    const scale = perspective / (perspective + particle.z);

    const x2d = particle.x * scale + canvas.width / 2;
    const y2d = particle.y * scale + canvas.height / 2;
    const size = particle.size * scale;

    if (shape === "star") {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
        ctx.fill();
    } else if (shape === "heart") {
        ctx.fillStyle = particle.color;
        drawHeart(x2d, y2d, size);
    }
}

// Dibujar forma de corazón
function drawHeart(x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x, y - size, x - size, y - size, x - size, y);
    ctx.bezierCurveTo(x - size, y + size, x, y + size * 1.5, x, y + size * 2);
    ctx.bezierCurveTo(x, y + size * 1.5, x + size, y + size, x + size, y);
    ctx.bezierCurveTo(x + size, y - size, x, y - size, x, y);
    ctx.fill();
}

// Animación de fondo
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Estrellas
    stars.forEach(star => {
        star.z -= 5;
        if (star.z <= 0) {
            Object.assign(star, createStar(), { z: canvas.width });
        }
        drawParticle(star, "star");
    });

    // Corazones
    hearts.forEach(heart => {
        heart.z -= 3;
        if (heart.z <= 0) {
            Object.assign(heart, createHeart(), { z: canvas.width });
        }
        drawParticle(heart, "heart");
    });

    requestAnimationFrame(animate);
}
animate();

// Ajustar tamaño en resize
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


// =============================
// ANIMACIÓN DEL HALCÓN MILENARIO
// =============================
const falcon = document.getElementById("falcon");
const popup = document.getElementById("popup");
const btnAbrir = document.getElementById("btnAbrir");
const startButton = document.getElementById("startButton");
const introMessage = document.getElementById("introMessage");
const romanticMessage = document.getElementById("romanticMessage");
const longLetterCard = document.getElementById("longLetterCard");
const romanticCard = document.querySelector(".romantic-card");
const letterText = document.querySelector(".letter-text");
const signatureText = document.querySelector(".signature-text");
const btnVolver = document.getElementById("btnVolver"); // Nuevo botón

// Variable para el audio romántico
let romanticAudio;

// Reproducir sonido de la nave
function playFalconSound(initialVolume = 1, lowerVolume = 0.4, fadeTime = 2000) {
    try {
        const audio = new Audio("sounds/falcon-sound.mp3");
        audio.volume = initialVolume;
        audio.play().catch(() => {
            console.log("Error reproduciendo audio");
        });
        setTimeout(() => {
            audio.volume = lowerVolume;
        }, fadeTime);
        return audio;
    } catch (error) {
        console.log("Audio no disponible");
        return null;
    }
}

// Reproducir música romántica
function playRomanticMusic() {
    try {
        if (romanticAudio) {
            romanticAudio.pause();
            romanticAudio.currentTime = 0;
        }
        romanticAudio = new Audio("sounds/romantico.mp3");
        romanticAudio.loop = true; // La música se repite
        romanticAudio.play();
    } catch (error) {
        console.log("Error reproduciendo la música romántica");
    }
}

// Animación de la nave (entra de derecha a centro)
function showFalcon() {
    // Sonido fuerte de la nave
    playFalconSound(1, 0.4, 2000);

    // Mover la nave al centro
    falcon.style.left = "50%";

    // Mostrar popup cuando llegue
    setTimeout(() => {
        popup.classList.remove("hidden");
    }, 3000);
}

// Mostrar mensaje romántico final
function showRomanticMessage() {
    // Ocultar elementos anteriores
    popup.classList.add("hidden");
    falcon.classList.add("hidden");
    
    // Reproducir música romántica
    playRomanticMusic();

    // Mostrar mensaje romántico sin animación
    romanticMessage.classList.remove("hidden");
    
    // Forzar el centrado
    romanticMessage.style.display = "flex";
    romanticMessage.style.justifyContent = "center";
    romanticMessage.style.alignItems = "center";
    
    // Agregar partículas extra de corazones al fondo
    addExtraHearts();
}

// Agregar más corazones románticos al fondo
function addExtraHearts() {
    for (let i = 0; i < 20; i++) {
        hearts.push(createHeart());
    }
}

// Función para la animación de máquina de escribir
function typewriterEffect(element, text, speed) {
    element.innerHTML = '';
    let charIndex = 0;
    
    function typeChar() {
        if (charIndex < text.length) {
            let char = text.charAt(charIndex);
            
            if (char === '\n') {
                if (text.charAt(charIndex + 1) === '\n') {
                    element.innerHTML += '</p><p>';
                    charIndex++;
                } else {
                    element.innerHTML += '<br>';
                }
            } else {
                element.innerHTML += char;
            }
            
            charIndex++;
            setTimeout(typeChar, speed);
        }
    }
    
    // Empieza con un párrafo vacío para mantener la estructura
    element.innerHTML = '<p></p>';
    const pElement = element.querySelector('p');
    
    let i = 0;
    function type() {
        if (i < text.length) {
            const char = text.charAt(i);
            if (char === '\n' && text.charAt(i+1) === '\n') {
                pElement.innerHTML += '</p><p>';
                i++;
            } else if (char === '\n') {
                pElement.innerHTML += '<br>';
            } else {
                pElement.innerHTML += char;
            }
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}


// Función que se activa al hacer clic en el corazón
function showLongLetter() {
    const letterContent = `
        Querida Melani,

        Desde aquel primer día en esa aula de universidad, mi vida cambió sin que yo lo notara al instante. Pensaba que tenía problemas del corazón… pero era solo mi corazón celebrando cada vez que te veía.

        Con el tiempo entendí que no eras solo alguien especial. Eras esa persona con la que podía ser yo mismo sin máscaras, sin miedo, sin filtros. Esa con la que conecté de forma natural, como si nuestras almas ya se conocieran de antes.

        Gracias por enseñarme tanto sin proponértelo, por impulsarme a ser mejor, por estar ahí sin condiciones. Tu lealtad, tu confianza y tu forma de ver el mundo me han marcado profundamente. Te quiero un montón.

        Quiero que, juntos de la mano, logremos nuestras metas, nuestros sueños… lo que la vida tenga para nosotros. Porque contigo, todo tiene más sentido, más calma y más fuerza.

        Gracias por ser parte de mi historia. Gracias por existir.
    `;
    const signature = "Te quiero un montón, cariño mío.";

    // Ocultar la tarjeta actual con una transición
    romanticCard.classList.add("fade-out");
    
    // Esperar a que la tarjeta se desvanezca antes de mostrar la nueva
    setTimeout(() => {
        romanticCard.classList.add("hidden");
        romanticCard.classList.remove("fade-out");

        longLetterCard.classList.remove("hidden");
        longLetterCard.classList.add("fade-in");
        
        typewriterEffect(letterText, letterContent, 50);
        
        const typewriterDuration = letterContent.length * 50;
        setTimeout(() => {
            signatureText.textContent = signature;
            signatureText.classList.add('fade-in-dedication');
        }, typewriterDuration);
        
    }, 500);
}

// Función para volver a la tarjeta anterior
function volverACartaAnterior() {
    longLetterCard.classList.remove("fade-in");
    longLetterCard.classList.add("fade-out");
    
    // Esperar a que la carta se desvanezca
    setTimeout(() => {
        longLetterCard.classList.add("hidden");
        longLetterCard.classList.remove("fade-out");
        
        // Mostrar la tarjeta principal nuevamente
        romanticCard.classList.remove("hidden");
        romanticCard.classList.remove("fade-out");
        romanticCard.classList.add("fade-in"); // Añade animación de entrada
    }, 500);
}


// Event Listeners
startButton.addEventListener("click", () => {
    introMessage.classList.add("hidden");
    showFalcon();
});

btnAbrir.addEventListener("click", () => {
    showRomanticMessage();
});

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const heartIcon = document.querySelector(".heart-icon");
        if (heartIcon) {
            heartIcon.addEventListener("click", () => {
                showLongLetter();
            });
        }

        // Event listener para el nuevo botón de volver
        if (btnVolver) {
            btnVolver.addEventListener("click", volverACartaAnterior);
        }
    }, 1000);
});