(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'elliptical-generic-repository'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('elliptical-generic-repository'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.elliptical.GenericRepository);
    global.elliptical.RepositoryProvider = mod.exports.default;
  }
})(this, function (exports, _ellipticalGenericRepository) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _ellipticalGenericRepository2 = _interopRequireDefault(_ellipticalGenericRepository);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var RepositoryProvider = function () {
    function RepositoryProvider(key, $provider, filterProp) {
      _classCallCheck(this, RepositoryProvider);

      this.key = key;
      this.$provider = $provider;
      this._filterProp = filterProp;
      this._model = this._getPersistenceModel();
      this._repo = new _ellipticalGenericRepository2.default(this._model);
      this._onChange(key, $provider);
    }

    _createClass(RepositoryProvider, [{
      key: 'get',
      value: function get(params, resource, query, callback) {
        this._repo.get(params, resource, query, callback);
      }
    }, {
      key: 'post',
      value: function post(params, resource, callback) {
        params = this._onPost(params);
        this._repo.post(params, resource, callback);
      }
    }, {
      key: 'put',
      value: function put(params, resource, callback) {
        params = this._onPut(params);
        this._repo.put(params, resource, callback);
      }
    }, {
      key: 'delete',
      value: function _delete(params, resource, callback) {
        this._repo.delete(params, resource, callback);
      }
    }, {
      key: 'query',
      value: function query(filter, asEnumerable) {
        var filterProp = this._filterProp;
        if (!filterProp) return this._model;
        var keys = Object.keys(filter);
        filter = filter[keys[0]];
        filter = filter.toLowerCase();
        var result = this.enumerable().Where(function (x) {
          return x[filterProp].toLowerCase().indexOf(filter) == 0;
        });
        return result.ToArray();
      }
    }, {
      key: 'enumerable',
      value: function enumerable() {
        return this._repo.Enumerable();
      }
    }, {
      key: 'clear',
      value: function clear(callback) {
        this._model = [];
        this._repo.model = [];
        if (callback) callback(null, []);
      }
    }, {
      key: '_getPersistenceModel',
      value: function _getPersistenceModel() {
        var model = this.$provider.get(this.key);
        if (model) return model;else return [];
      }
    }, {
      key: '_onChange',
      value: function _onChange(key, $provider) {
        this._repo.onChange = function (model) {
          $provider.set(key, model);
        };
      }
    }, {
      key: '_onPost',
      value: function _onPost(params) {
        return params;
      }
    }, {
      key: '_onPut',
      value: function _onPut(params) {
        return params;
      }
    }]);

    return RepositoryProvider;
  }();

  exports.default = RepositoryProvider;
});
