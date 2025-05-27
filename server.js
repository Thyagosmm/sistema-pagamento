const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const { checkoutRouter } = require('./paypal');
const db = require('./database');

const app = express();

// Configuração de segurança
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrcAttr: ["'unsafe-inline'"], // Permite atributos inline
            styleSrc: ["'self'", "'unsafe-inline'", "https://www.paypal.com"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://www.paypal.com"],
            connectSrc: [
                "'self'", 
                "https://api.paypal.com",
                "https://www.sandbox.paypal.com"  // Adicione esta linha
            ],
            imgSrc: ["'self'", "data:", "https://www.paypal.com",
                "https://www.paypalobjects.com"],
            frameSrc: [ // Adicione esta seção
                "'self'", 
                "https://www.sandbox.paypal.com", 
                "https://www.paypal.com"
            ]
        }
    }
}));

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Rotas para páginas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/checkout', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'checkout.html'));
});

app.get('/success', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'success.html'));
});

app.get('/cancel', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'cancel.html'));
});

// Rotas da API
app.use('/paypal', checkoutRouter);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});