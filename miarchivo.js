class Producto {
  constructor(id, title, price, description, category, image, rating) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.category = category;
    this.image = image;
    this.rating = rating;
  }
}
// Creación del catálogo de productos

let catalogo = [];

//Uso de arrar con scope global
let carrito = [];


//Llamada a API con Fetch
let productos;


const listaProductosApi = [];

// Funcion para mostar productos en el HTML
const mostrarProductos = () => {
  console.log("en mostrar producto!!!");
  fetch("https://fakestoreapi.com/products")
  .then(response => response.json())
  .then(data => {

    data.forEach(producto => {
      const { id, title, price, description, category, image, rating } = producto;
      const nuevoProducto = new Producto(id, title, price, description, category, image, rating);
      listaProductosApi.push(nuevoProducto);
    });
    catalogo = listaProductosApi;
    const listaProductos = document.getElementById('lista-producto');
    catalogo.forEach(producto => {
      console.log("en FOR EACH!!!");
      const li = document.createElement('li');

      // Crear un elemento img y asignarle la URL del atributo "image" del producto
      const img = document.createElement('img');
      img.src = producto.image;

      const textoLi = document.createTextNode(producto.title + ' - $' + producto.price.toFixed(2));
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
        Toastify({
          text: "Producto agregado al carrito",
          backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
          duration: 1000,
          close: true,
          gravity: "bottom",
          position: "right",
          offset: {
            y: 20 
          }
        }).showToast();
      };

      li.appendChild(img);
      li.appendChild(textoLi);
      li.appendChild(cantidadInput);
      li.appendChild(button);
      listaProductos.appendChild(li);
    });
    console.log("listaProductosApi: ");
    console.log(listaProductosApi);
  })
  .catch(error => {
    console.error(error);
  });

};


// Función para actualizar la lista del carrito y el total, promedio, máximo, mínimo usando métodos de Math
const actualizarCarrito = () => {
  const listaCarrito = document.getElementById('lista-carrito');
  let total = 0;
  listaCarrito.innerHTML = '';

  // obtener el carrito del almacenamiento local o inicializarlo
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  carrito.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.producto.title + ' x ' + item.cantidad + ' - $' + (item.producto.price * item.cantidad).toFixed(2);
    listaCarrito.appendChild(li);
    total += (item.producto.price * item.cantidad);
  });
  if(carrito.length > 0) {
    document.getElementById('total').textContent = 'Total: $' + total.toFixed(2);
    document.getElementById('promedio').textContent = 'Promedio: $' + (total / carrito.length).toFixed(2);
    //Uso de Spread para hallar el maxímo y mínimo 
    document.getElementById('maximo').textContent = 'Máximo: $' + Math.max(...carrito.map(item => item.producto.price * item.cantidad)).toFixed(2);
    document.getElementById('minimo').textContent = 'Mínimo. $' + Math.min(...carrito.map(item => item.producto.price * item.cantidad)).toFixed(2);
  }
}


// Función para agregar un producto al carrito
const agregarAlCarrito = (id, cantidad) => {
  const producto = catalogo.find(producto => producto.id === id);
  if (!producto) {
    console.error('Producto no encontrado en el catálogo');
    return;
  }
  const productoEnCarrito = carrito.find(item => item.producto.title === producto.title);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad += parseInt(cantidad);
  } else {
    carrito.push({ producto, cantidad: parseInt(cantidad) });
  }

  // guardar el carrito en el almacenamiento local
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarCarrito();
  console.log('Producto agregado al carrito:', producto.title);
  console.log('Carrito:', carrito);
};



// Función para filtrar los productos en el catálogo
const filtrarProductos = () => {
  const valor = document.getElementById("filtro").value;
  console.log('filtrarProductos valor a filtrar: ' + valor);
  const listaFiltrada = document.getElementById('lista-filtrada');
  listaFiltrada.innerHTML = '';
  const productosBaratos = catalogo.filter(producto => producto.price < valor);
  productosBaratos.forEach(producto => {
    const li = document.createElement('li');
    li.textContent = producto.title + ' - $' + producto.price.toFixed(2);
    listaFiltrada.appendChild(li);
  });
};


const vaciarCarrito = () => {
  Swal.fire({
    title: "¿Esta seguro de limpiar el carrito?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: 'Sí, seguro',
    cancelButtonText: 'No, cancelar',
    dangerMode: true,
  })
  .then((confirmar) => {
    if (confirmar.isConfirmed) {
      localStorage.removeItem("carrito");
      carrito = [];
      document.getElementById('total').textContent = '';
      document.getElementById('promedio').textContent = '';
      document.getElementById('maximo').textContent = '';
      document.getElementById('minimo').textContent = '';
      actualizarCarrito();
      Swal.fire("Carrito Limpiado", {
        icon: "success",
      });
    }
  });

}
// Mostrar los productos del catálogo
const iniciar = () => {
  const fechaActual = luxon.DateTime.local().toFormat('dd/MM/yyyy');
  document.getElementById('fecha-actual').textContent = fechaActual;

  // Verificar si el usuario ha iniciado sesión
  if (!sessionStorage.getItem("logged")) {
      window.location.replace("login.html");
    return;
  }
  mostrarProductos();
  actualizarCarrito();
}

const cerrarSesion = () => {
  Swal.fire({
    title: "¿Esta seguro de cerrar sesión?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: 'Sí, seguro',
    cancelButtonText: 'No, cancelar',
    dangerMode: true,
  })
  .then((confirmar) => {
    if (confirmar.isConfirmed) {
      sessionStorage.clear();
      localStorage.removeItem('carrito');
      window.location.href = 'login.html';
      Swal.fire("Gracias por su visita", {
        icon: "success",
      });
    }
  });
}

iniciar();
