function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import Tooltip from 'rc-tooltip';
import { BUTTON, BUTTON_HEIGHT, BUTTON_WIDTH, WIDTH } from "../contants";
import { createStyle } from "../utils";
import { PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import cx from 'classnames';
import 'rc-tooltip/assets/bootstrap.css';
export var ButtonGroup = function ButtonGroup(_ref) {
  var parentKey = _ref.parentKey,
    position = _ref.position,
    prefixCls = _ref.prefixCls,
    text = _ref.text,
    canAddRuleDisabled = _ref.canAddRuleDisabled,
    canAddRuleGroupDisabled = _ref.canAddRuleGroupDisabled,
    handleAdd = _ref.handleAdd,
    hideAddButton = _ref.hideAddButton,
    hideAddGroupButton = _ref.hideAddGroupButton,
    _ref$hide = _ref.hide,
    hide = _ref$hide === void 0 ? false : _ref$hide;
  return /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread(_objectSpread({}, createStyle(position.x, position.y)), {
      width: BUTTON_WIDTH,
      height: BUTTON_HEIGHT,
      lineHeight: "".concat(BUTTON_HEIGHT, "px")
    }), {
      display: hide ? 'none' : undefined
    }),
    className: "".concat(prefixCls, "-node-button-group")
  }, /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-button-fix-size")
  }, !hideAddButton && /*#__PURE__*/React.createElement(Tooltip, {
    overlay: (text === null || text === void 0 ? void 0 : text.addRule) || '添加规则',
    placement: "top"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      cursor: canAddRuleDisabled ? 'not-allowed' : 'pointer'
    },
    className: "".concat(prefixCls, "-button-left"),
    onClick: function onClick() {
      return !canAddRuleDisabled && handleAdd(parentKey, 'FIELD');
    }
  }, /*#__PURE__*/React.createElement(PlusOutlined, {
    style: {
      width: WIDTH[BUTTON] / 2,
      color: '#c7d0d9',
      display: 'flex',
      justifyContent: 'center'
    },
    rev: undefined
  }))), !hideAddGroupButton && /*#__PURE__*/React.createElement(Tooltip, {
    overlay: (text === null || text === void 0 ? void 0 : text.addRelation) || '添加规则组',
    placement: "top"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      cursor: canAddRuleGroupDisabled ? 'not-allowed' : 'pointer'
    },
    className: cx("".concat(prefixCls, "-button-right"), _defineProperty({}, "no-border", hideAddButton)),
    onClick: function onClick() {
      return !canAddRuleGroupDisabled && handleAdd(parentKey, 'RELATION');
    }
  }, /*#__PURE__*/React.createElement(PlusCircleOutlined, {
    style: {
      width: WIDTH[BUTTON] / 2,
      color: '#c7d0d9',
      display: 'flex',
      justifyContent: 'center'
    },
    rev: undefined
  })))));
};