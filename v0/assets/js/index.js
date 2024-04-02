
// Gruppieren nach Studiengang:
// plaene ist ein Array, welches die Semesterplan-Objekte enthält
let semesterhtml = document.getElementById('semester');
let studienganghtml = document.getElementById('studiengang');

function toggleView(auswahl) {
  const gruppiertePlaene = resetView(auswahl);

  let html = generateHtml(gruppiertePlaene);

  if (auswahl === "semester") {
    semesterhtml.style.display = 'block';
    studienganghtml.style.display = 'none';
    semesterhtml.innerHTML = html;
  }
  else {
    semesterhtml.style.display = 'none';
    studienganghtml.style.display = 'block';
    studienganghtml.innerHTML = html;
  }
}

function generateHtml(gruppiertePlaene) {
  let html = ``;
  for (let gruppe in gruppiertePlaene) {
    html += `
      <section title="studiengangplan">
      <h3>${gruppe}</h3>
      <ul>`;

    const plaene = gruppiertePlaene[gruppe];
    plaene.forEach(plan => {
      html += `
          <li><a href="plan.html">${plan.name} (${plan.getAnzahlKurse()} Kurse, ${plan.getAnzahlStunden()} Stunden)</a>
          <ul>`;

      plan.kurse.forEach(kurs => {
        html += `<li>${kurs.name}</li>`;
      });

      html += `</ul></li>`;
    });

    html += `</ul></section>`;
  };
  return html;
}
function resetView(auswahl) {
  semesterhtml.innerHTML = '';
  studienganghtml.innerHTML = '';
  return gruppiereNach(semPlaene, auswahl);

}
const gruppiereNach = (array, eigenschaft) =>
  array.reduce((ergebnis, element) => {
    if (!ergebnis[element[eigenschaft]]) {
      ergebnis[element[eigenschaft]] = [];
    }
    ergebnis[element[eigenschaft]].push(element);
    return ergebnis;
  }, {});

window.onload = function () {
  toggleView('semester');
  document.getElementById('groupby').addEventListener('change', function () {
    toggleView(this.value);
  });
};