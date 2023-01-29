const cors = require('cors');
const express = require('express');
const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static('public'));

// app.use('/login', routes.login);
// app.use('/register', routes.register);
// app.use('/customer', routes.customer);
// app.use('/seller', routes.seller);
// app.use('/admin', routes.admin);

// app.use(errorMiddleware);

module.exports = app;
