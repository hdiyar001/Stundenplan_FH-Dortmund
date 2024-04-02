const fs = require("fs").promises;
// Hilfsmodul zum Zusammenbasteln von Dateipfaden
const path = require("path");
// Modul zum vereinfachten Durchfuehren von HTTP-Anfragen
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// URL zur Stundenplan-API
const WEB_SERVICE_URL =
  "https://ws.inf.fh-dortmund.de/fbws/current/rest/CourseOfStudy";

// Liste der IDs fuer alle Bachelor-Studiengaenge
const COS_INCLUDE_LIST = [
  "INPBPI",
  "INPBTI",
  "MID",
  "MIPB",
  "STDBSW",
  "STDBSY",
  "WIPB",
];

// ID des Bachelor-Wahlpflichtkataloges
const WPF_SNAME = "WFPB";

// Pfad zum lokalen Cachen der Daten (um die FH-Webseite zu entlasten)
const CACHE_PATH = path.join("cache", `cache.json`);

// Hilfsfunktion zur Ueberpruefung, ob eine gegebene Datei existiert
const exists = async (file) => {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
};

// Funktion zum Abrufen von Studiengangsinformationen von der Stundenplan-API
const fetchCoursesOfStudy = async () => {
  try {
    // HTTP-GET-Aufruf an die Stundenplan-API absenden
    let response = await fetch(`${WEB_SERVICE_URL}`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });
    return Object.values(await response.json()) // Erhaltene JSON-Rohdaten einlesen
      .filter(({ name }) => name) // Eintraege ohne name-Property per filter ignorieren
      .filter(({ sname }) => COS_INCLUDE_LIST.includes(sname)) // Nur Bachelor-Studiengaenge betrachten
      .map(({ sname, name, grades }) => ({
        sname,
        name,
        grades: grades ? grades.map(({ grade }) => grade) : undefined,
      })); // Objekte per map auf die benoetigten Properties reduzieren
  } catch (err) {
    console.log(err);
  }
};

// Funktion zum Abrufen von Stundenplaninformationen von der Stundenplan-API
const fetchSchedule = async (shortName = "*", semester = "*") => {
  try {
    // HTTP-GET-Aufruf an die Stundenplan-API absenden
    let response = await fetch(
      `${WEB_SERVICE_URL}/${shortName}/${semester}/Events`,
      {
        method: "GET",
        headers: { Accept: "application/json" },
      }
    );
    // Erhaltene JSON-Rohdaten einlesen
    let rawData = await response.json();
    return rawData.map(
      ({
        name,
        courseId,
        courseOfStudy,
        termId,
        courseType,
        lecturerId,
        lecturerName,
        lecturerSurname,
        roomId,
        timeSlotBegin,
        timeSlotDuration,
        weekday,
        studentSet,
      }) => ({
        id: `${courseId}${weekday}${timeSlotBegin}${roomId}`,
        name,
        courseId,
        courseOfStudy,
        termId,
        courseType,
        lecturerId,
        lecturerName,
        lecturerSurname,
        roomId,
        timeSlotBegin,
        timeSlotDuration,
        weekday,
        studentSet,
      })
    ); // Objekte per map auf die benoetigten Properties reduzieren
  } catch (err) {
    console.log(err);
  }
};

const fetchScheduleFromApi = async () => {
  // Daten zu allen Studiengaengen abrufen (Module etc.)
  let allCoursesOfStudy = await fetchCoursesOfStudy();
  // Alle Stundenplaene abrufen
  let allCourses = await fetchSchedule();

  for (let cos of allCoursesOfStudy) {
    cos.courses = allCourses.filter((course) =>
      [cos.sname, WPF_SNAME].includes(course.courseOfStudy)
    );
  }
  return allCoursesOfStudy;
};

// Schnittstelle des Modules nach aussen
module.exports.fetchScheduleData = async () => {
  if (await exists(CACHE_PATH)) {
    // Daten aus Cache holen
    // lokale Cache-Datei loeschen, um Abruf per API zu erzwingen
    console.log("Daten werden aus Cache ausgeliefert...");
    return JSON.parse(await fs.readFile(CACHE_PATH));
  } else {
    // Daten von der Stundenplan-API abrufen
    console.log("Daten werden von API abgerufen...");
    let scheduleData = await fetchScheduleFromApi();
    // Daten in lokaler Cache-Datei speichern
    await fs.mkdir("cache", { recursive: true });
    await fs.writeFile(CACHE_PATH, JSON.stringify(scheduleData));
    return scheduleData;
  }
};
