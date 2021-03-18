const { Sequelize, DataTypes } = require('sequelize');
const PokemonModel = require('../models/pokemon');
const UserModel = require('../models/user');
const pokemons = require('./mock-pokemon');
const bcrypt = require('bcrypt');

let sequelize;

if(process.env.NODE_ENV === 'production'){
    sequelize = new Sequelize('uvgfu83wbjnovf7c', 'bb7xiphg83490uyj', 'it9jl5n2ng7mpyeg', {
        host: 'txlf3ljx3beaucz9x.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        dialect: 'mysql',
        logging: true
    })
}else{
    sequelize = new Sequelize('pokedex', 'root', '', {
        host: 'localhost',
        dialect: 'mysql',
        logging: false
    })
}

const Pokemon = PokemonModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

const initDb = () => {
    return sequelize.sync().then( () => {
        pokemons.map(pokemon => {
            Pokemon.create({
                name: pokemon.name,
                hp: pokemon.hp,
                cp: pokemon.cp,
                picture: pokemon.picture,
                types: pokemon.types
            }).then(pokemon => console.log(pokemon.toJSON()))
        })
        bcrypt.hash('pikachu', 10)
            .then(hash => User.create({username: 'pikachu' , password: hash}))
            .then(user => console.log(user.toJSON()))
        
        console.log('La base de donnée a bien été initialisée !')
    })
}

module.exports = {
    initDb, Pokemon, User
}
