// Archivo: contacto.js

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('whatsapp-form');

    if (form) {
        form.addEventListener('submit', function(e) {
            // Esta línea es CRUCIAL: evita que el navegador intente hacer el envío tradicional
            e.preventDefault(); 

            // --- CONFIGURACIÓN: Pon tu número de WhatsApp aquí ---
            const telefono = "528113465800"; 
            // ----------------------------------------------------

            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const asunto = document.getElementById('asunto').value;
            const mensaje = document.getElementById('mensaje').value;

            // Formatear mensaje para que se vea profesional en WhatsApp
            const textoMensaje = `*Cortex Systems - Nuevo Contacto*%0A%0A` +
                                `*Nombre:* ${nombre}%0A` +
                                `*Email:* ${email}%0A` +
                                `*Asunto:* ${asunto}%0A%0A` +
                                `*Mensaje:*%0A${mensaje}`;

            const url = `https://wa.me/${telefono}?text=${textoMensaje}`;

            // Abrir WhatsApp en una nueva pestaña
            window.open(url, '_blank');
        });
    } else {
        console.error("No se encontró el formulario con ID 'whatsapp-form'");
    }
});