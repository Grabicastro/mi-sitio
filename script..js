// script.js
document.addEventListener("DOMContentLoaded", () => {
  const text = "Bienvenido a mi espacio donde la creatividad, tecnología y la espiritualidad se fusionan para inspirar y conectar.";
  const typedText = document.getElementById("typed-text");
  let index = 0;
  const speed = 50;

  typedText.innerHTML = "";

  function typeEffect() {
    if (index < text.length) {
      typedText.innerHTML += text.charAt(index);
      index++;
      setTimeout(typeEffect, speed);
    }
  }

  typeEffect();
});




