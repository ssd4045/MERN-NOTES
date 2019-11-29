const mongoose = require("mongoose");
const URI = "mongodb://localhost/mern-notes";
//traidos de .env, para mis variables de ambiente, privadas

mongoose.connect(URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("DB is connected");
});
