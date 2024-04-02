const express = require("express");
const router = require("./routes/routes");
const app = express();
const persistence = require("./models/persistence");

app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));//Das ist ein Middleware, der die Daten aus dem Body der Request extrahiert und in req.body speichert

app.set("view engine", "ejs");
app.set("views", "./views");

// app.get('/', function (req, res) {
//     res.render("index");
// });

app.use(router);


const PORT = process.env.PORT || 8123;
app.listen(PORT, () => {
    persistence.initialisiereLehrangebot();
    console.log(`Ich lausche auf http://localhost:${PORT}`);
});