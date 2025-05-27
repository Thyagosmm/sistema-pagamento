# Loja Virtual com Pagamento PayPal

Projeto de exemplo para disciplina, demonstrando integração com PayPal para pagamentos únicos.

## ✨ Funcionalidades
- Catálogo de produtos simples
- Carrinho de compras
- Checkout com PayPal
- Registro de transações no banco de dados
- Páginas de status de pagamento

## 🚀 Começando

### Pré-requisitos
- Node.js 14+
- Conta de desenvolvedor PayPal

### Instalação

git clone https://github.com/Thyagosmm/sistema-pagamento
cd nome-do-projeto
npm install

### Funcionamento

node server.js
Acesse: http://localhost:3000

### Estrutura do Projeto
```bash
projeto/
├── public/          # Arquivos estáticos
│   ├── style.css
│   └── app.js
├── views/           # Páginas HTML
│   ├── index.html
│   ├── checkout.html
│   ├── success.html
│   └── cancel.html
├── server.js        # Servidor principal
├── paypal.js        # Configuração PayPal
├── database.js      # Configuração SQLite
├── package.json
├── README.md
└── .gitignore