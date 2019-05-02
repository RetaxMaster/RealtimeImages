const express = require("express");
const exphbs = require('express-handlebars');
const expressFormData = require('express-form-data');
const path = require("path");
const socketServer = require("./socketServer");

// Inicializamos el servidor
const app = express();

//Configuraciónes
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.engine(".hbs", exphbs({
    extname: ".hbs",
    helpers: require("./lib/handlebars")
}));
app.set("view engine", ".hbs");

//Middlewares
app.use(express.urlencoded({ extended : true }));
app.use(express.json());
app.use(expressFormData.parse({ keepExtension : true }));

// Rutas
app.use(require('./routes'));
app.use(require('./routes/upload'));

// Public
app.use(express.static(path.join(__dirname, "public")));

//Inicializar servidor
let server = app.listen(app.get("port"), () => {
    console.log("El servidor está corriendo en el puerto ", app.get("port"));
});

//Creamos el servidor de sockets
socketServer(server);