function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
import _ from 'lodash';
export var createStyle = function createStyle(x, y) {
  return {
    position: 'absolute',
    left: x,
    top: y
  };
};
export var flatObject = function flatObject(obj) {
  var result = {};
  var fn = function fn(item, parentKey) {
    if (item.relation !== undefined) {
      var _item$children;
      result[(parentKey ? "".concat(parentKey, ".") : '') + 'relation'] = item.relation;
      (_item$children = item.children) === null || _item$children === void 0 ? void 0 : _item$children.forEach(function (arrayItem, index) {
        fn(arrayItem, (parentKey ? "".concat(parentKey, ".") : '') + 'children' + '.' + index);
      });
    } else {
      for (var key in item) {
        var val = item[key];
        result[(parentKey ? "".concat(parentKey, ".") : '') + key] = _typeof(val) === 'object' ? _.cloneDeep(val) : val;
      }
    }
  };
  fn(obj, '');
  return result;
};