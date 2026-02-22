const baseHtml = require('../helpers/baseHtml.js');
const getNavBar = require('../helpers/getNavBar.js');
const template = require('../helpers/template.js');

const authController = {
    showLogin: (req, res) => {
        if (req.session.isAdmin) {
            return res.redirect('/dashboard');
        }

        const { error } = req.query;

        let errorMessage = '';

        if (error) {
            errorMessage = `<p class="error-message" style="color:red;">Invalid credentials</p>`;
        }

        const content = getNavBar(req.session?.isAdmin) + template.loginForm() + errorMessage;
        res.send(baseHtml(content));
    },
    doLogin: (req, res) => {
        const { username, password } = req.body;

        const isValid = username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS;

        if (!isValid) {
            return res.redirect('/login?error=1');
        }

        req.session.isAdmin = true;
        return res.redirect('/dashboard');
    },
    doLogout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error logging out');
            }
            res.clearCookie('connect.sid');
            return res.redirect('/products')
        });
    }
}
module.exports = authController;