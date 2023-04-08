const formLogin = document.getElementById("form-login");
formLogin.addEventListener("submit", login);

function login(event) {
    event.preventDefault(); // evitar la acción por defecto del formulario
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    // Verificamos si las credenciales son correctas
    if (username === "user" && password === "coder") {
      // Si son correctas, redirigimos a la página del carrito
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Bienvenido!',
        showConfirmButton: false,
        timer: 1000,
        customClass: {
          popup: 'swal-wide'
        }
      })  
      .then(() => {
        sessionStorage.setItem("logged", true);
        window.location.replace("index.html");
      });

    } else {
      // Si no son correctas, mostramos un mensaje de error
      const error = document.getElementById("error-message");
      error.innerText = "Credenciales inválidas";
    }
  }
