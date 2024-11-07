document.addEventListener('DOMContentLoaded', function() {
  console.log("hola mundo");

  document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que el formulario se envíe

    var correo = document.getElementById('floatingInput').value;
    var contraseña = document.getElementById('floatingPassword').value;

    var formData = {
      email: correo,
      contraseña: contraseña
    };

    console.log('Usuario:', correo);
    console.log('Contraseña:', contraseña);

    fetch('http://localhost:3000/usuarios/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      var token = data.token;
      console.log('Token recibido:', token);
      window.location.href = '/';
    });
  });
});

