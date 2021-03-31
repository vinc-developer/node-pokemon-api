const { Pokemon } = require('../db/sequelize');
const { Op } = require('sequelize');
const auth = require('../auth/auth');

module.exports = (app) => {
    app.get('/api/pokemons', (req, res) => {
        if(req.query.name){
            const name = req.query.name;
            const limit = parseInt(req.query.limit) || 5;

            if(name.length < 2){
                const message = 'Le terme de recherche doit contenir au moins 2 caractères.';
                return res.status(400).json({message});
            }

            return Pokemon.findAndCountAll({ //function qui affiche le nom de recherche total
                where : {
                    name: {             // name est la propriété du modèle pokémon
                        [Op.like]: `%${name}%`   // name est le critère de la recherhce
                    }
                },
                order: ['name'],
                limit: limit // affichage limité a 5 par defaut
            }).then(({count, rows}) => {
                    const message = `Il y a ${count} pokémons qui correspondent qu terme de recherche ${name}`;
                    res.json({message, data: rows})
                })
        }else{
            Pokemon.findAll({order: ['name'] })
                .then(pokemons => {
                    const message = 'La liste des pokémons a bien été récupérée.';
                    res.json({ message, data: pokemons });
                }).catch(error => {
                const message = `La liste des pokémons n'a pas pu être récupérée. Réesayez dans quelque instants.`;
                res.status(500).json({ message, data : error});
            });
        }
    });
}
