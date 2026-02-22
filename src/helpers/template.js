function productsList(products, title, isAdmin) {
    let html = `
        <h1>${title}</h1>
        <div class="products-container">    
    `;

    if (products.length === 0) {
        html += `<p>No hay productos todavía</p>`;
        return html;
    }
    for (let product of products) {
        const actions = isAdmin
            ? `
                <button><a href="/dashboard/${product._id}">Ver</a></button>
            `
            : `
                <button><a href="/products/${product._id}">Ver</a></button>
            `;
        
        html += `
            <div class="product-card">
                <img src="${product.image}">
                <div class="card-body">
                    <h2>${product.name}</h2>
                    ${actions}
                </div>
            </div>
        `;
    }

    html += `</div>`;

    return html;
}

function newProductForm() {
    return `
        <h1>Nuevo producto</h1>
        <div class="form-container">
            <form action="/dashboard" method="POST" enctype="multipart/form-data">
                <div>
                    <label>Nombre</label><br>
                    <input type="text" name="name" required>
                </div>
                <div>
                    <label>Descripción</label><br>
                    <textarea name="description" required></textarea>
                </div>
                <div>
                    <label>Imagen (URL)</label><br>
                    <input type="file" name="image" accept="image/*" required>
                </div>
                <div>
                    <label>Categoría</label><br>
                    <select name="category" required>
                        <option value="Camisetas">Camisetas</option>
                        <option value="Pantalones">Pantalones</option>
                        <option value="Zapatos">Zapatos</option>
                        <option value="Accesorios">Accesorios</option>
                    </select>
                </div>
                <div>
                    <label>Talla</label><br>
                    <select name="size" required>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                    </select>
                </div>
                <div>
                    <label>Precio (€)</label><br>
                    <input type="number" name="price" required step="0.01" min="0">
                </div>

                <button type="submit">Crear producto</button>

            </form>
        </div>
    `;
}

function editProductForm(product) {
    return `
        <h1>Editar producto</h1>
        <div class="form-container">
            <form action="/dashboard/${product._id}?_method=PUT" method="POST" enctype="multipart/form-data">
                <div>
                    <label>Nombre</label><br>
                    <input type="text" name="name" required value="${product.name || ''}">
                </div>
                <div>
                    <label>Descripción</label><br>
                    <textarea name="description" required>${product.description || ''}</textarea>
                </div>
                <div>
                    <label>Imagen actual</label><br>
                    ${product.image
                        ? `<img src="${product.image}" alt="${product.name}" style="max-width:200px; height:auto;">`
                        : `<p><em>Sin imagen</em></p>`
                    }
                </div>
                <div>
                    <label>Cambiar imagen (opcional)</label><br>
                    <input type="file" name="image" accept="image/*">
                </div>
                <div>
                    <label>Categoría</label><br>
                    <select name="category" required>
                        <option value="Camisetas" ${product.category === 'Camisetas' ? 'selected' : '' }>Camisetas</option>
                        <option value="Pantalones" ${product.category === 'Pantalones' ? 'selected' : '' }>Pantalones</option>
                        <option value="Zapatos" ${product.category === 'Zapatos' ? 'selected' : '' }>Zapatos</option>
                        <option value="Accesorios" ${product.category === 'Accesorios' ? 'selected' : '' }>Accesorios</option>
                    </select>
                </div>
                <div>
                    <label>Talla</label><br>
                    <select name="size" required>
                        <option value="XS" ${product.size === 'XS' ? 'selected' : ''}>XS</option>
                        <option value="S" ${product.size === 'S' ? 'selected' : ''}>S</option>
                        <option value="M" ${product.size === 'M' ? 'selected' : ''}>M</option>
                        <option value="L" ${product.size === 'L' ? 'selected' : ''}>L</option>
                        <option value="XL" ${product.size === 'XL' ? 'selected' : ''}>XL</option>
                    </select>
                </div>
                <div>
                    <label>Precio (€)</label><br>
                    <input type="number" name="price" required step="0.01" min="0" value="${product.price ?? ''}">
                </div>

                <button type="button"><a href="/dashboard/${product._id}">Cancelar</a></button>                
                <button type="submit">Guardar cambios</button>
            </form>
        </div>
    `;
}

function productDetail(product) {
    const name = product.name || 'Sin nombre';
    const description = product.description || 'Sin descripción';
    const category = product.category || 'Sin categoría';
    const size = product.size || 'Sin talla';
    const price = product.price !== undefined ? `${product.price}€` : '-';
    const image = product.image;

    return `
        <div class="product-detail">
            <h1>${name}</h1>
            
            ${image
                ? `<img src="${image}" alt="${name}" style="max-width:300px; height:auto;">`
                : `<p><em>Sin imagen disponible</em></p>`
            }
            <p><strong>Descripción: </strong>${description}</p>
            <p><strong>Categoría: </strong>${category}</p>
            <p><strong>Talla: </strong>${size}</p>
            <p><strong>Precio: </strong>${price}</p>
            <hr>
            <button><a href="/products">Volver a productos</a></button>
        </div>
    `;
}

function dashboardProductDetail(product) {
    const name = product.name || 'Sin nombre';
    const description = product.description || 'Sin descripción';
    const category = product.category || 'Sin categoría';
    const size = product.size || 'Sin talla';
    const price = product.price !== undefined ? `${product.price}€` : '-';
    const image = product.image;

    return `
        <div class="product-detail">
            <h1>${name}</h1>
            
            ${image
                ? `<img src="${image}" alt="${name}" style="max-width:300px; height:auto;">`
                : `<p><em>Sin imagen disponible</em></p>`
            }
            <p><strong>Descripción: </strong>${description}</p>
            <p><strong>Categoría: </strong>${category}</p>
            <p><strong>Talla: </strong>${size}</p>
            <p><strong>Precio: </strong>${price}</p>
            <hr>
            <div class="edit-buttons">
                <button><a href="/dashboard/${product._id}/edit">Editar</a></button>
                <form action="/dashboard/${product._id}/delete?_method=DELETE" method="POST" style="display:inline;">
                            <button type="submit">Eliminar</button>                
                </form>
            </div>
            <button><a href="/dashboard">Volver a productos</a></button>
        </div>
    `;
}

function loginForm() {
    return `
        <h1>Login</h1>
        <div class="form-container">
            <form action="/login" method="POST">
                <div>
                    <label>Usuario</label><br>
                    <input type="text" name="username" required>
                </div>
                <div>
                    <label>Contraseña</label><br>
                    <input type="password" name="password" required autocomplete="current-password">
                </div>
                <button type="submit">Log in</button>
            </form>
        </div>
    `;
}

module.exports = {
    productsList,
    newProductForm,
    editProductForm,
    productDetail,
    dashboardProductDetail,
    loginForm
};