const express = require("express");
const morgan = require("morgan");
const BodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const mysql = require("mysql");

const config = require("./config");
const configMySql = require("./mysqlCredencial");

const app = express();

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

mongoose.connect(
  config.database,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    err ? console.log("Error" + err) : console.log("Base de datos conectada");
  }
);

mysql.createConnection({
  host: "192.168.0.4",
  user: "integracion",
  password: "!@-Integra*2021",
  database: "cedisa",
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(morgan("dev"));
app.use(cors());

const userRoutes = require("./routes/account");
const mainRoutes = require("./routes/main");
const administradorRoutes = require("./routes/administrador");
const estudiosSearchRoutes = require("./routes/estudios-search");
const anuncioRoutes = require("./routes/anuncio");
const preguntasRoutes = require("./routes/preguntas");
const extensionesRoutes = require("./routes/extensiones");
const sucursalesRoutes = require("./routes/sucursal");

app.use("/api", mainRoutes);
app.use("/api/accounts", userRoutes);
app.use("/api/administrador", administradorRoutes);
app.use("/api/search", estudiosSearchRoutes);
app.use("/api/anuncio", anuncioRoutes);
app.use("/api/preguntas", preguntasRoutes);
app.use("/api/extensiones", extensionesRoutes);
app.use("/api/sucursales", sucursalesRoutes);

app.listen(config.port, (err) => {
  console.log("aplicacion corriendo en el puerto " + config.port);
});
