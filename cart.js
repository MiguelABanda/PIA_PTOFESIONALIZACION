document.addEventListener('DOMContentLoaded', () => {
    // 1. Lógica para botones de compra (en productos.html)
    const botonesCompra = document.querySelectorAll('.btn-cortex[data-id]');
    botonesCompra.forEach(boton => {
        boton.addEventListener('click', (e) => {
            e.preventDefault();
            const producto = {
                id: boton.getAttribute('data-id'),
                nombre: boton.getAttribute('data-nombre'),
                precio: parseFloat(boton.getAttribute('data-precio')),
                cantidad: 1
            };
            
            if (producto.id && !isNaN(producto.precio)) {
                let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
                const existe = carrito.find(item => item.id === producto.id);
                if (existe) {
                    existe.cantidad++;
                } else {
                    carrito.push(producto);
                }
                localStorage.setItem('carrito', JSON.stringify(carrito));
                alert(`✅ ${producto.nombre} añadido al carrito.`);
            }
        });
    });

    // 2. Ejecutar render si estamos en la página del carrito
    if (document.getElementById('cart-items')) {
        renderCarrito();
    }
});

// FUNCIONES DEL CARRITO
function renderCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const tabla = document.getElementById('cart-items');
    const content = document.getElementById('cart-content');
    const empty = document.getElementById('empty-msg');

    if (carrito.length === 0) {
        if(content) content.style.display = 'none';
        if(empty) empty.style.display = 'block';
        return;
    }

    if(content) content.style.display = 'block';
    if(empty) empty.style.display = 'none';

    tabla.innerHTML = '';
    let neto = 0;
    let ivaTotal = 0;

    carrito.forEach((item, i) => {
        const ivaInd = item.precio * 0.16;
        const subtotal = (item.precio + ivaInd) * item.cantidad;
        neto += (item.precio * item.cantidad);
        ivaTotal += (ivaInd * item.cantidad);

        tabla.innerHTML += `
            <tr>
                <td>
                    <div class="qty-controls">
                        <button class="btn-qty" onclick="cambiarCant(${i}, -1)">-</button>
                        <span class="qty-num">${item.cantidad}</span>
                        <button class="btn-qty" onclick="cambiarCant(${i}, 1)">+</button>
                    </div>
                </td>
                <td style="text-align: left;">${item.nombre.toUpperCase()}</td>
                <td>$${item.precio.toFixed(2)}</td>
                <td>$${ivaInd.toFixed(2)}</td>
                <td>$${subtotal.toFixed(2)}</td>
                <td><button onclick="borrar(${i})" style="color:red; cursor:pointer; border:none; background:none;">[X]</button></td>
            </tr>`;
    });

    document.getElementById('display-subtotal').innerText = `$${neto.toFixed(2)}`;
    document.getElementById('display-iva').innerText = `$${ivaTotal.toFixed(2)}`;
    document.getElementById('display-total').innerText = `$${(neto + ivaTotal).toFixed(2)} MXN`;
}

function cambiarCant(index, cambio) {
    let carrito = JSON.parse(localStorage.getItem('carrito'));
    carrito[index].cantidad += cambio;
    if (carrito[index].cantidad <= 0) carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderCarrito();
}

function borrar(i) {
    let c = JSON.parse(localStorage.getItem('carrito'));
    c.splice(i, 1);
    localStorage.setItem('carrito', JSON.stringify(c));
    renderCarrito();
}

function procesarCompraFinal() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }
    localStorage.setItem('ultima_compra', JSON.stringify(carrito));
    localStorage.removeItem('carrito');
    window.location.href = 'confirmacion.html';
}