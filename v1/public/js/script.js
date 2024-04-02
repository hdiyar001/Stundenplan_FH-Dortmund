

// const getViewportWidth = () => window.innerWidth ||
//     document.documentElement.clientWidth;

// console.log(`Die Viewport-Breite beträgt: ${getViewportWidth()} Pixel.`);

const KURS_TYPEN = {
    VORLESUNG: 'V',
    ÜBUNG: 'Ü',
    PRAKTIKUM: 'P',
    ÜBUNG_PRAKTIKUM: 'ÜP',
    SEMINARISTISCHE_VORLESUNG: 'SV',
    TUTORIUM: 'T',
    SEMINAR: 'S'
};
class Kurs {
    // static idCounter = 0;
    constructor(modulid, name, typ, studiengang, semester, termin, lehrperson) {
        this._id = `${modulid} ${termin.wochentag} ${termin.beginn} ${termin.raum}`;
        this.modulid = modulid;
        this.name = name;
        this.typ = typ;
        this.studiengang = studiengang;
        this.semester = semester;
        this.termin = termin;
        this.lehrperson = lehrperson;
    }
    get id() {
        return this._id;
    }
    istValiderTyp(typ) {
        if (typeof typ !== 'string' || !Object.values(KURS_TYPEN).includes(typ)) {
            throw new Error("Ein Fehler ist aufgetreten, da der Typ nicht gültig ist.");
        }
    }
}

class Studiengang {
    constructor(id, name, kurse) {
        this.id = id;
        this.name = name;
        this.kurse = kurse;
    }

    getKursById(id) {
        return this.kurse.find(kurs => kurs.id === id);
    }
}

class Semesterplan {
    static idcounter = 0;
    constructor(name, semester, studiengang) {
        this.id = ++Semesterplan.idcounter;
        this.name = name + " " + this.id;
        this.semester = semester;
        this.studiengang = studiengang;
        this.kurse = [];
    }
    addKurse(kurse) {
        this.kurse.push(...kurse);
    }

    getAnzahlKurse() {
        return this.kurse.length;
    }

    getAnzahlStunden() {
        // return this.kurse.reduce((total, kurs) => total + kurs.termin.dauer, 0);
        let dauer = 0;
        this.kurse.forEach(element => {
            dauer += element.termin.dauer;
        });
        return dauer;
    }
}
class Lehrperson {
    constructor(id, nachname) {
        this.id = id;
        this.nachname = nachname;
    }
}
class Termin {
    constructor(beginn, dauer, wochentag, raum) {
        this.beginn = beginn;
        this.dauer = dauer;
        this.wochentag = wochentag;
        this.raum = raum;
    }
}

const lehrperson1 = new Lehrperson('Müller');
const lehrperson2 = new Lehrperson('Schmidt');
const lehrperson3 = new Lehrperson('Fischer');
const lehrperson4 = new Lehrperson('Becker');
const lehrperson5 = new Lehrperson('Schneider');



const termin1 = new Termin('08:00', 2, 'Montag', '101');
const termin2 = new Termin('10:00', 2, 'Dienstag', '102');
const termin3 = new Termin('12:00', 2, 'Mittwoch', '103');
const termin4 = new Termin('14:00', 2, 'Donnerstag', '104');
const termin5 = new Termin('16:00', 2, 'Freitag', '105');
const termin6 = new Termin('09:00', 2, 'Montag', '106');

let kurs1 = new Kurs('42021', 'Rechnerstrukturen und Betriebssysteme 1', 'V', 'Informatik', 'WiSe2023', termin1, lehrperson1);
let kurs2 = new Kurs('42014', 'Einführung in die Programmierung', 'Ü', 'Informatik', 'WiSe2023', termin2, lehrperson2);
let kurs3 = new Kurs('42042', 'Mathematik für Informatik 1', 'V', 'Informatik', 'WiSe2023', termin3, lehrperson3);
let kurs4 = new Kurs('42100', 'Theoretische Informatik', 'V', 'Informatik', 'WiSe2023', termin4, lehrperson4);
let kurs5 = new Kurs('42101', 'BWL', 'Ü', 'Informatik', 'WiSe2023', termin5, lehrperson5);
let kurs6 = new Kurs('42102', 'Rechnerstrukturen und Betriebssysteme 2', 'V', 'Informatik', 'SoSe2023', termin1, lehrperson1);
let kurs7 = new Kurs('42103', 'Algorithmen und Datenstrukturen', 'Ü', 'Informatik', 'SoSe2023', termin2, lehrperson2);
let kurs8 = new Kurs('42104', 'Mathematik für Informatik 2', 'V', 'Informatik', 'SoSe2023', termin3, lehrperson3);
let kurs9 = new Kurs('42105', 'Mathematik für Informatik 3', 'V', 'Informatik', 'SoSe2023', termin4, lehrperson4);
let kurs10 = new Kurs('42106', 'Lern- und Arbeitstechniken', 'Ü', 'Informatik', 'SoSe2023', termin5, lehrperson5);
let kurs11 = new Kurs('42107', 'Programmierkurs 1', 'P', 'Informatik', 'SoSe2023', termin6, lehrperson1);
let kurs12 = new Kurs('42108', 'Englisch', 'S', 'Informatik', 'SoSe2023', termin6, lehrperson2);
let kurs13 = new Kurs('42109', 'Mensch-Computer-Interaktion', 'SV', 'Informatik', 'WiSe2023/24', termin4, lehrperson3);
let kurs14 = new Kurs('42110', 'Mathematik für Informatik 4', 'V', 'Informatik', 'WiSe2023/24', termin5, lehrperson4);
let kurs15 = new Kurs('42111', 'Programmierkurs 2', 'Ü', 'Informatik', 'WiSe2023/24', termin1, lehrperson5);
let kurs16 = new Kurs('42112', 'Web-Technologien', 'V', 'Informatik', 'WiSe2023/24', termin2, lehrperson1);
let kurs17 = new Kurs('42113', 'Softwaretechnik 1', 'Ü', 'Informatik', 'WiSe2023/24', termin3, lehrperson2);
let kurs18 = new Kurs('42114', 'Datenbanken 1', 'P', 'Informatik', 'WiSe2023/24', termin6, lehrperson3);

let pikurse = [kurs1, kurs2, kurs3, kurs4, kurs5];
let wikurse = [kurs6, kurs7, kurs8, kurs9, kurs10];
let mikurse = [kurs11, kurs12, kurs13, kurs14, kurs15];
let mskurse = [kurs16, kurs17, kurs18];


let pi = new Studiengang("Informatik. StgPO 2019", "INF");

let infSemPlan = new Semesterplan("Mein Plan", "WiSe 2023", "PI-Informatik");
let wiSemPlan = new Semesterplan("Mein Plan", "SS 2022", "Wirtschafts-Informatik");
let miSemPlan = new Semesterplan("Mein Plan", "WiSe 2023", "Medizinische-Informatik");
let mi2SemPlan = new Semesterplan("Mein Plan", "WiSe 2023", "Medizinische-Informatik");

pikurse.sort((a, b) => a.modulid - b.modulid);
wikurse.sort((a, b) => a.modulid - b.modulid);
mikurse.sort((a, b) => a.modulid - b.modulid);
mskurse.sort((a, b) => a.modulid - b.modulid);

infSemPlan.addKurse(pikurse);
wiSemPlan.addKurse(wikurse);
miSemPlan.addKurse(mikurse);
mi2SemPlan.addKurse(mskurse);

let semPlaene = [infSemPlan, wiSemPlan, miSemPlan, mi2SemPlan];

pi.kurse = pikurse;


// console.log(`${pi.name} (${pi.id}):`);
// pi.kurse.forEach(kurs => console.log(`  ${kurs.modulid}: ${kurs.name}`));

// console.log(`${infSemPlan.name} (${infSemPlan.semester}):`);
// infSemPlan.kurse.forEach(kurs => console.log(`    ${kurs.modulid}: ${kurs.name}`));


document.getElementById('groupby').addEventListener('change', function () {
    toggleView(this.value);
});






