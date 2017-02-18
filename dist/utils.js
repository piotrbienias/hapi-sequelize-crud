'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils = function () {
    function Utils() {
        _classCallCheck(this, Utils);
    }

    _createClass(Utils, [{
        key: 'getPrimaryKeyWithSchema',
        value: function getPrimaryKeyWithSchema(model, routeObject) {
            var primaryKeyField = model.primaryKeyField;
            var modelSchema = model.getJoiSchema ? model.getJoiSchema() : null;

            var schema = void 0;
            if (modelSchema) {
                schema = this._.find(modelSchema._inner.children, function (val, key) {
                    return val.key == primaryKeyField;
                });
            }

            if (schema) {
                routeObject.config.validate.params[primaryKeyField] = schema.schema.required();
            } else {
                routeObject.config.validate.params.id = _joi2.default.number().integer().positive().required();
            }
        }
    }, {
        key: 'extendRoutingOptions',
        value: function extendRoutingOptions(routeObjectConfig, options) {
            var _this = this;

            _underscore2.default.each(options, function (val, key) {
                if (val && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && !_underscore2.default.isEmpty(val)) {
                    routeObjectConfig[key] = routeObjectConfig[key] || {};
                    _this.extendRoutingOptions(routeObjectConfig[key], val);
                } else {
                    routeObjectConfig[key] = val;
                }
            });

            return routeObjectConfig;
        }
    }, {
        key: 'toLowerCase',
        value: function toLowerCase(val) {
            return val.toLowerCase();
        }
    }, {
        key: 'toUpperCase',
        value: function toUpperCase(val) {
            return val.charAt(0).toUpperCase() + val.slice(1);
        }
    }, {
        key: '_',
        get: function get() {
            return _underscore2.default;
        }
    }]);

    return Utils;
}();

exports.default = Utils;
