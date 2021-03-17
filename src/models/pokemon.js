const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée'];
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', { //nom de la table
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false, // null
        unique: {
          msg: 'Le nom exist deja'
        },
        validate:{
          notEmpty : { msg: 'Le nom ne de peux pas être vide.' },
          notNull: { msg: 'Le nom est une propriété requise'}
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
          isInt: { msg: 'Utilisez uniquement des nombres entiers pour les points de vie.'},
          min: {
            args: [0],
            msg: 'Le minimun de point de vie requies est de : 0'
          },
          max : {
            args : [999],
            msg : 'Le maximum de points de vie est de : 999'
          },
          notNull: {mes: 'Les points de vie sont une propriété requise.'}
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
          isInt: { msg: 'Utilisez uniquement des nombres entiers pour les points de degats.'},
          min: {
            args: [0],
            msg: 'Le minimun de point de degat requies est de : 0'
          },
          max : {
            args : [999],
            msg : 'Le maximum de points de dégats est de : 999'
          },
          notNull: {mes: 'Les points de degats sont une propriété requise.'}
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate : {
          isUrl : { msg: 'L\'image doit avoir un url valide.'},
          notNull: { msg: 'L\'image est une propriété requise.' }
        }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get(){
          return this.getDataValue('types').split(',');
        },
        set(types){
          this.setDataValue('types', types.join());
        },
        validate : {
          isTypesValid(value){
            if(!value){
              throw new Error('Un pokemon doit au moins avoir un type.');
            }
            if(value.split(',').length > 3){
              throw new Error('Un pokemon de peu pas avoir plus de trois types.');
            }
            value.split(',').forEach(type => {
              if(!validTypes.includes(type)){
                throw new Error(`Le type d'un pokémon doit appartenir à la liste suivante : ${validTypes}`);
              }
            })
          }
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }
