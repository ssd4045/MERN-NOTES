const express = require("express");
const cors = require("cors");
const app = express();

//Settings
app.set("port", process.env.PORT || 3000);

//Middlewares
app.use(cors());
app.use(express.json()); //mi servidor ahora entiende JSON y strings a traves de express

//Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/notes", require("./routes/notes"));

module.exports = app;
