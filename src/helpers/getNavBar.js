function getNavBar(context) {
    if (context === "dashboard") {
        return `
            <nav>
                <a href="/products">Productos</a>
                <a href="/dashboard?category=Camisetas">Camisetas</a>
                <a href="/dashboard?category=Pantalones">Pantalones</a>
                <a href="/dashboard?category=Zapatos">Zapatos</a>
                <a href="/dashboard?category=Accesorios">Accesorios</a>
                <a href="/dashboard">Dashboard</a>
                <a href="/dashboard/new">Nuevo Producto</a>
                <a href="/logout">Logout</a>
            </nav>
        <hr>
        `
    } else {
        return `
        <nav>
            <a href="/products">Productos</a>
            <a href="/products?category=Camisetas">Camisetas</a>
            <a href="/products?category=Pantalones">Pantalones</a>
            <a href="/products?category=Zapatos">Zapatos</a>
            <a href="/products?category=Accesorios">Accesorios</a>
            <a href="/dashboard">Dashboard</a>
            <a href="/login">Login</a>
        </nav>
        <hr>
    `
    }
}


module.exports = getNavBar;