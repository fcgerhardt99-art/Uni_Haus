const form = document.querySelector("#bookingForm");
const result = document.querySelector("#resultText");

function daysBetween(start, end) {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.max(1, Math.round((end - start) / oneDay));
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const start = new Date(document.querySelector("#startDate").value);
  const end = new Date(document.querySelector("#endDate").value);
  const people = Number(document.querySelector("#people").value);
  const group = document.querySelector("#groupType").value;
  const usage = document.querySelector("#usageType").value;

  if (!start || !end || end <= start) {
    result.textContent = "Bitte wähle ein gültiges An- und Abreisedatum.";
    return;
  }

  const nights = daysBetween(start, end);

  const basePrices = {
    student: 18,
    teacher: 28,
    external: 42
  };

  let price = nights * people * basePrices[group];

  if (usage === "seminar") price = nights * 160;
  if (usage === "both") price += nights * 120;

  const groupLabels = {
    student: "Studierende",
    teacher: "Lehrende / Uni-intern",
    external: "Externe Gruppe"
  };

  result.innerHTML = `
    <strong>${nights} Nacht/Nächte · ${people} Personen · ${groupLabels[group]}</strong><br>
    Grobe Beispielrechnung: ca. <strong>${price.toLocaleString("de-DE")} €</strong><br><br>
    Hinweis: Das ist nur eine Demo-Logik. Echte Preise, Saisonzeiten, Feiertage und Stornoregeln müssten im Verwaltungssystem hinterlegt werden.
  `;
});
