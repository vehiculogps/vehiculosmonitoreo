document.addEventListener('DOMContentLoaded', function () {
  console.log("Hola mundo");

  document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Evita que el formulario se envíe automáticamente

    // Obtén los valores de los campos del formulario
    var correo = document.getElementById('floatingInput').value;
    var contraseña = document.getElementById('floatingPassword').value;

    // Define formData dentro de la función de submit
    var formData = {
      email: correo,
      contraseña: contraseña,
    };

    console.log('Usuario:', correo);
    console.log('Contraseña:', contraseña);

    // Realiza la petición al servidor
    fetch('http://localhost:3000/usuarios/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(async (response) => {
        if (!response.ok) {
          const contentType = response.headers.get('Content-Type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al iniciar sesión.");
          } else {
            throw new Error("Error inesperado del servidor.");
          }
        }
        return response.json();
      })
      .then((data) => {
        const token = data.token;
        console.log('Token recibido:', token);

        // Guarda el token en el almacenamiento local
        localStorage.setItem('authToken', token);

        // Redirige a la página de administración
        window.location.href = '/admin';
      })
      .catch((err) => {
        console.error('Error de login:', err.message);
        alert(err.message || "Error al iniciar sesión.");
      });
  });

 
});
