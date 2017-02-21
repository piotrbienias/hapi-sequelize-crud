'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {

        return queryInterface.bulkInsert('categories', [
                { name: 'test category' },
                { name: 'second test category' },
                { name: 'third test category' }
            ], { returning: true }).then((results) => {
                return queryInterface.bulkInsert('users', [
                    { name: 'john', email: 'john@example.com', categoryId: results[0].id },
                    { name: 'matthew', email: 'matthew@example.com', categoryId: results[1].id },
                    { name: 'daniel', email: 'daniel@example.com', categoryId: results[1].id }
                ], {});
            });

    },

    down: function (queryInterface, Sequelize) {

        return queryInterface.bulkDelete('users', null, null, null).then(() => {
            return queryInterface.bulkDelete('categories', null, null, null);
        });
    }
};
