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
  new Producto(4, 'Polera', 15.99)
];

//Uso de arrar con scope global
let carrito = [];

//limpiar el carrito
const vaciarCarrito = () => {
  carrito = [];
  actualizarCarrito();
}

// Función para actualizar la lista del carrito y el total, promedio, máximo, mínimo usando métodos de Math
const actualizarCarrito = () => {
  let total = 0;
  let listaCarrito = '';
  carrito.forEach(item => {
    listaCarrito += item.producto.nombre + ' x ' + item.cantidad + ' - $' + (item.producto.precio * item.cantidad).toFixed(2) + ' \n';
    total += (item.producto.precio * item.cantidad);
  });
  if(carrito.length > 0) {
    listaCarrito += 'Total: $' + total.toFixed(2)+'\n';
    listaCarrito += 'Promedio: $' + (total / carrito.length).toFixed(2)+'\n';
    listaCarrito += 'Máximo: $' + Math.max(...carrito.map(item => item.producto.precio * item.cantidad)).toFixed(2)+'\n';
    listaCarrito += 'Mínimo. $' + Math.min(...carrito.map(item => item.producto.precio * item.cantidad)).toFixed(2)+'\n';
  }
  return listaCarrito;
}

// Función para agregar un producto al carrito
const agregarAlCarrito = (id, cantidad) => {
  const producto = catalogo.find(producto => producto.id === id);
  if (!producto) {
    alert('Producto no encontrado en el catálogo');
    return;
  }
  const productoEnCarrito = carrito.find(item => item.producto.nombre === producto.nombre);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad += parseInt(cantidad);
  } else {
    carrito.push({ producto, cantidad: parseInt(cantidad) });
  }
  console.log('Producto agregado al carrito:', producto.nombre);
  console.log('Carrito:', carrito);
};

let mostrarProductos = () => {
  let listaProductos = ' Código:  |   Nombre:    | Precio: \n';
  catalogo.forEach(producto => {
    listaProductos += producto.id + '             |   '+ producto.nombre + '     |    $' + producto.precio.toFixed(2) + '\n';
  });
  return listaProductos;
};

// Función para filtrar los productos en el catálogo (funcionalidad a agregar con imputs HTML - próxima entrega)
const filtrarProductos = () => {
  const productosBaratos = catalogo.filter(producto => producto.precio < 10);
  let listaFiltrada = '';
  productosBaratos.forEach(producto => {
    listaFiltrada += producto.nombre + ' - $' + producto.precio.toFixed(2) + '\n';
  });
};


alert("Bienvenido al carrito de compras! \n");
//Inicio interacción
let codigoProducto = -1;
while(codigoProducto!=0){
  codigoProducto = parseInt(prompt("Ingrese el código del producto a agregar: ingrese (0) para salir Ó (-1) para limpiar el carrito : \n"
 + mostrarProductos()
 + actualizarCarrito()));

  console.log("Opcion: " + codigoProducto);
  console.log("NUMBER? " + Number.isNaN(codigoProducto));

  if(Number.isNaN(codigoProducto))
    alert("Opción no valida!!!");
  else{
    codigoProducto = parseInt(codigoProducto);
    if(codigoProducto === 0)
    {
      alert("Gracias por visitarnos, vuelva pronto!");
    } 
    else if(codigoProducto === -1){
      vaciarCarrito();
    }
    else{
      agregarAlCarrito(codigoProducto , 1);
    }
  }
}



