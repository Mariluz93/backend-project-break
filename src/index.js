require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();
const methodOverride = require('method-override');
const session = require('express-session');

const { connectDB } = require('./config/db.js');
const productRoutes = require('./routes/productRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const apiProductRoutes = require('./routes/apiProductRoutes.js');

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname,"..", "public")));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60
    }
}));


connectDB(); 

app.use(productRoutes);
app.use(authRoutes);
app.use('/api', apiProductRoutes);

app.get('/', (req, res) => {
    res.redirect('/products');
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
});