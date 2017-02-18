'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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
     * @param {Object}              [server] Hapi server instance
     * @param {Object}              [options] should contain following attributes:
     * @param {Function}            [options.errorHandler] function that handles error thrown by sequelize operation
     * @param {Object}              [options.routeConfig] object used as a default route configuration
     */
    function HSCrud(server) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, HSCrud);

        if (!server || typeof server !== 'undefined' && (typeof server === 'undefined' ? 'undefined' : _typeof(server)) !== 'object') throw new Error('\'server\' parameter is required and must be a Hapi server instance');

        this.utils = new _utils2.default();

        this.errorHandler = options.errorHandler;
        this.routeConfig = options.routeConfig;

        this._hasErrorHandler = !!this.errorHandler;
    }

    /**
     * @param {Function}            [model] Sequelize model definition
     * @param {Object}              [options] additional route configuration options
     * @param {String|Array}        [scopes] single scope or array of scopes to be used
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

            var routeObject = {
                method: 'GET',
                path: '/' + this.utils.toLowerCase(model.options.name.plural) + '/' + model.primaryKeyField,

                config: {
                    description: 'Return ' + model.name.singular,
                    id: 'get' + this.utils.toUpperCase(model.name.singular),

                    validate: { params: {} },

                    handler: function handler(request, reply) {
                        model.scope(scopes).findById(request.params.id).then(function (instance) {
                            if (instance) {
                                reply(instance.toJSON());
                            } else {
                                reply(_boom2.default.notFound(model.name.singular + ' does not exist'));
                            }
                        }).catch(function (e) {
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
            this.utils.extendRoutingOptions(routeObject, options);

            return routeObject;
        }
    }]);

    return HSCrud;
}();

exports.default = HSCrud;
