'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HSCrud = function () {

    /**
     *
     * @param {Object}                      server Hapi server instance
     * @param {Object}                      [options] should contain following attributes:
     * @param {Function}                    [options.errorHandler] function that handles error thrown by sequelize operation
     * @param {Object}                      [options.route] additional route configuration options
     * @param {String}                      [options.route.method]
     * @param {String}                      [options.route.path]
     * @param {String|Array}                [options.route.vhost]
     * @param {Function}                    [options.route.handler
     * @param {Object}                      [options.route.config]
     * @param {String}                      [options.route.config.description]
     * @param {String|Array}                [options.route.config.notes]
     * @param {Array}                       [options.route.config.tags]
     * @param {String}                      [options.route.config.id]
     * @param {String}                      [options.route.config.app]
     * @param {String|Boolean|Object}       [options.route.config.auth]
     * @param {Object}                      [options.route.config.bind]
     * @param {Boolean|Object}              [options.route.config.cache]
     * @param {Object}                      [options.route.config.compression]
     * @param {Boolean|Object}              [options.route.config.cors]
     * @param {Object}                      [options.route.config.ext]
     * @param {Object}                      [options.route.config.files]
     * @param {Function}                    [options.route.config.handler]
     * @param {Boolean}                     [options.route.config.isInternal]
     * @param {Object}                      [options.route.config.json]
     * @param {Boolean}                     [options.route.config.log]
     * @param {Object}                      [options.route.config.payload]
     * @param {Object}                      [options.route.config.plugins]
     * @param {Array}                       [options.route.config.pre]
     * @param {Object}                      [options.route.config.response]
     * @param {Boolean|Object}              [options.route.config.security]
     * @param {Object}                      [options.route.config.state]
     * @param {Object}                      [options.route.config.validate]
     * @param {Object}                      [options.route.config.timeout]
     */
    function HSCrud(server) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, HSCrud);

        if (!server || typeof server !== 'undefined' && (typeof server === 'undefined' ? 'undefined' : _typeof(server)) !== 'object') throw new Error('\'server\' parameter is required and must be a Hapi server instance');

        this.utils = new _utils2.default();

        this.errorHandler = options.errorHandler;
        this.routeConfig = options.route;

        this._hasErrorHandler = !!this.errorHandler;
    }

    /**
     * @param {Function}                    model Sequelize model definition
     * @param {Object}                      [options] options used as additional route options and query options
     * @param {Object}                      [options.query] additional options passed to the query
     * @param {Object}                      [options.route] additional route configuration options
     * @param {String}                      [options.route.method]
     * @param {String}                      [options.route.path]
     * @param {String|Array}                [options.route.vhost]
     * @param {Function}                    [options.route.handler
     * @param {Object}                      [options.route.config]
     * @param {String}                      [options.route.config.description]
     * @param {String|Array}                [options.route.config.notes]
     * @param {Array}                       [options.route.config.tags]
     * @param {String}                      [options.route.config.id]
     * @param {String}                      [options.route.config.app]
     * @param {String|Boolean|Object}       [options.route.config.auth]
     * @param {Object}                      [options.route.config.bind]
     * @param {Boolean|Object}              [options.route.config.cache]
     * @param {Object}                      [options.route.config.compression]
     * @param {Boolean|Object}              [options.route.config.cors]
     * @param {Object}                      [options.route.config.ext]
     * @param {Object}                      [options.route.config.files]
     * @param {Function}                    [options.route.config.handler]
     * @param {Boolean}                     [options.route.config.isInternal]
     * @param {Object}                      [options.route.config.json]
     * @param {Boolean}                     [options.route.config.log]
     * @param {Object}                      [options.route.config.payload]
     * @param {Object}                      [options.route.config.plugins]
     * @param {Array}                       [options.route.config.pre]
     * @param {Object}                      [options.route.config.response]
     * @param {Boolean|Object}              [options.route.config.security]
     * @param {Object}                      [options.route.config.state]
     * @param {Object}                      [options.route.config.validate]
     * @param {Object}                      [options.route.config.timeout]
     * @param {String|Array}                scopes single scope or array of scopes to be used
     * @returns {Object}
     */


    _createClass(HSCrud, [{
        key: 'get',
        value: function get(model, options, scopes) {
            var _this = this;

            if (!model) throw new Error('\'model\' parameter of \'get()\' method is required');

            if (scopes && typeof scopes !== 'string' && !Array.isArray(scopes)) throw new Error('\'scopes\' parameter of \'get()\' method must be a string or array');

            if (scopes && typeof scopes === 'string') scopes = [scopes];

            scopes = scopes ? scopes : ['defaultScope'];

            options = options || {};

            var queryOptions = options.query || {};
            var route = options.route || {};
            var config = route.config || {};

            var routeObject = {
                method: 'GET',
                path: '/' + this.utils.toLowerCase(model.options.name.plural) + '/{' + model.primaryKeyField + '}',

                config: {
                    description: 'Return ' + model.options.name.singular,
                    id: 'get' + this.utils.toUpperCase(model.options.name.singular),

                    validate: { params: {} },

                    handler: function handler(request, reply) {
                        model.scope(scopes).findById(request.params[model.primaryKeyField], queryOptions).then(function (instance) {
                            if (instance) {
                                reply(instance.toJSON());
                            } else {
                                reply(_boom2.default.notFound(model.name.singular + ' does not exist'));
                            }
                        }).catch(function (e) {
                            console.log(e);
                            if (_this._hasErrorHandler) {
                                return reply(_this.errorHandler(e)).code(422);
                            }
                            reply(_boom2.default.badData('Wrong data'));
                        });
                    }
                }
            };

            this.utils.getPrimaryKeyWithSchema(model, routeObject);

            this.utils.extendRoutingOptions(routeObject, this.routeConfig);
            this.utils.extendRoutingOptions(routeObject, route);

            return routeObject;
        }

        /**
         * @param {Function}            model Sequelize model definition
         * @param {Object}              [options] options used as additional route options and query options
         * @param {Object}              [options.query] additional options passed to the query
         * @see {@link get} for options.route
         * @param {String|Array}        scopes single scope or array of scopes to be used
         * @returns {Object}
         */

    }, {
        key: 'list',
        value: function list(model, options, scopes) {
            var _this2 = this;

            if (!model) throw new Error('\'model\' parameter of \'get()\' method is required');

            if (scopes && typeof scopes !== 'string' && !Array.isArray(scopes)) throw new Error('\'scopes\' parameter of \'get()\' method must be a string or array');

            if (scopes && typeof scopes === 'string') scopes = [scopes];

            scopes = scopes ? scopes : ['defaultScope'];

            options = options || {};

            var queryOptions = options.query || {};
            var route = options.route || {};

            var routeObject = {
                method: 'GET',
                path: '/' + this.utils.toLowerCase(model.options.name.plural),

                config: {
                    description: 'Return all ' + model.name,
                    id: 'list' + this.utils.toUpperCase(model.options.name.plural),

                    handler: function handler(request, reply) {
                        model.findAll(queryOptions).then(function (instances) {
                            var mappedInstances = instances.map(function (instance) {
                                return instance.toJSON();
                            });

                            reply(mappedInstances);
                        }).catch(function (e) {
                            if (_this2._hasErrorHandler) {
                                return reply(_this2.errorHandler(e));
                            }
                            return reply(_boom2.default.badRequest(e));
                        });
                    }
                }
            };

            this.utils.extendRoutingOptions(routeObject, this.routeConfig);
            this.utils.extendRoutingOptions(routeObject, route);

            return routeObject;
        }

        /**
         * @param {Function}            model Sequelize model definition
         * @param {Object}              [options] options used as additional route options and query options
         * @param {Object}              [options.query] additional options passed to the query
         * @see {@link get} for options.route
         * @returns {Object}
         */

    }, {
        key: 'create',
        value: function create(model, options) {
            var _this3 = this;

            if (!model) throw new Error('\'model\' parameter of \'get()\' method is required');

            options = options || {};

            var queryOptions = options.query || {};
            var route = options.route || {};

            var routeObject = {
                method: 'POST',
                path: '/' + this.utils.toLowerCase(model.options.name.plural),

                config: {
                    description: 'Create ' + model.name,
                    id: 'create' + this.utils.toUpperCase(model.options.name.singular),

                    handler: function handler(request, reply) {
                        model.create(request.payload, queryOptions).then(function (instance) {
                            return instance.toJSON();
                        }).catch(function (e) {
                            if (_this3._hasErrorHandler) {
                                return reply(_this3.errorHandler(e));
                            }
                            return reply(_boom2.default.badData(e));
                        });
                    }
                }
            };

            this.utils.extendRoutingOptions(routeObject, this.routeConfig);
            this.utils.extendRoutingOptions(routeObject, route);

            return routeObject;
        }

        /**
         * @param {Function}            model Sequelize model definition
         * @param {Object}              [options] options used as additional route options and query options
         * @param {Object}              [options.query] additional options passed to the query
         * @see {@link get} for options.route
         * @returns {Object}
         */

    }, {
        key: 'update',
        value: function update(model, options) {
            var _this4 = this;

            if (!model) throw new Error('\'model\' parameter of \'update()\' method is required');

            options = options || {};

            var queryOptions = options.query || {};
            var route = options.route || {};

            var routeObject = {
                method: 'PUT',
                path: '/' + this.utils.toLowerCase(model.options.name.plural) + '/{' + model.primaryKeyField + '}',

                config: {
                    description: 'Update ' + model.name,
                    id: 'update' + this.utils.toUpperCase(model.options.name.singular),

                    validate: { params: {} },

                    handler: function handler(request, reply) {
                        model.findById(request.params[model.primaryKeyField]).then(function (instance) {
                            if (instance) {
                                instance.update(request.payload, queryOptions).then(function (self) {
                                    return reply(instance.toJSON());
                                }).catch(function (e) {
                                    if (_this4._hasErrorHandler) {
                                        return reply(_this4.errorHandler(e));
                                    }
                                    return reply(_boom2.default.badData(e)).code(422);
                                });
                            } else {
                                return reply(_boom2.default.notFound(model.name.singular + ' does not exist'));
                            }
                        });
                    }
                }
            };

            this.utils.getPrimaryKeyWithSchema(model, routeObject);

            this.utils.extendRoutingOptions(routeObject, this.routeConfig);
            this.utils.extendRoutingOptions(routeObject, route);

            return routeObject;
        }

        /**
         * @param {Function}            model Sequelize model definition
         * @param {Object}              [options] options used as additional route options and query options
         * @param {Object}              [options.query] additional options passed to the query
         * @see {@link get} for options.route
         * @returns {Object}
         */

    }, {
        key: 'destroy',
        value: function destroy(model, options) {
            if (!model) throw new Error('\'model\' parameter of \'delete()\' method is required');

            options = options || {};

            var queryOptions = options.query || {};
            var route = options.route || {};

            var routeObject = {
                method: 'DELETE',
                path: '/' + this.utils.toLowerCase(model.options.name.plural) + '/{' + model.primaryKeyField + '}',

                config: {
                    description: 'Delete ' + model.name,
                    id: 'delete' + this.utils.toUpperCase(model.options.name.singular),

                    validate: { params: {} },

                    handler: function handler(request, reply) {
                        model.findById(request.params[model.primaryKeyField]).then(function (instance) {
                            if (instance) {
                                instance.destroy(queryOptions).then(function () {
                                    return reply(model.options.name.singular + ' was deleted');
                                });
                            } else {
                                return reply(_boom2.default.notFound(model.options.name.singular + ' does not exist'));
                            }
                        });
                    }
                }
            };

            this.utils.getPrimaryKeyWithSchema(model, routeObject);

            this.utils.extendRoutingOptions(routeObject, this.routeConfig);
            this.utils.extendRoutingOptions(routeObject, route);

            return routeObject;
        }
    }]);

    return HSCrud;
}();

module.exports = HSCrud;
