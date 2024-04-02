const http = require("http");
const persistence = require("../models/persistence");


http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(Initalisierung());
}).listen(8844, () => {
  persistence.initialisiereLehrangebot();
  console.log('Ich lausche auf http://localhost:8844/');
});

let studiengaenge = persistence.holeAlleStudiengaenge();

function Initalisierung() {
  let html = `<!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8">
      <title>Study Planner Test</title>
    </head>
    <body>
      <h1>Study Planner Test</h1>
      `;

  studiengaenge.forEach((studiengang) => {
    html += `
      <section>
        <h2>${studiengang.name} (ID: ${studiengang.id})</h2>
        <p>${persistence.ermittleStudiengangZuId(studiengang.id).getAnzahlKurse()} Kurse enthalten:</p>

        <ul>`;
    studiengang.kurse.slice(0, 6).forEach((modul) => {
      html += `
          <li>${modul.modulid} (${modul.semester}) ${modul.name} (${modul.typ},${modul.lehrperson.nachname})</li>`;
    });
    html += `
        <li style="color:red;"> 
        [...]
        </li>

        </ul>
      </section>`;
  });

  html += `
    </body>
    </html>`;

  return html;
}
