
module.exports = class Semesterplan {
    static idcounter = 0;
    constructor(name, semester, jahr, studiengang) {
        this.id = ++Semesterplan.idcounter;
        this.name = name;
        this.semester = semester;
        this.jahr = jahr;
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
        let dauer = 0;
        this.kurse.forEach(kurs => {
            if (kurs.termin.dauer) {
                dauer += kurs.termin.dauer;
            }
        });
        return dauer;
    }

}