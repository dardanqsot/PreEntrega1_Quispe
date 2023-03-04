class Producto {
  constructor(id, nombre, precio) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
  }
}

// Creación del catálogo de productos

const catalogo = [
  new Producto(1, 'Camisa', 12.90),
  new Producto(2, 'Pantalón', 20.99),
  new Producto(3, 'Zapatos', 30.49),
  new Producto(4, 'Polera', 15.99),
  new Producto(5, 'Casaca', 40.99)
];

//Uso de arrar con scope global
let carrito = [];

// Funcion para mostar productos en el HTML
const mostrarProductos = () => {
  console.log("en mostrar producto!!!");
  const listaProductos = document.getElementById('lista-producto');
  let indice = 0;
  catalogo.forEach(producto => {
    indice++;
    console.log("en FOR EACH!!!");
    const li = document.createElement('li');
    const textoLi = document.createTextNode(producto.nombre + ' - $' + producto.precio.toFixed(2));
    const cantidadInput = document.createElement("input");
    cantidadInput.type = "number";
    cantidadInput.className = "cantidad-producto";
    cantidadInput.min = "1";
    cantidadInput.value = "1";

    const button = document.createElement('button');
    button.textContent = 'Agregar al carrito';
    button.onclick = function() {
      var cantidad = this.previousSibling.value;
      agregarAlCarrito(producto.id, cantidad);
    };
    li.appendChild(textoLi);
    li.appendChild(cantidadInput);
    li.appendChild(button);
    listaProductos.appendChild(li);
  });
};


// Función para actualizar la lista del carrito y el total, promedio, máximo, mínimo usando métodos de Math
const actualizarCarrito = () => {
  const listaCarrito = document.getElementById('lista-carrito');
  let total = 0;
  listaCarrito.innerHTML = '';
  carrito.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.producto.nombre + ' x ' + item.cantidad + ' - $' + (item.producto.precio * item.cantidad).toFixed(2);
    listaCarrito.appendChild(li);
    total += (item.producto.precio * item.cantidad);
  });
  if(carrito.length > 0) {
    document.getElementById('total').textContent = 'Total: $' + total.toFixed(2);
    document.getElementById('promedio').textContent = 'Promedio: $' + (total / carrito.length).toFixed(2);
    document.getElementById('maximo').textContent = 'Máximo: $' + Math.max(...carrito.map(item => item.producto.precio * item.cantidad)).toFixed(2);
    document.getElementById('minimo').textContent = 'Mínimo. $' + Math.min(...carrito.map(item => item.producto.precio * item.cantidad)).toFixed(2);
  }
}


// Función para agregar un producto al carrito
const agregarAlCarrito = (id, cantidad) => {
  const producto = catalogo.find(producto => producto.id === id);
  if (!producto) {
    console.error('Producto no encontrado en el catálogo');
    return;
  }
  const productoEnCarrito = carrito.find(item => item.producto.nombre === producto.nombre);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad += parseInt(cantidad);
  } else {
    carrito.push({ producto, cantidad: parseInt(cantidad) });
  }
  actualizarCarrito();
  console.log('Producto agregado al carrito:', producto.nombre);
  console.log('Carrito:', carrito);
};



// Función para filtrar los productos en el catálogo
const filtrarProductos = () => {
  const valor = document.getElementById("filtro").value;
  console.log('filtrarProductos valor a filtrar: ' + valor);
  const listaFiltrada = document.getElementById('lista-filtrada');
  listaFiltrada.innerHTML = '';
  const productosBaratos = catalogo.filter(producto => producto.precio < valor);
  productosBaratos.forEach(producto => {
    const li = document.createElement('li');
    li.textContent = producto.nombre + ' - $' + producto.precio.toFixed(2);
    listaFiltrada.appendChild(li);
  });
};


const vaciarCarrito = () => {
  carrito = [];
  document.getElementById('total').textContent = '';
  document.getElementById('promedio').textContent = '';
  document.getElementById('maximo').textContent = '';
  document.getElementById('minimo').textContent = '';
  actualizarCarrito();
}
// Mostrar los productos del catálogo
mostrarProductos();



