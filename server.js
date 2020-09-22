const express = require('express');
const app = express();
const axios = require('axios');
const nodemon = require('nodemon');
const planetList = ["EARTH", "SATURN", "MARS", "URANUS", "VENUS", "NEPTUNE", "JUPITER", "MERCURY"];
const api_key = process.env.api_key;
const db = require('./models');
require('dotenv').config();
require("./routes/api-routes.js")(app);

// Blast off!
app.use(express.static('public'));

// Parse the body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Bring in Handlebars
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Allow server to grab any port, but set 7000 as standard default
const PORT = process.env.PORT || 8080;


// Start Server
db.sequelize.sync({ force: true }).then(function () {
  app.listen(PORT, () => {
    console.log(`Server listening on: http://localhost:${PORT}`);
  });
});