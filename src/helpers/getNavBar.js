function getNavBar(isLoggedIn = false) {
    return `
    <nav>
      <a href="${isLoggedIn ? '/dashboard' : '/products'}">PRODUCTOS</a>
      <a href="${isLoggedIn ? '/dashboard?category=Camisetas' : '/products?category=Camisetas'}">CAMISETAS</a>
      <a href="${isLoggedIn ? '/dashboard?category=Pantalones' : '/products?category=Pantalones'}">PANTALONES</a>
      <a href="${isLoggedIn ? '/dashboard?category=Zapatos' : '/products?category=Zapatos'}">ZAPATOS</a>
      <a href="${isLoggedIn ? '/dashboard?category=Accesorios' : '/products?category=Accesorios'}">ACCESORIOS</a>
      ${isLoggedIn ? `<a href="/dashboard/new">NUEVO PRODUCTO</a>` : ``}
      ${isLoggedIn ? `<a href="/logout">LOGOUT</a>` : `<a href="/login">LOGIN</a>`}
    </nav>
    
  `;
}


module.exports = getNavBar;

