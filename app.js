const clues = [
  { eyebrow: "I · El comienzo", question: "¿En dónde me dijiste ‘te amo’ por primera vez?", parts: ["torre", "ingenieria"], hint: "Escribe el lugar…" },
  { eyebrow: "II · El instante", question: "¿Cómo se llama la primera canción que te hice?", parts: ["estrellas", "nosotros"], hint: "El título que solamente nosotros conocemos…" },
  { eyebrow: "III · La certeza", question: "¿Dónde fue nuestra primera cita como novios?", parts: ["cineteca"], hint: "Escribe el lugar…" }
];
const normalize = value => value.trim().toLocaleLowerCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const show = id => document.getElementById(id).classList.remove("hidden");
const hide = id => document.getElementById(id).classList.add("hidden");
let step = 0;
function renderClue() {
  const clue = clues[step];
  document.getElementById("eyebrow").textContent = clue.eyebrow;
  document.getElementById("question").textContent = clue.question;
  document.getElementById("answer").placeholder = clue.hint;
  document.getElementById("counter").textContent = `${step + 1} / ${clues.length}`;
  document.getElementById("progress-bar").style.width = `${step / clues.length * 100}%`;
  document.getElementById("answer").focus();
}
document.getElementById("gate-form").addEventListener("submit", event => {
  event.preventDefault();
  if (normalize(document.getElementById("password").value) !== "layla") {
    document.getElementById("password-error").classList.add("visible"); return;
  }
  hide("gate"); show("game"); renderClue();
});
document.getElementById("clue-form").addEventListener("submit", event => {
  event.preventDefault();
  const value = normalize(document.getElementById("answer").value);
  if (!clues[step].parts.every(part => value.includes(part))) {
    document.getElementById("answer-error").classList.add("visible"); return;
  }
  document.getElementById("answer-error").classList.remove("visible");
  document.getElementById("answer").value = "";
  if (++step === clues.length) { hide("game"); show("reveal"); }
  else renderClue();
});

