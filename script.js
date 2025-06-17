(() => {
 const apiUrl = "http://www.raydelto.org/agenda.php";

  const form = document.getElementById('contactForm');
  const list = document.getElementById('contactList');
  const mostrarBtn = document.getElementById('mostrarBtn');
  const contactModal = document.getElementById('contactModal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  const cargarContactos = async () => {
    try {
      const res = await fetch(apiUrl);
      const contactos = await res.json();

      list.innerHTML = '';
      contactos.forEach(c => {
        const li = document.createElement('li');
        li.textContent = `${c.nombre} ${c.apellido} - ${c.telefono}`;
        list.appendChild(li);
      });
    } catch (error) {
      list.innerHTML = '<li style="color:red;">Error al cargar contactos</li>';
    }
  };

  const mostrarMensaje = (text, type) => {
    const messageBox = document.getElementById("message-box");
    messageBox.innerHTML = ''; 

    if (type === "success") {
        messageBox.style.backgroundColor = "#d4edda";
        messageBox.style.borderLeftColor = "#28a745";
        messageBox.style.color = "#155724";
    } else if (type === "error") {
        messageBox.style.backgroundColor = "#f8d7da";
        messageBox.style.borderLeftColor = "#dc3545";
        messageBox.style.color = "#721c24";
    }

    const textNode = document.createTextNode(` ${text}`);
    messageBox.appendChild(textNode);

    messageBox.classList.add("show");

    setTimeout(() => {
        messageBox.classList.remove("show");
    }, 3000);
};

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const telefono = document.getElementById('telefono').value.trim();

    if (!nombre || !apellido || !telefono) {
      mostrarMensaje('Todos los campos son obligatorios', 'red');
      return;
    }

  const nuevoContacto = { nombre, apellido, telefono };
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(nuevoContacto)
      });

      form.reset();
      mostrarMensaje('Contacto agregado exitosamente');
      cargarContactos();
    } catch (error) {
      mostrarMensaje('Error al agregar contacto', 'red');
    }
  });

mostrarBtn.addEventListener('click', async () => {
    contactModal.classList.toggle('hidden');
    await cargarContactos();
  });

  closeModalBtn.addEventListener('click', () => {
    contactModal.classList.add('hidden');
  });

  cargarContactos(); 
})();
