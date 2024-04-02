module.exports = class Studiengang {
    constructor(id, name, kurse) {
        this.id = id;
        this.name = name;
        this.kurse = kurse;
    }

    getKursById(id) {
        return this.kurse.find(kurs => kurs.getid() === id);
    }
    getAnzahlKurse() {
        return this.kurse.length;
    }
}
