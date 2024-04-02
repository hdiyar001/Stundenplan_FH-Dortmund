const express = require("express");
// [TODO]
// Weitere benoetigte Module einbinden
const persistence = require("../models/persistence");
const router = express.Router();



router.get("/index", (req, res) => {
  // [TODO]
  // Implementieren: Liste der Semesterplaene anzeigen,
  // dabei Gruppierung beachten (nach Semester oder Studiengang,
  // Einstellung als Anfrage/Query-Parameter gegeben)
  let gruppierung = req.query.gruppierung || "semesterplan";

  let liste = gruppierung === "semesterplan"
    ? persistence.holePlaeneGruppiertNachSemester()
    : persistence.holePlaeneGruppiertNachStudiengang();

  res.render("index", { liste: liste });
});

router.get("/plan", (req, res, next) => {
  // [TODO]
  // Implementieren: Detailseite zum Semesterplan mit der gegebenen
  // ID anzeigen (ID als Anfrage/Query-Parameter gegeben)

  const plan = persistence.ermittleSemesterplanZuId(req.query.id);
  res.render("plan", { plan: plan });
});


router.get("/kurs", (req, res, next) => {
  const kursId = req.query.id;
  const studiengangId = req.query.studiengangId;
  console.log("Kurs ID: " + kursId + ", Studiengang ID: " + studiengangId);

  const kurs = persistence.ermittleKursZuStudiengangUndId(studiengangId, kursId);
  if (kurs) {
    res.render("kurs", { kurs: kurs });
  } else {
    throw new Error("Kurs nicht gefunden");
  }
});


router.get("/neu", (req, res) => {
  // [TODO]
  // Schritt 1 des Formulares zum Erstellen eines neuen
  // Semesterplanes anzeigen

  res.render("plan-neu-schritt1", { studiengaenge: persistence.holeAlleStudiengaenge() });
});

router.post("/waehleStudiengang", (req, res) => {
  // [TODO]
  // Formular zum Erstellen eines neuen Semesterplanes:
  // Den in Schritt 1 gewaehlten Studiengang ermitteln
  // (ID als Anfrage/Query-Parameter gegeben) und passend
  // dazu Schritt 2 anzeigen (z.B. nur die Kurse, die auch
  // zum gewaehlten Studiengang gehoeren)
  const studiengangId = req.body.Studienganges;
  const kurse = persistence.ermittleStudiengangZuId(studiengangId).kurse.slice(0, 20);

  // Senden der studiengangId und der Kurse an das Template für den zweiten Schritt
  res.render("plan-neu-schritt2", { studiengangId, kurse });
});


router.post("/neu", (req, res) => {
  // [TODO]
  // Schritt 2 wurde durchgefuehrt: Neuen Semesterplan aus
  // den eingebenen Daten erstellt und ueber das Persistenz-
  // Modul sichern. Danach auf die Seite "Liste der Semesterplaene"
  // umleiten.
  let ausgewaehlteKurse = req.body['kurse[]'];

  if (!Array.isArray(ausgewaehlteKurse)) {
    ausgewaehlteKurse = [ausgewaehlteKurse];
  }

  let kursObjekte = ausgewaehlteKurse.map(kursId =>
    persistence.ermittleKursZuStudiengangUndId(req.body.studiengangId, kursId)
  );

  kursObjekte = kursObjekte.filter(kurs => kurs !== undefined);

  persistence.erstelleSemesterplan(req.body.name, req.body.semester + " " + req.body.jahr, req.body.jahr, req.body.studiengangId, kursObjekte);
  res.redirect("/index");
});

router.get("/", (req, res) => {
  // [TODO]
  // Auf die Seite "Liste der Semesterplaene" umleiten.
  persistence.initialisiereLehrangebot();
  res.redirect("/index");
});


router.use((err, req, res, next) => {
  const statusCode = err.statusCode || 404;

  res.status(statusCode).render("fehler", { fehler: err, statusCode: statusCode });
});

router.use('*', (req, res) => {
  const statusCode = 404;
  res.status(statusCode).render("fehler", { fehler: { message: 'Not Found' }, statusCode: statusCode });
});

module.exports = router;  
