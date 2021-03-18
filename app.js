const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const sequelize = require('./src/db/sequelize');

const app = express();
const port = process.env.PORT || 4500;

app.use(favicon( __dirname + '/favicon.ico'));
app.use(morgan('dev'));
app.use(bodyParser.json());

sequelize.initDb();

app.get('/', (req, res) => {
    res.json('Hello Heroku ! ');
});

// point de terminaisons des routes
require('./src/routes/findAllPokemons')(app);
require('./src/routes/findPokemonByPk')(app);
require('./src/routes/createPokemon')(app);
require('./src/routes/updatePokemon')(app);
require('./src/routes/deletePokemon')(app);
require('./src/routes/login')(app);

//gestion des erreures
app.use(({res}) => {
    const message = `Impossible de trouver le ressource demandée ! Merci d'utilier une autre URL.`;
    res.status(404).json({message});
});



app.listen(port, () => console.log(`Notre application est démarrée sur : http://localhost:${port}`));
