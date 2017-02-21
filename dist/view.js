'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ModelView = function () {
    function ModelView(hsCrud, model) {
        _classCallCheck(this, ModelView);

        this.hsCrud = hsCrud;
        this.model = model;
    }

    /**
     * @param {Object}              [options] options used as additional route options and query options
     * @param {Object}              [options.query] additional options passed to the query
     * @param {Object}              [options.route] additional route configuration options
     * @param {String|Array}        scopes single scope or array of scopes to be used
     * @returns {Object}
     */


    _createClass(ModelView, [{
        key: 'get',
        value: function get(options, scopes) {
            return this.hsCrud.get(this.model, options, scopes);
        }

        /**
         * @param {Object}              [options] options used as additional route options and query options
         * @param {Object}              [options.query] additional options passed to the query
         * @param {Object}              [options.route] additional route configuration options
         * @param {String|Array}        scopes single scope or array of scopes to be used
         * @returns {Object}
         */

    }, {
        key: 'list',
        value: function list(options, scopes) {
            return this.hsCrud.list(this.model, options, scopes);
        }

        /**
         * @param {Object}              [options] options used as additional route options and query options
         * @param {Object}              [options.query] additional options passed to the query
         * @param {Object}              [options.route] additional route configuration options
         * @returns {Object}
         */

    }, {
        key: 'create',
        value: function create(options) {
            return this.hsCrud.create(options);
        }

        /**
         * @param {Object}              [options] options used as additional route options and query options
         * @param {Object}              [options.query] additional options passed to the query
         * @param {Object}              [options.route] additional route configuration options
         * @returns {Object}
         */

    }, {
        key: 'update',
        value: function update(options) {
            return this.hsCrud.update(options);
        }

        /**
         * @param {Object}              [options] options used as additional route options and query options
         * @param {Object}              [options.query] additional options passed to the query
         * @param {Object}              [options.route] additional route configuration options
         * @returns {Object}
         */

    }, {
        key: 'destroy',
        value: function destroy(options) {
            return this.hsCrud.destroy(options);
        }
    }]);

    return ModelView;
}();

exports.default = ModelView;
