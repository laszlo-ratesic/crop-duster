const gradient = require('gradient-string');
const express = require('express');
const path = require('path');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const hbs = exphbs.create();

const app = express();
const PORT = process.env.PORT || 5000;

// Handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/js')));

// Turn on routes
app.use(routes);

// Turn on connection to server
app.listen(PORT, () => console.log(gradient.instagram(`Now listening @ http://localhost:${PORT}`)))