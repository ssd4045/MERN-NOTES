require("dotenv").config();
const app = require("./app");
require("./database");

//Creando la funcion main y ejecutandola para que levante el servidor me ahorro tener que escribir callbacks, simplemente usando async await, le quite los async y await e igual funciona (?)

function main() {
  app.listen(app.get("port"));
  console.log("Server on port 4000");
}

main();
