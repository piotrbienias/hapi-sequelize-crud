'use strict';

module.exports = function(sequelize, DataTypes) {

    var Category = sequelize.define('Category', {

        name: {
            type: DataTypes.STRING,
            allowNull: false
        }

    }, {
        scopes: {
            withUsers: function() {
                return {
                    include: [
                        { model: sequelize.models.User, as: 'users' }
                    ]
                };
            }
        },
        classMethods: {
            associate: function(models) {
                Category.hasMany(models.User, { foreignKey: 'categoryId', as: 'users' });
            }
        },
        tableName: 'categories',
        timestamps: false,
        paranoid: false
    });

    return Category;
};