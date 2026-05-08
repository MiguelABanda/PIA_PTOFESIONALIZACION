
const botonesCortex = document.querySelectorAll('.btn-cortex');

botonesCortex.forEach(boton => {
    boton.addEventListener('click', () => {
        // Extraemos la información de los Data Attributes que pusimos en el HTML
        const producto = {
            id: boton.getAttribute('data-id'),
            nombre: boton.getAttribute('data-nombre'),
            precio: parseFloat(boton.getAttribute('data-precio')),
            cantidad: 1
        };

        // Recuperamos el carrito actual o creamos uno vacío
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        
        // Verificamos si el producto ya existe para solo sumar la cantidad
        const existe = carrito.find(item => item.id === producto.id);
        
        if (existe) {
            existe.cantidad++;
        } else {
            carrito.push(producto);
        }

        // Guardamos el array actualizado en LocalStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));
        
        // Feedback visual rápido
        alert(`Añadido: ${producto.nombre}`);
    });
});