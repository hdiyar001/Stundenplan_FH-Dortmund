//Übung7.A1 hier rein speichern und dann dies aus prbieren es soll dann eine Ausgabe lieferen!!
let ausgabe = "";
for (let i = 1; i <= 100; i++) {
    const element = ((i % 3 === 0) ? "Tic" : "") + ((i % 5 === 0) ? "Tac" : "");
    ausgabe += element ? element : i;


    ausgabe += " ";
}

console.log(ausgabe);

