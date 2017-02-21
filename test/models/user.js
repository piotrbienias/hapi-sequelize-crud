'use strict';


module.exports = function(sequelize, DataTypes){

    var User = sequelize.define('User', {

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        category: {
            type: DataTypes.INTEGER,
            references: {
                model: sequelize.models.Category,
                key: 'id'
            },
            field: 'categoryId'
        }

    }, {
        scopes: {
            withCategory: {
                include: [
                    {
                        model: sequelize.models.Category
                    }
                ]
            }
        },
        classMethods: {
            associate: function(models) {
                this.belongsTo(models.Category, { foreignKey: 'categoryId' });
            }
        },
        tableName: 'users',
        timestamps: false,
        paranoid: false
    });

    return User;
};