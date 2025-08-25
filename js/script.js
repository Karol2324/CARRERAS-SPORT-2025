document.addEventListener('DOMContentLoaded', () => {
    // Datos de los productos (puedes añadir más)
    const productos = [
        {
            id: 'p1',
            nombre: 'Gorra Red Bull Racing F1',
            categoria: 'f1',
            imagen: './images/gorra red bull f1.png',
            descripcion: 'La gorra oficial del equipo Red Bull Racing de Fórmula 1.',
            tallas: ['Única'],
            precio: 35.00
        },
        {
            id: 'p2',
            nombre: 'Camiseta Valentino Rossi MotoGP',
            categoria: 'motogp',
            imagen: './images/Camiseta réplica de Valentino Rossi, _The Doctor_.jpg',
            descripcion: 'Camiseta réplica de Valentino Rossi, "The Doctor".',
            tallas: ['S', 'M', 'L', 'XL'],
            precio: 50.00
        },
        {
            id: 'p3',
            nombre: 'Miniatura Mercedes F1 W13',
            categoria: 'f1',
            imagen: './images/Miniatura Coche F1 Lewis Hamilton.jpg',
            descripcion: 'Coche a escala 1:43 del Mercedes-AMG F1 W13 de Lewis Hamilton.',
            tallas: ['Única'],
            precio: 80.00
        },
        {
            id: 'p4',
            nombre: 'Sudadera Scuderia Ferrari F1',
            categoria: 'f1',
            imagen: './images/Sudadera oficial del equipo Scuderia Ferrari de Fórmula 1..webp',
            descripcion: 'Sudadera oficial del equipo Scuderia Ferrari de Fórmula 1.',
            tallas: ['S', 'M', 'L', 'XL'],
            precio: 95.00
        },
        {
            id: 'p5',
            nombre: 'Llavero Casco F1 Max Verstappen',
            categoria: 'f1',
            imagen: './images/Llavero Casco F1 Max Verstappen.webp',
            descripcion: 'Réplica en miniatura del casco de Max Verstappen.',
            tallas: ['Única'],
            precio: 38.00
        },
        {
            id: 'p6',
            nombre: 'Chaqueta universitaria F1',
            categoria: 'f1',
            imagen: './images/Chaqueta universitaria de Fórmula 1, estilo retro.jpg', // Usando la misma imagen para la demo
            descripcion: 'Chaqueta universitaria de Fórmula 1, estilo retro.',
            tallas: ['S', 'M', 'L', 'XL'],
            precio: 234.00
        },
        {
            id: 'p7',
            nombre: 'Monster Energy Yamaha MotoGP',
            categoria: 'motogp',
            imagen: './images/Monster Energy Yamaha MotoGP.avif', // Usando la misma imagen para la demo
            descripcion: 'Chaqueta rompevientos oficial del equipo Monster Energy Yamaha de MotoGP.',
            tallas: ['S', 'M', 'L'],
            precio: 94.50
        },
        {
            id: 'p8',
            nombre: 'Gorro de pescador VR46',
            categoria: 'motogp',
            imagen: './images/Gorro de pescador VR46.jpg', // Usando la misma imagen para la demo
            descripcion: 'Gorro de pescador VR46 Racing Valentino Rossi MGP.',
            tallas: ['Única'],
            precio: 20.30
        },
        {
            id: 'p9',
            nombre: 'Camiseta Marc Marquez',
            categoria: 'motogp',
            imagen: './images/Camiseta Marc Marquez Ducati MotoGP.jpg', // Usando la misma imagen para la demo
            descripcion: 'Camiseta Marc Marquez Ducati MotoGP',
            tallas: ['S', 'M', 'L'],
            precio: 70.30
        },
        {
            id: 'p10',
            nombre: 'Llavero Red Bull KTM Racing MotoGP',
            categoria: 'motogp',
            imagen: './images/llavero-red-bull-ktm-racing-motogp.jpg', // Usando la misma imagen para la demo
            descripcion: 'Llavero oficial del equipo Red Bull KTM Racing, que lucirán los pilotos de MotoGP, Brad Binder y Miguel Oliveira.',
            tallas: ['Única'],
            precio: 10.90
        },
        {
            id: 'p11',
            nombre: 'Camiseta Carlos Sainz Williams F1 2025',
            categoria: 'f1',
            imagen: './images/Camiseta Carlos Sainz Williams F1 2025.jpg', // Usando la misma imagen para la demo
            descripcion: 'Camiseta Carlos Sainz Williams F1 2025',
            tallas: ['S', 'M', 'L'],
            precio: 59.90
        },
        {
            id: 'p12',
            nombre: 'Sudadera Marc Marquez',
            categoria: 'motogp',
            imagen: './images/Sudadera Marc Marquez Ducati MotoGP.webp', // Usando la misma imagen para la demo
            descripcion: 'Sudadera Marc Marquez Ducati MotoGP',
            tallas: ['S', 'M', 'L'],
            precio: 99.90
        },
        {
            id: 'p13',
            nombre: 'Gorra Lewis Hamilton Ferrari',
            categoria: 'f1',
            imagen: './images/Gorra Lewis Hamilton Ferrari F1 2025 Roja.webp', // Usando la misma imagen para la demo
            descripcion: 'Gorra Lewis Hamilton Ferrari F1 2025 Roja',
            tallas: ['Única'],
            precio: 39.90
        },
        {
            id: 'p14',
            nombre: 'Camiseta Red Bull KTM Racing',
            categoria: 'motogp',
            imagen: './images/Camiseta Red Bull KTM Racing.jpg', // Usando la misma imagen para la demo
            descripcion: 'Camiseta Red Bull KTM Racing',
            tallas: ['S', 'M', 'L'],
            precio: 44.90
        },
    ];

    // Referencias a elementos del DOM
    const productGrid = document.getElementById('product-grid');
    const filtroSelect = document.getElementById('filtro-select');
    const searchInput = document.getElementById('search-input');

    const cartIcon = document.getElementById('cart-icon');
    const cartIconMobile = document.getElementById('cart-icon-mobile');
    const shoppingCartSidebar = document.getElementById('shopping-cart-sidebar');
    const closeCartBtn = document.querySelector('.close-cart-btn');
    const cartItemsList = document.querySelector('.cart-items-list');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const cartCount = document.getElementById('cart-count');
    const cartCountMobile = document.getElementById('cart-count-mobile');
    const checkoutBtn = document.querySelector('.checkout-btn'); // Nuevo botón de checkout

    // Carrito de compras (se carga desde localStorage o se inicializa vacío)
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

    // Función para crear una tarjeta de producto
    function crearTarjetaProducto(producto) {
        const card = document.createElement('article');
        card.classList.add('product-card');
        card.dataset.id = producto.id; // Añadir data-id para identificar el producto

        const tallasHTML = producto.tallas.map(talla => `<button class="talla-btn" data-talla="${talla}">${talla}</button>`).join('');

        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${producto.nombre}</h3>
                <p class="product-price">$${producto.precio.toFixed(2)}</p>
            </div>
            <div class="product-details">
                <h4 class="details-title">${producto.nombre}</h4>
                <p class="details-description">${producto.descripcion}</p>
                <div class="details-options">
                    <p><strong>Tallas:</strong></p>
                    <div class="tallas-container">
                        ${tallasHTML}
                    </div>
                    <div class="compra-opciones">
                        <label for="cantidad-${producto.id}">Cantidad:</label>
                        <input type="number" id="cantidad-${producto.id}" value="1" min="1" max="10">
                    </div>
                    <button class="add-to-cart-btn"
                            data-id="${producto.id}"
                            data-nombre="${producto.nombre}"
                            data-precio="${producto.precio}"
                            data-imagen="${producto.imagen}">
                        Añadir al carrito <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
        `;

        // Event listener para seleccionar tallas
        const tallaButtons = card.querySelectorAll('.talla-btn');
        tallaButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Eliminar la clase 'selected' de todos los botones de talla en esta tarjeta
                tallaButtons.forEach(b => b.classList.remove('selected'));
                // Añadir la clase 'selected' al botón que se hizo clic
                e.target.classList.add('selected');
            });
        });

        return card;
    }

    // Función para renderizar los productos en la cuadrícula
    function renderizarProductos(productosAFiltrar) {
        productGrid.innerHTML = '';
        productosAFiltrar.forEach(producto => {
            const card = crearTarjetaProducto(producto);
            productGrid.appendChild(card);
        });
    }

    // Función para manejar el filtrado y búsqueda
    function manejarFiltro() {
        const categoriaSeleccionada = filtroSelect.value;
        const textoBusqueda = searchInput.value.toLowerCase();

        const productosFiltrados = productos.filter(producto => {
            const coincideCategoria = categoriaSeleccionada === 'todos' || producto.categoria === categoriaSeleccionada;
            const coincideBusqueda = producto.nombre.toLowerCase().includes(textoBusqueda) || producto.descripcion.toLowerCase().includes(textoBusqueda);
            return coincideCategoria && coincideBusqueda;
        });

        renderizarProductos(productosFiltrados);
    }

    // Función para guardar el carrito en localStorage
    function saveCart() {
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    // Función para renderizar el carrito en la barra lateral
    function renderCartSidebar() {
        cartItemsList.innerHTML = '';
        let total = 0;
        let itemCount = 0;

        if (cart.length === 0) {
            const emptyMessage = document.createElement('p');
            emptyMessage.textContent = 'Tu carrito está vacío.';
            emptyMessage.style.color = '#ccc';
            emptyMessage.style.textAlign = 'center';
            cartItemsList.appendChild(emptyMessage);
        } else {
            cart.forEach(item => {
                const li = document.createElement('li');
                li.classList.add('cart-item');
                li.innerHTML = `
                    <img src="${item.imagen}" alt="${item.nombre}">
                    <div class="cart-item-details">
                        <h4>${item.nombre}</h4>
                        <p>Talla: ${item.talla || 'N/A'}</p>
                        <p>$${item.precio.toFixed(2)}</p>
                    </div>
                    <div class="cart-item-controls">
                        <div class="cart-item-quantity">
                            <button class="quantity-btn decrease-quantity" data-id="${item.id}" data-talla="${item.talla || ''}">-</button>
                            <span>${item.cantidad}</span>
                            <button class="quantity-btn increase-quantity" data-id="${item.id}" data-talla="${item.talla || ''}">+</button>
                        </div>
                        <button class="remove-item-btn" data-id="${item.id}" data-talla="${item.talla || ''}">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                `;
                cartItemsList.appendChild(li);
                total += item.precio * item.cantidad;
                itemCount += item.cantidad;
            });
        }

        cartTotalPrice.textContent = total.toFixed(2);
        cartCount.textContent = itemCount; // Actualiza el contador del carrito en el desktop
        cartCountMobile.textContent = itemCount; // Actualiza el contador del carrito en móvil
        saveCart();
    }

    // Función para añadir un producto al carrito
    function addToCart(productId, productName, productPrice, productImage, selectedTalla, quantity) {
        // Buscar si el producto ya existe con la misma talla
        const existingItemIndex = cart.findIndex(item => item.id === productId && item.talla === selectedTalla);

        if (existingItemIndex > -1) {
            // Si existe, solo aumenta la cantidad
            cart[existingItemIndex].cantidad += quantity;
        } else {
            // Si no existe, añade el nuevo producto al carrito
            cart.push({
                id: productId,
                nombre: productName,
                precio: productPrice,
                imagen: productImage,
                talla: selectedTalla,
                cantidad: quantity
            });
        }
        renderCartSidebar();
        shoppingCartSidebar.classList.add('open'); // Abrir el carrito al añadir un producto
    }

    // Función para simular el proceso de pago
    function checkout() {
        if (cart.length === 0) {
            alert('Tu carrito está vacío. Añade productos antes de finalizar la compra.');
            return;
        }

        const confirmPurchase = confirm(`Vas a comprar ${cartCount.textContent} productos por un total de $${cartTotalPrice.textContent}. ¿Confirmas la compra?`);

        if (confirmPurchase) {
            alert('¡Compra realizada con éxito! Gracias por tu compra.');
            cart = []; // Vaciar el carrito
            renderCartSidebar(); // Actualizar la vista del carrito
            shoppingCartSidebar.classList.remove('open'); // Cerrar el carrito
        } else {
            alert('Compra cancelada.');
        }
    }

    // Event Listeners
    // Renderizar productos y carrito al cargar la página
    renderizarProductos(productos);
    renderCartSidebar();

    filtroSelect.addEventListener('change', manejarFiltro);
    searchInput.addEventListener('input', manejarFiltro);

    // Abrir/cerrar carrito
    cartIcon.addEventListener('click', (e) => {
        e.preventDefault();
        shoppingCartSidebar.classList.toggle('open');
    });

    cartIconMobile.addEventListener('click', (e) => {
        e.preventDefault();
        shoppingCartSidebar.classList.toggle('open');
    });

    closeCartBtn.addEventListener('click', () => {
        shoppingCartSidebar.classList.remove('open');
    });

    // Cerrar carrito al hacer clic fuera del sidebar
    window.addEventListener('click', (e) => {
        // Asegúrate de que el clic no fue dentro del sidebar ni en el icono del carrito
        if (!shoppingCartSidebar.contains(e.target) && !cartIcon.contains(e.target) && !cartIconMobile.contains(e.target) && shoppingCartSidebar.classList.contains('open')) {
            shoppingCartSidebar.classList.remove('open');
        }
    });


    // Manejar clics en los botones "Añadir al carrito"
    productGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const button = e.target;
            const productId = button.dataset.id;
            const productName = button.dataset.nombre;
            const productPrice = parseFloat(button.dataset.precio);
            const productImage = button.dataset.imagen;

            const productCard = button.closest('.product-card');
            const selectedTallaBtn = productCard.querySelector('.talla-btn.selected');
            const quantityInput = productCard.querySelector(`#cantidad-${productId}`);
            const quantity = parseInt(quantityInput.value);

            let selectedTalla = null;
            const productoOriginal = productos.find(p => p.id === productId);

            // Validar selección de talla si el producto tiene tallas y no es 'Única'
            if (productoOriginal && productoOriginal.tallas.length > 0 && productoOriginal.tallas[0] !== 'Única') {
                if (selectedTallaBtn) {
                    selectedTalla = selectedTallaBtn.dataset.talla;
                } else {
                    alert('Por favor, selecciona una talla.');
                    return; // Detener la función si no se selecciona talla
                }
            } else if (productoOriginal && productoOriginal.tallas.length > 0 && productoOriginal.tallas[0] === 'Única') {
                selectedTalla = 'Única'; // Asignar 'Única' si es la única talla disponible
            }


            addToCart(productId, productName, productPrice, productImage, selectedTalla, quantity);
        }
    });

    // Manejar clics dentro del carrito (cambiar cantidad, eliminar)
    cartItemsList.addEventListener('click', (e) => {
        const target = e.target;
        // Usar closest para asegurar que el clic fue en un botón y obtener su data-id y data-talla
        const btn = target.closest('.increase-quantity') || target.closest('.decrease-quantity') || target.closest('.remove-item-btn');

        if (btn) {
            const id = btn.dataset.id;
            const talla = btn.dataset.talla; // Puede ser undefined si no hay talla

            if (btn.classList.contains('increase-quantity')) {
                const item = cart.find(item => item.id === id && item.talla === talla);
                if (item) item.cantidad++;
            } else if (btn.classList.contains('decrease-quantity')) {
                const item = cart.find(item => item.id === id && item.talla === talla);
                if (item && item.cantidad > 1) {
                    item.cantidad--;
                } else if (item && item.cantidad === 1) {
                    // Eliminar el producto si la cantidad llega a 1 y se presiona '-'
                    cart = cart.filter(item => !(item.id === id && item.talla === talla));
                }
            } else if (btn.classList.contains('remove-item-btn')) {
                // Eliminar el producto directamente
                cart = cart.filter(item => !(item.id === id && item.talla === talla));
            }
            renderCartSidebar();
        }
    });

    // Event listener para el botón de finalizar compra
    checkoutBtn.addEventListener('click', checkout);

    // Toggle Mobile Menu (mantener la funcionalidad existente)
    window.toggleMobileMenu = function() {
        const mobileMenu = document.getElementById('mobileMenu');
        mobileMenu.classList.toggle('active');
    };
});
