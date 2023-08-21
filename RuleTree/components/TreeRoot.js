function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { Field } from 'rc-field-form';
import React from 'react';
import { RELATION_HEIGHT } from "../contants";
import { createStyle } from "../utils";
import cx from 'classnames';
export var TreeRoot = function TreeRoot(_ref) {
  var prefixCls = _ref.prefixCls,
    relationWidth = _ref.relationWidth,
    relation = _ref.relation,
    disabled = _ref.disabled,
    node = _ref.node,
    getChildrenData = _ref.getChildrenData,
    hide = _ref.hide,
    className = _ref.className,
    rowConfig = _ref.rowConfig;
  return /*#__PURE__*/React.createElement("div", {
    className: cx("".concat(prefixCls, "-node-root"), rowConfig.className, _defineProperty({}, className, className)),
    style: _objectSpread(_objectSpread(_objectSpread({}, createStyle(node.position.x, node.position.y)), {
      width: relationWidth,
      height: RELATION_HEIGHT,
      lineHeight: "".concat(RELATION_HEIGHT, "px")
    }), hide ? {
      display: 'none'
    } : {})
  }, /*#__PURE__*/React.createElement(Field, {
    name: ['relation'],
    initialValue: node.data.relation,
    shouldUpdate: function shouldUpdate(prevValues, curValues) {
      var namePath = 'relation';
      return prevValues[namePath] !== curValues[namePath];
    }
  }, function (props) {
    var relationElement = typeof relation === 'function' ? relation({
      depth: node.depth,
      parent: null,
      brothers: null,
      selfData: node.data,
      data: getChildrenData(node)
    }) : relation;
    return /*#__PURE__*/React.cloneElement(relationElement, _objectSpread(_objectSpread({
      disabled: disabled
    }, relationElement.props), props));
  }));
};