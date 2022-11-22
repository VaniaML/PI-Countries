const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
// se definen los modelo
    sequelize.define('activity', {
        id: { 
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
          },
        difficulty: {
            type: DataTypes.ENUM('1', '2', '3', '4', '5'),
          },
        duration: {
            type: DataTypes.INTEGER
        },
        season: {
            type: DataTypes.ENUM('Primavera', 'Verano', 'Otono', 'Invierno')
        },
        country: {
            type: DataTypes.STRING
        }
    },
    {
       timestamps: false          
    })
};