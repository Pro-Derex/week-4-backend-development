const express = require("express");
const multer = require('multer');
const cors = require('cors');

const controllers = require('./Controllers');

const router = express.Router();
const formData = multer();
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json({strict: false}));
app.use(express.urlencoded({extended: true}));

app.listen(port, () => {
    console.log(`App started on port ${port}.`);

    app.use('/api',
        // Auth Routes
        router.get('/auth/register', formData.any(), async (req, res) => {
            controllers.Register.store(req, res);
        }),
        router.get('/auth/login', formData.any(), async (req, res) => {
            controllers.Login.auth(req, res);
        }),
        /*Other routes*/
        router.get('/expenses', formData.any(), async (req, res) => {
            controllers.Expense.index(req, res);
        }),
        router.delete('/expenses', formData.any(), async (req, res) => {
            controllers.Expense.detach(req, res);
        })
    );
});