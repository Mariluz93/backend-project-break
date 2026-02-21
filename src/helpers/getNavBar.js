function getNavBar(isLoggedIn = false) {
    return `
    <nav>
      <a href="${isLoggedIn ? '/dashboard' : '/products'}">Productos</a>
      <a href="${isLoggedIn ? '/dashboard?category=Camisetas' : '/products?category=Camisetas'}">Camisetas</a>
      <a href="${isLoggedIn ? '/dashboard?category=Pantalones' : '/products?category=Pantalones'}">Pantalones</a>
      <a href="${isLoggedIn ? '/dashboard?category=Zapatos' : '/products?category=Zapatos'}">Zapatos</a>
      <a href="${isLoggedIn ? '/dashboard?category=Accesorios' : '/products?category=Accesorios'}">Accesorios</a>
      ${isLoggedIn ? `<a href="/dashboard/new">Nuevo Producto</a>` : ``}
      ${isLoggedIn ? `<a href="/logout">Logout</a>` : `<a href="/login">Login</a>`}
    </nav>
    <hr>
  `;
}


module.exports = getNavBar;

