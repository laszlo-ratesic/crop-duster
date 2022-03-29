const gradient = require("gradient-string");
const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const path = require("path");
const exphbs = require("express-handlebars");
const hbs = exphbs.create();

const app = express();
const PORT = process.env.PORT || 5000;

// Express Sequelize
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Handlebars
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public/js")));

// Session storage
app.use(session(sess));

// Turn on routes
app.use(routes);

// Turn on connection to DB and server
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () =>
    console.log(gradient.instagram(`Now listening @ http://localhost:${PORT}`))
  );
});
