
//carrito de compras

const listaDeProductos =[
  {
    id: 1,
    nombre: "entrada",
    descripcion: "podes ver las opciones en nuestra carta",
    precio: 900 ,
    img:"./images/entrada.jpg",
    cantidad: 1,
  },
  {
    id: 2,
    nombre: "plato del dia",
    descripcion: "podes ver las opciones en nuestra carta",
    precio: 1500,
    img:"./images/plato-del-dia.jpg",
    cantidad: 1, 
  },
  {
    id: 3,
    nombre: "postre",
    descripcion: "podes ver las opciones en nuestra carta",
    precio: 500,
    img:"./images/volcan-de-chocolate.jpg",
    cantidad: 1,
  },
 
  {
    id: 4,
    nombre: "cafe",
    descripcion: "podes ver las opciones en nuestra carta",
    precio: 300,
    img:"./images/cafe.jpg",
    cantidad: 1,
  },
  {
    id: 5,
    nombre: "picada x 4",
    descripcion: "podes ver las opciones en nuestra carta",
    precio: 1500,
    img:"./images/picada.jpg",
    cantidad: 1,
  },
  {
    id: 6,
    nombre: "pastas",
    descripcion: "podes ver las opciones en nuestra carta",
    precio: 900,
    img:"./images/pastas.jpeg",
    cantidad: 1,
  },
  {
    id: 7,
    nombre: "parrillada x 4",
    descripcion: "podes ver las opciones en nuestra carta",
    precio: 2300,
    img:"./images/parrillada.jpeg",
    cantidad: 1,
  },
  {
    id: 8,
    nombre: "sushi x 40 pcs",
    descripcion: "podes ver las opciones en nuestra carta",
    precio: 1800,
    img:"./images/sushi.jpg",
    cantidad: 1,
  },
];


const shop = document.getElementById("shop"); 
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modalContainer");

//traigo lo que haya en el localStorage del carrito o si no hay nada un array vacio
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//aca hago la lista de productos con los datos y el boton para comprar
listaDeProductos.forEach((producto) => {
  let contenido = document.createElement("div");
  contenido.className = "card m-3 p-3 border border-3 rounded";
  contenido.style ="width: 15rem";
  contenido.innerHTML =`
  <img "card-img-top" src ="${producto.img}" >
  <h5 class="card-title">${producto.nombre}</h5>
  <p "card-text">${producto.descripcion}</p>
  <h4>${producto.precio} $</h4>`;

  shop.append(contenido);
  let comprar = document.createElement("button");
  comprar.className = "btn btn-primary";
  comprar.innerText = "comprar";
  contenido.append(comprar);
  comprar.addEventListener("click", () =>{
    carrito.push(
      {
        id: producto.id,
        img: producto.img,
        descripcion: producto.descripcion,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: producto.cantidad,
      });
      //mando al localStorage lo que se cargo al carrito
      saveLocal();
  })
});



 const pintarCarrito = () => {
  //para que arranque el carrito vacio 
  modalContainer.innerHTML = "";
  //para que muestre el modal porque al cerrarlo queda en display none
  modalContainer.style.display = "block";
  //aca arranca a crear el carrito esto es el header
  let modalHeader = document.createElement("div");
  modalHeader.className = "modal-Header d-flex  border border-3 border-dark";
  modalHeader.innerHTML = `
  <h1 class= "modalHeaderTitle">Carrito</h1> `
  ;
  modalContainer.append(modalHeader);
//aca creo el boton para cerrar el carrito con una x
  let modalButton = document.createElement("h1");
  modalButton.innerText = "X";
  modalButton.className = "modalHeaderButton";
   
  modalButton.addEventListener("click", () =>{
    modalContainer.style.display = "none";
  }
  )
  modalHeader.append(modalButton);
//recorro el carrito con los productos comprados 
  carrito.forEach((producto) => {
  let carritoContent =  document.createElement("div");
  carritoContent.className = "modalContent d-flex align-items-center justify-content-around";
  carritoContent.innerHTML = `
  <img class="card-img-top p-2" style="max-width: 15vw" src ="${producto.img}" >
  <h5 class="card-title m-3 fs-2 ">${producto.nombre}</h5>
  <h4 class="m-3 fs-1"> $ ${producto.precio} </h4>
  <p class= "fs-3"> Cantidad: ${producto.cantidad} </p>
  `;
  modalContainer.append(carritoContent);

  let eliminar = document.createElement("span");
eliminar.innerText = "❌";
eliminar.className = "deleteProduct";
carritoContent.append(eliminar);
eliminar.addEventListener("click", eliminarProducto );
});
//aca sumo el total del carrito con un reduce y muestro el total 
let costoTotal = carrito.reduce((acc,item) => acc + item.precio, 0);
let totalComprado = document.createElement("div")
totalComprado.className = "totalContent d-flex justify-content-end"
totalComprado.innerHTML = `
<h3 class="fs-1 p-3 border border-3 border-dark rounded-2 me-4"> Total a pagar $ ${costoTotal} </h3>`;
modalContainer.append(totalComprado);


};
verCarrito.addEventListener("click", pintarCarrito);


 //esta funcion es para eliminar del carrito compras el find busca todo el carrito 
const eliminarProducto = () => {
  const foundId = carrito.find((element) => element.id) ;
//pido que me retorne todo lo que sea diferente de carrito id
  carrito = carrito.filter((carritoId) => {
    return carritoId !== foundId;
  })
  pintarCarrito();
};
  
 


// guardo el carrito en localStorage
const saveLocal = () =>{
  localStorage.setItem("carrito", JSON.stringify(carrito));
}


//aca arranca la romana 

//clase constructora que me arma objetos con parametros que pido en el form , dentro de un array que declaro vacío (usuarios)
class Usuario {
  constructor(nombre, edad,metodoPago) {
    this.nombre = nombre;
    this.edad = edad;
    this.metodoPago = metodoPago;
  }
}


//se pide datos de usuario nombre, edad y forma de pago  y los valida, al final llamo a clase constructora para que arme objetos y los pushee al array usuarios
let usuarios = [];
const form = document.getElementById("usuarioForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nombreInput = document.getElementById("nombreInput");
  const edadInput = document.getElementById("edadInput");
  const inputGroupSelect01 = document.getElementById("inputGroupSelect01");
  let nombre = nombreInput.value;
  let edad = parseInt(edadInput.value);
  let metodoPago = inputGroupSelect01.value;

  if (!isNaN(edad) && edad >= 0 && nombre.length > 0) {
    const usuario = new Usuario(nombre, edad, metodoPago);
    usuarios.push(usuario);

    nombreInput.value = "";
    edadInput.value = "";
    inputGroupSelect01.value = "";
  } else {
    alert("Por favor, ingresa datos válidos.");
  }
  //console.log(usuarios);
  return usuarios;
});


let resultadoMayores = [];
let menoresRemovidos = false;

//(filter) saca a menores de 13 años del array usuarios y arma uno nuevo menoresRemovidos con los mayores solamente
function sacarMenores() {
  if (menoresRemovidos === false) {
    resultadoMayores = usuarios.filter(user => {
      return user.edad >= 13;
    });
    menoresRemovidos = true;
  }
}


let costoCena;
function corre() {
  sacarMenores();
  //validacion de entrada de datos debe ser un numero positivo sino alert y va de nuevo


  //  valor del input de costoCena
  const costoCenaInput = document.getElementById('costoCenaInput');
   costoCena = parseFloat(costoCenaInput.value);

  if (isNaN(costoCena)) {
    Swal.fire('Por favor, ingresa un número válido.');
    return;
  }

  //este for es para mostrar el nombre de quienes pusieron dinero al final de la romana
  let usuariosInfo = "";
  for (let i = 0; i < resultadoMayores.length; i++) {
    usuariosInfo += "\n" + resultadoMayores[i].nombre + "\n";
  }
  

  function calculoRomana(resultadoMayores, costoCena) {
    let montoRecaudado = 0;

    function rondaDeDinero(resultadoMayores, costoCena) {
      let montoRonda = 0;

      for (let i = 0; i < resultadoMayores.length; i++) {
        const dineroFaltante = costoCena - montoRonda;
        const comenzal = prompt(`Hola ${resultadoMayores[i].nombre} la cena costó ${parseInt(costoCena)} y falta poner ${dineroFaltante} entre ${
            resultadoMayores.length - i} Cuanto podés poner vos?`
        );
        if (isNaN(comenzal) || comenzal === "") {
          alert(" no es  un número.");
          i--;
          continue;
        }
        //se agrega la participacion de dinero de cada comenzal al array resultadoMayores
        let aporteComenzal = parseInt(comenzal);
        resultadoMayores[i].comenzal = aporteComenzal;

        montoRonda = montoRonda + parseInt(comenzal);

        console.log(" montoRecaudado: ", montoRonda);
      
      }
      // Si no alcanza alert "No llegamos a cubrir el costo: Vamos de nuevo." Y vuelvo a preguntar a todos cuanto quieren poner.
      if (montoRonda < costoCena) {
        alert("No llegamos a cubrir el costo: Vamos de nuevo.");
      }
      return montoRonda;
    }

    while (montoRecaudado < costoCena) {
      montoRecaudado = rondaDeDinero(resultadoMayores, costoCena);
      console.log(" Total recaudado en la romana: ", montoRecaudado);
    }
    // Si al final de la vuelta alcanza, mando alerta "A comer" y con lo que sobra agrego "Quedo X para propina."
    let propina = montoRecaudado - costoCena; 

    let resumenMetodosPago = "Resumen de métodos de pago:<br>";
    
    for (let i = 0; i < resultadoMayores.length; i++) {

      resumenMetodosPago += resultadoMayores[i].nombre + " pagó $ " + resultadoMayores[i].comenzal + " con " + resultadoMayores[i].metodoPago + "<br>";
    }
  
    const resumenMetodosPagoDiv = document.getElementById("resumenMetodosPago");
    resumenMetodosPagoDiv.innerHTML = resumenMetodosPago;
  
    return Swal.fire(
      `Genial ${usuariosInfo} juntamos ${montoRecaudado} y nos quedó ${propina} para la propina.`
    );
     // Mostrar resumen de métodos de pago
  }
  calculoRomana(resultadoMayores, costoCena);
}


let btnCena = document.getElementById("btnCena");
btnCena.addEventListener("click", corre);

let btnEquitativa = document.getElementById("btnEquitativa");
btnEquitativa.addEventListener("click", equitativa);

let iguales;
function equitativa(){
  sacarMenores();
  iguales = (parseInt(costoCena) / resultadoMayores.length);
  Swal.fire(`Si dividimos equitativamente la cena, cada uno debe poner $ ${iguales}`);
};

