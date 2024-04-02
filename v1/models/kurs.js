const KURS_TYPEN = {
    Organisation: 'Org',
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
    constructor(modulid, name, typ, studiengang, semester, gruppenbuchstabe, lehrperson, termin) {
        this._id = `${modulid} ${termin.wochentag} ${termin.beginn} ${termin.raum}`;
        this.modulid = modulid;
        this.name = name;
        this.typ = typ;
        this.studiengang = studiengang;
        this.semester = semester;
        this.gruppenbuchstabe = gruppenbuchstabe;
        this.lehrperson = lehrperson;
        this.termin = termin;
    }
    getid() {
        return this._id;
    }
    istValiderTyp(typ) {
        if (typeof typ !== 'string' || !Object.values(KURS_TYPEN).includes(typ)) {
            throw new Error("Ein Fehler ist aufgetreten, da der Typ nicht gültig ist.");
        }
    }
}
module.exports = { KURS_TYPEN, Kurs };