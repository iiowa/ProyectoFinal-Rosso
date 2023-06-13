//Creacion carrito

let carrito = JSON.parse(localStorage.getItem("carrito"));
[];

//HTML

const containerCombos = document.getElementById("container-combos");

const mostrarCombos = () => {
  combos.forEach((combo) => {
    let container = document.createElement("div");
    container.classList.add("combos");
    container.innerHTML = `
    <div class="combos">
        <h2>${combo.nombre}</h2>
        <div class="texto-combo">
            <p>${combo.contenido}</p>
            <p>${combo.precio}</p>
        </div>
    <button id="agregar${combo.id}">Seleccionar</button>
    </div>`;

    containerCombos.appendChild(container);

    //Agregar al carrito
    const boton = document.getElementById(`agregar${combo.id}`);
    boton.addEventListener("click", () => {
      Toastify({
        text: `¡Agregaste ${combo.nombre} a tu carrito!`,
        duration: 2000,
      }).showToast();
      agregarCarrito(combo.id);
      salvarCarrito();
    });
  });
};
mostrarCombos();

//Agregar al carrito 2.0
const agregarCarrito = (id) => {
  const comboCarrito = combos.find((combo) => combo.id === id);
  carrito.push(comboCarrito);
  pagaTotal();
};

//Abrir carrito

const containerCarrito = document.getElementById("containerCarrito");
const abrirCarrito = document.getElementById("abrirCarrito");

abrirCarrito.addEventListener("click", () => {
  verCarrito();
});

const verCarrito = () => {
  containerCarrito.innerHTML = "";
  carrito.forEach((combo) => {
    const verCarrito = document.createElement("div");
    verCarrito.classList.add("ver-carrito");
    verCarrito.innerHTML = `
    <div>
      <div>
        <h5>${combo.nombre}</h5>
        <p>${combo.precio}</p>
        <p>${combo.cantidad}</p>
        <div>
          <button id="eliminar${combo.id}">Eliminar</button>
        </div>
      </div>
    </div>
  `;
    containerCarrito.appendChild(verCarrito);

    //Quitar del carrito
    const botonEliminar = document.getElementById(`eliminar${combo.id}`);
    botonEliminar.addEventListener("click", () => {
      eliminarDelCarrito(combo.id);
    });
  });
  pagaTotal();
};

//Eliminar del carrito

const eliminarDelCarrito = (id) => {
  carrito = carrito.filter((combo) => combo.id !== id);
  verCarrito();
  salvarCarrito();
};

//Paga total

const total = document.getElementById("total");

const pagaTotal = () => {
  let totalCompra = 0;
  carrito.forEach((combo) => {
    totalCompra += combo.precio * combo.cantidad;
  });
  total.innerHTML = `total: $${totalCompra}`;
};

//Storage
const salvarCarrito = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

JSON.parse(localStorage.getItem("carrito"));
