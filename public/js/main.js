const socket = io.connect();

//socket chat___------------------------//

socket.on("mensajes", (msjs) => {
  const mensajesHTML = msjs
    .map((msj) => `${msj.nameChat} -> ${msj.mensaje}`)
    .join("<br>");
  document.querySelector("p").innerHTML = mensajesHTML;
});

function addMessage(e) {
  const mensaje = {
    nameChat: document.getElementById("nameChat").value,
    mensaje: document.getElementById("text").value,
  };

  socket.emit("mensaje", mensaje);
  return false;
}

//socket productos ---------------------------//

const frmNewItem = document.getElementById('frmNewItem')
frmNewItem.addEventListener('submit', e => {
    e.preventDefault()
    
    const producto = {
        name: frmNewItem[0].value,
        edad: frmNewItem[1].value,
        genero: frmNewItem[2].value,
        celular: frmNewItem[3].value
    }

    socket.emit('listaProductos', producto);
    
    console.log(producto)
})


socket.on('listaProductos', productos => {   
  const prodCont = document.getElementById('listItems')
  prodCont.innerHTML = productos
  .map(
    (product) =>
      "<tr>" +
      "<td>" +
      product.name +
      "</td>" +
      "<td>" +
      "$ " +
      product.edad +
      "</td>" +
      "<td>" +
      product.genero +
      "</td>" +
      "</tr>" +
      product.celular +
      "</td>" +
      "</tr>"
  )
  .join("");
  window.scrollTo(0, document.body.scrollHeight);
});

// socket.on("listaProductos", (prod) => {
//   const productoName = prod.map((prod) => {
//     `${prod.name}`;
//     document.querySelector(".nombre").innerHTML = productoName;
//   });
//   const productoEdad = prod.map((prod) => {
//     `${prod.edad}`;
//     document.querySelector(".edad").innerText = productoEdad;
//   });
//   const productoGenero = prod.map((prod) => {
//     `${prod.genero}`;
//     document.querySelector(".genero").innerText = productoGenero;
//   });
//   const productoCelular = prod.map((prod) => {
//     `${prod.celular}`;
//     document.querySelector(".celular").innerText = productoCelular;
//   });
// });

// function mostrarProductos(e) {
//   const productos = {
//     name: document.getElementById("name").value,
//     edad: document.getElementById("edad").value,
//     genero: document.getElementById("gemero").value,
//     celular: document.getElementById("celular").value,
//   };

//   socket.emit("producto", productos);
//   return false;
// }


