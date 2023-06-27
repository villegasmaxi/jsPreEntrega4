
//carrito de compras



const imageMars = document.getElementById("foto");

fetch("https://api.nasa.gov/planetary/apod?api_key=LDoReeXa9lCBruFtoek2eiKhomklHztEKhFO24uF")

//fetch("http://www.themealdb.com/api/json/v1/1/random.php")

.then((respuesta) => respuesta.json())
.then((data) => {
  console.log(data);

  const spaceInfo = document.createElement("div");
 spaceInfo.className = "container border border-3 mt-5 "
  spaceInfo.innerHTML = `
  <h3 class=" p-5 mt-5 border border-3 bg-secondary text-white">Mientras preparamos tu pedido mirá estos datos del espacio...</h3>
  <h4>${data.title}</h4>
  <img src =${data.url}></img>
  <h4>${data.copyright}</h4>
  `;

  imageMars.append(spaceInfo);
});


const shop = document.getElementById("shop"); 
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modalContainer");

const getProducts = async () => {
  const response =  await fetch("data.json");
  const data = await response.json();
  console.log(data);

  data.forEach((producto) => {
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
        saveLocal();
    })
  });
  
};

getProducts();

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//aca hago la lista de productos con los datos y el boton para comprar

let costoTotal;
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
  <h5 class= "fs-3"> cantidad: ${producto.cantidad} </h5>
  `;
  modalContainer.append(carritoContent);

  let eliminar = document.createElement("span");

eliminar.innerText = "❌";
eliminar.className = "deleteProduct";
carritoContent.append(eliminar);
eliminar.addEventListener("click", () => {eliminarProducto(`${producto.id}`)});
});

//aca sumo el total del carrito con un reduce y muestro el total 
costoTotal = carrito.reduce((acc,item) => acc + item.precio, 0);

let totalComprado = document.createElement("div")
totalComprado.className = "totalContent d-flex justify-content-end"
totalComprado.innerHTML = `
<h3 class="fs-1 p-3 border border-3 border-dark rounded-2 me-4"> Total a pagar $ ${costoTotal} </h3>`;
modalContainer.append(totalComprado);


};
verCarrito.addEventListener("click", pintarCarrito);


const eliminarProducto = (id) => {
  // Esta funcion devuelve el indice del elemento en el array que coincide con el id proporcionado. (Si el id no existe devuelve -1)
  const findIndex = carrito.findIndex((element) => element.id === Number(id))
  // Usamos el metodo splice para quitar el elemento del array.
  if (findIndex !== -1) {
    carrito.splice(findIndex, 1)
  }
  saveLocal();
  pintarCarrito();
};
  
// guardo el carrito en localStorage
const saveLocal = () =>{
  localStorage.setItem("carrito", JSON.stringify(carrito));
}


//romana 
//clase constructora que me arma objetos con parametros que pido en el form , dentro de un array que declaro vacío (usuarios)
class Usuario {
  constructor(nombre, edad,metodoPago) {
    this.nombre = nombre;
    this.edad = edad;
    this.metodoPago = metodoPago;
  }
}


//se pide datos de usuario, valida, llama a clase constructora para que arme objetos y los pushee al array usuarios
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
    Swal.fire("Por favor, ingresa datos válidos.");
  }
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
      let comenzal="";
      for (let i = 0; i < resultadoMayores.length; i++) {
        const dineroFaltante = costoCena - montoRonda;

        
        let inputComenzal = document.getElementById("comenzalInput");
        let inputComenzalContent = document.createElement("div");
        inputComenzalContent.className =" d-flex flex-column";
        inputComenzalContent.innerHTML = `
        <p> Hola ${resultadoMayores[i].nombre} la cena costó ${parseInt(costoCena)} y falta poner ${dineroFaltante} entre ${
          resultadoMayores.length - i}</p>
          <h6> "cuanto podes poner vos?"</h6>
          <label class="fs-5" >Monto:</label>
            <input
              class="border border-4 border-info"
              type="number"
              id="cadaUnoPone"
            />
            <button id="comenzalButton" >"puedo poner esto"</button>
        `;
        inputComenzal.append(inputComenzalContent);
        
        let comenzalButton = document.getElementById("comenzalButton");

 comenzalButton.addEventListener("click", () => {
   comenzal = comenzal + cadaUnoPone.value;


  if (isNaN(comenzal) || comenzal === "") {
    alert("No es un número válido.");
    i--;
    }
});


        

      


        /* const comenzal = prompt(`Hola ${resultadoMayores[i].nombre} la cena costó ${parseInt(costoCena)} y falta poner {dineroFaltante} entre ${resultadoMayores.length - i} Cuanto podés poner vos?`);*/

        //se agrega la participacion de dinero de cada comenzal al array resultadoMayores
        let aporteComenzal = parseInt(comenzal);
        resultadoMayores[i].comenzal = aporteComenzal;

        montoRonda = montoRonda + parseInt(comenzal);

        //console.log(" montoRecaudado: ", montoRonda);
      
      // Si no alcanza alert "No llegamos a cubrir el costo: Vamos de nuevo." Y vuelvo a preguntar a todos cuanto quieren poner.
      if (montoRonda < costoCena) {
        alert("No llegamos a cubrir el costo: Vamos de nuevo.");
       }
      return montoRonda;
    }
    }

    while (montoRecaudado < costoCena) {
      montoRecaudado = rondaDeDinero(resultadoMayores, costoCena);
      //console.log(" Total recaudado en la romana: ", montoRecaudado);
    }
    // Si al final de la vuelta alcanza, mando alerta "A comer" y con lo que sobra agrego "Quedo X para propina."
    let propina = montoRecaudado - costoCena; 

    let resumenMetodosPago = "Resumen de métodos de pago:<br>";
    
    for (let i = 0; i < resultadoMayores.length; i++) {

      resumenMetodosPago += resultadoMayores[i].nombre + " pagó $ " + resultadoMayores[i].comenzal + " con " + resultadoMayores[i].metodoPago + "<br>";
    }
  // Mostrar resumen de métodos de pago
    const resumenMetodosPagoDiv = document.getElementById("resumenMetodosPago");
    resumenMetodosPagoDiv.innerHTML = resumenMetodosPago;
  
    return Swal.fire(
      `Genial ${usuariosInfo} juntamos ${montoRecaudado} y nos quedó ${propina} para la propina.`
    );   
  };
  
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
}