const text = "Bienvenido a mi espacio donde la creatividad, tecnología y la espiritualidad se fusionan para inspirar y conectar.";
let index = 0;
const speed = 50; // velocidad de escritura en ms

function typeEffect() {
  if (index < text.length) {
    document.getElementById("typed-text").innerHTML += text.charAt(index);
    index++;
    setTimeout(typeEffect, speed);
  }
}

window.onload = typeEffect;
