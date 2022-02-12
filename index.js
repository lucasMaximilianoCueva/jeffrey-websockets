const express = require("express");
//cargamos el modulo handlebars
const app = express();

//-------------------------------------//

//Uso de websockets
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

//------------------------------------//
const PORT = 3000;
const exphbs = require("express-handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//configuramos handlebars
app.engine(
  "hbs", //Nombre referencia a la plantilla(se usa luego en set)
  exphbs.engine({
    //funcion de configuracion  handlebars
    extname: "hbs", //extension a utilizar
    defaultLayout: "index.hbs", //plantilla principal
    layoutsDir: __dirname + "/public/views/layouts", //ruta de plantilla principal
    // partialsDir: __dirname + "/public/partials/", //ruta a las plantillas parciales
  })
);

const listaProductos = [];

console.log(listaProductos)

//establecemos el motor de plantilla que se utiliZA
app.set("view ingine", "hbs");
//establecemos directorio donde se encuentran los archivos de la plantilla
app.set("views", "public/views");

//handlebars

app.get("/", (req, res) => {
  res.render("datos.hbs", { listaProductos });
});
// app.post("/", (req, res) => {
//   // const data = req.body;
//   listaProductos.push(req.body);
//   console.log(listaProductos);
//   // res.send(listaProductos);
//   res.redirect("/");
// });

//espacio publico del servidor
app.use(express.static("public"));

const mensajes = [];

io.on("connection", (socket) => {
  console.log("Nuevo Cliente Conectado!");

  //incluyendo chat-----------------------//

  socket.emit("mensajes", mensajes);

  socket.on("mensaje", (data) => {
    mensajes.push(data);
    io.sockets.emit("mensajes", mensajes);
  });

  //--------------------------------------------//

  //incluyendo lista de productos---------------//

  socket.emit("listaProductos", listaProductos);

  socket.on("listaProductos", (data) => {
    listaProductos.push({
      name: data.name,
      edad: data.edad,
      genero: data.genero,
      celular: data.celular
    });
    io.sockets.emit("listaProductos", listaProductos);
  });
});

const connectedServer = httpServer.listen(PORT, () => {
  console.log(
    `Servidor Http con Websockets escuchando en el puerto ${
      connectedServer.address().port
    }`
  );
});

connectedServer.on("error", (error) => {
  console.log(`Error en el Servidor ${error}`);
});

// const server = app.listen(PORT, () => {
//   console.log(`Servidor http escuchando en http://localhost:${PORT}`);
// });
// server.on("error", (error) => console.log(`Error on Server ${error}`));
