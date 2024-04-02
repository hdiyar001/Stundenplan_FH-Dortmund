const fetcher = require("../models/scheduleFetcher");
const Studiengang = require("./studiengang")
const Semesterplan = require("./semesterplan")
const { KURS_TYPEN, Kurs } = require("./kurs")
const Lehrperson = require("./lehrperson")
const Termin = require("./termin")
// [TODO]
// Weitere benoetigte Module einbinden

const lehrangebot = [];
/**
 * Initialisiert die Daten der Anwendung, also die verfuegbaren Studiengaenge mit den
 * zugehoerigen Kursen. Die Daten werden zunaechst asynchron über das scheduleFetcher-Modul
 * abgerufen (Nutzung der Promise-API mit "then"). Danach werden die erhaltenen Daten
 * mittels map-Funktion in die Datenstrukturen unserer Anwendung konvertiert. Schliesslich
 * wird jeder erhaltene Datensatz im lehrangebot-Array hinzugefuegt.
 */
const initialisiereLehrangebot = () => {
  fetcher.fetchScheduleData().then((daten) => {
    daten
      .map(
        (stdg) =>
          new Studiengang(
            stdg.sname,
            stdg.name,
            stdg.courses.map(
              (kurs) =>
                new Kurs(
                  kurs.courseId,
                  kurs.name,
                  kurs.courseType,
                  kurs.courseOfStudy,
                  kurs.termId,
                  kurs.studentSet,
                  new Lehrperson(kurs.lecturerId, kurs.lecturerSurname),
                  new Termin(
                    kurs.timeSlotBegin,
                    kurs.timeSlotDuration,
                    kurs.weekday,
                    kurs.roomId
                  )
                )
            )
          )
      )
      .forEach((datensatz) => lehrangebot.push(datensatz));
    console.log("Basisdaten initialisiert.");
  });
};

// [TODO]
// Weitere Funktionen aus der Aufgabenstellung implementieren
function ermittleStudiengangZuId(id) {
  return lehrangebot.find(studiengang => studiengang.id === id);
}
function ermittleKursZuStudiengangUndId(studiengangId, kursId) {
  const studiengang = ermittleStudiengangZuId(studiengangId);
  if (studiengang) {
    return studiengang.getKursById(kursId);
  } else {
    console.log("Studiengang mit ID " + studiengangId + " nicht gefunden.");
    return null;
  }
}
function holeAlleStudiengaenge() {
  return lehrangebot;
}

let semesterplaene = [];

function erstelleSemesterplan(name, semester, jahr, studiengangId, kurse) {
  const _studiengangId = new Studiengang(studiengangId, name, kurse).id
  console.log(_studiengangId);
  const semPlan = new Semesterplan(name, semester, jahr, _studiengangId);
  semPlan.addKurse(kurse);
  semesterplaene.push(semPlan);
}

function ermittleSemesterplanZuId(id) {
  const numId = parseInt(id, 10);

  for (const semesterplan of semesterplaene) {
    if (semesterplan.id === numId) {
      return semesterplan;
    }
  }
  return undefined;
}

function holePlaeneGruppiertNachSemester() {
  const semesterplaeneGruppiert = gruppiereNach(semesterplaene, "semester");
  return semesterplaeneGruppiert;
}

function holePlaeneGruppiertNachStudiengang() {
  const semesterplaeneGruppiert = gruppiereNach(semesterplaene, "studiengang");
  return semesterplaeneGruppiert;
}

const gruppiereNach = (array, eigenschaft) =>
  array.reduce((ergebnis, element) => {
    if (!ergebnis[element[eigenschaft]]) {
      ergebnis[element[eigenschaft]] = [];
    }
    ergebnis[element[eigenschaft]].push(element);
    return ergebnis;
  }, {});

// [TODO]
// Schnittstelle des Moduls definieren: Lehrangebot-Array und Funktionen
// von aussen zugreifbar machen
module.exports = {
  lehrangebot,
  initialisiereLehrangebot,
  ermittleStudiengangZuId,
  ermittleKursZuStudiengangUndId,
  holeAlleStudiengaenge,
  erstelleSemesterplan,
  ermittleSemesterplanZuId,
  holePlaeneGruppiertNachSemester,
  holePlaeneGruppiertNachStudiengang
}