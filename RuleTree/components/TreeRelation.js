function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _excluded = ["child", "relation", "disabled", "onRemoveRelation", "relationRemovable", "getChildrenData", "rowConfig", "actionsRender"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import { DeleteOutlined, MenuOutlined } from '@ant-design/icons';
import { Field } from 'rc-field-form';
import React from 'react';
import { BUTTON } from "../contants";
import { Space } from "./compatible/Space";
import { DragItem } from "./DragItem";
export var TreeRelation = function TreeRelation(_ref) {
  var child = _ref.child,
    relation = _ref.relation,
    disabled = _ref.disabled,
    onRemoveRelation = _ref.onRemoveRelation,
    relationRemovable = _ref.relationRemovable,
    getChildrenData = _ref.getChildrenData,
    rowConfig = _ref.rowConfig,
    actionsRender = _ref.actionsRender,
    dragItemProps = _objectWithoutProperties(_ref, _excluded);
  var removable = rowConfig.removable;
  var removeElement = /*#__PURE__*/React.createElement(DeleteOutlined, {
    style: {
      cursor: 'pointer'
    },
    onClick: function onClick() {
      onRemoveRelation(child.key);
    },
    rev: undefined
  });
  if (actionsRender) {
    var _actionsRender = actionsRender({
        // @ts-ignore
        type: child.type,
        namePath: child.namePath,
        isRoot: !child.parent,
        data: child.data,
        disabled: disabled
      }, {
        remove: function remove() {
          onRemoveRelation(child.key);
        }
      }),
      customRemoveElement = _actionsRender.remove;
    if (customRemoveElement) {
      removeElement = customRemoveElement;
    }
  }
  return /*#__PURE__*/React.createElement(DragItem, _extends({}, dragItemProps, {
    rowConfig: rowConfig,
    dragger: /*#__PURE__*/React.createElement(MenuOutlined, {
      style: {
        color: '#595959'
      },
      rev: undefined
    })
  }), /*#__PURE__*/React.createElement(Space, null, /*#__PURE__*/React.createElement(Field, {
    name: [child.namePath.join('.')].concat(['relation']),
    initialValue: child.data.relation
  }, function (props) {
    var relationElement = typeof relation === 'function' ? relation({
      depth: child.depth,
      parent: child.parent.data,
      brothers: child.parent.children.filter(function (_child) {
        return _child.type !== BUTTON && _child.key !== child.key;
      }).map(function (_child) {
        return _objectSpread({}, _child.data);
      }),
      selfData: child.data,
      data: getChildrenData(child)
    }) : relation;
    return /*#__PURE__*/React.cloneElement(relationElement, _objectSpread(_objectSpread({
      disabled: disabled
    }, relationElement.props), props));
  }), removable && removeElement));
};