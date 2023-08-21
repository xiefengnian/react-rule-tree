var _excluded = ["fields", "onCascade", "cascades", "copyable", "child", "form", "disabled", "handleCopy", "handleRemove", "onNodeFocus", "onFieldFocus", "length", "actionsRender", "onFieldChange"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import { CopyOutlined, DeleteOutlined, MenuOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { Field } from 'rc-field-form';
import React from 'react';
import { prefixCls } from '..';
import { Space } from "./compatible/Space";
import { DragItem } from "./DragItem";
export var TreeField = function TreeField(_ref) {
  var fields = _ref.fields,
    onCascade = _ref.onCascade,
    cascades = _ref.cascades,
    copyable = _ref.copyable,
    child = _ref.child,
    form = _ref.form,
    disabled = _ref.disabled,
    handleCopy = _ref.handleCopy,
    handleRemove = _ref.handleRemove,
    onNodeFocus = _ref.onNodeFocus,
    onFieldFocus = _ref.onFieldFocus,
    length = _ref.length,
    actionsRender = _ref.actionsRender,
    onFieldChange = _ref.onFieldChange,
    dragItemProps = _objectWithoutProperties(_ref, _excluded);
  var currentIndex = dragItemProps.currentIndex,
    rowConfig = dragItemProps.rowConfig;
  var hasAllow = Object.keys(rowConfig).filter(function (key) {
    return rowConfig[key];
  }).length > 0;
  var onCopy = function onCopy() {
    if (!disabled) {
      handleCopy(child.key);
    }
  };
  var onRemove = function onRemove() {
    if (!disabled) {
      handleRemove(child.key);
    }
  };
  var copyElement = /*#__PURE__*/React.createElement(CopyOutlined, {
    className: "".concat(prefixCls, "-action-copy"),
    onClick: onCopy,
    style: {
      cursor: disabled ? 'not-allowed' : 'pointer',
      color: '#595959'
    },
    rev: undefined
  });
  var removeElement = /*#__PURE__*/React.createElement(DeleteOutlined, {
    className: "".concat(prefixCls, "-action-remove"),
    onClick: onRemove,
    style: {
      cursor: disabled ? 'not-allowed' : 'pointer',
      color: '#595959'
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
        remove: onRemove,
        copy: onCopy
      }),
      customRemoveElement = _actionsRender.remove,
      customCopyElement = _actionsRender.copy;
    if (customRemoveElement) {
      removeElement = customRemoveElement;
    }
    if (customCopyElement) {
      copyElement = customCopyElement;
    }
  }
  return /*#__PURE__*/React.createElement(DragItem, _extends({}, dragItemProps, {
    key: "d-".concat(child.namePath.join(',')),
    rowConfig: rowConfig,
    dragger: /*#__PURE__*/React.createElement(MenuOutlined, {
      className: "".concat(prefixCls, "-action-drag"),
      style: {
        color: '#595959'
      },
      rev: undefined
    })
  }), /*#__PURE__*/React.createElement(Space, null, /*#__PURE__*/React.createElement("div", {
    onClick: function onClick() {
      var context = {
        getData: function getData() {
          return child.data;
        },
        getKey: function getKey() {
          return child.key;
        }
      };
      if (onNodeFocus) {
        onNodeFocus(context);
      }
    }
  }, /*#__PURE__*/React.createElement(Space, null, fields && fields.map(function (_ref2) {
    var renderComponent = _ref2.render,
      name = _ref2.name,
      rules = _ref2.rules;
    var namePath = [child.namePath.join('.')].concat(name);
    var context = {
      getFieldValue: function getFieldValue(ctxName) {
        return form.getFieldValue([child.namePath.join('.')].concat(ctxName));
      },
      getFieldError: function getFieldError() {
        return form.getFieldError(namePath);
      },
      setFieldValue: function setFieldValue(_name, _value) {
        form.setFields([{
          name: [child.namePath.join('.')].concat(_name),
          value: _value
        }]);
      }
    };
    var component = renderComponent(context, child, {
      index: currentIndex,
      length: length
    });
    var isEmptyString = typeof component === 'string' && !component;
    if (isEmptyString) {
      console.error('请不要再使用空字符串表达该项不渲染，使用 false 代替. 该语法将在下一个 major 版本彻底移除支持！');
    }
    var shouldNotRender = isEmptyString || component === false;
    return /*#__PURE__*/React.createElement("div", {
      key: namePath.join('.'),
      "data-namepath": namePath,
      style: {
        minHeight: 32
      }
    }, /*#__PURE__*/React.createElement(Field, {
      name: namePath
      // 不渲染的field则不需要校验
      ,
      rules: shouldNotRender ? undefined : rules,
      initialValue: child.data[name],
      shouldUpdate: function shouldUpdate(prevValues, curValues) {
        return !_.isEqual(_.get(prevValues, child.namePath), _.get(curValues, child.namePath));
      }
      // @ts-ignore
      ,
      __should_not_render__: shouldNotRender
    }, function (props) {
      var cascadesOnChange = function cascadesOnChange(_props) {
        var _props$onChange;
        var _propsValue =
        // 有可能吐回 event 或者 value
        _typeof(_props) === 'object' && _props.target ? _props.target.value : _props;
        onFieldChange === null || onFieldChange === void 0 ? void 0 : onFieldChange(name, _propsValue, child.data[name], child);
        (_props$onChange = props.onChange) === null || _props$onChange === void 0 ? void 0 : _props$onChange.call(props, _props); // onChange 必须在前，否则 onCascade 的值会延迟一次 onChange
        if (onCascade && cascades !== null && cascades !== void 0 && cascades.includes(name)) {
          var _props$onChange2;
          onCascade({
            getFieldError: context.getFieldError,
            getFieldValue: context.getFieldValue,
            setFieldValue: function setFieldValue(_name, _value) {
              child.data[_name] = _value;
            }
          }, name);
          (_props$onChange2 = props.onChange) === null || _props$onChange2 === void 0 ? void 0 : _props$onChange2.call(props, _props); // 如果在 onCascade 设置了 field，需要重新 onChange 一下 filed
        }
      };

      var onClick = function onClick() {
        onFieldFocus === null || onFieldFocus === void 0 ? void 0 : onFieldFocus(child.key, name, props.value, child.data);
      };
      if (typeof component === 'function') {
        component = component(props.value, cascadesOnChange);
        console.error('使用 render: ()=>(value,onChange)=>React.ReactElement 会导致渲染问题，复杂组件请使用：render : ()=> <YourComponent />');
        return /*#__PURE__*/React.createElement("div", {
          onClick: onClick
        }, component);
      }
      if ( /*#__PURE__*/React.isValidElement(component)) {
        return /*#__PURE__*/React.createElement("div", {
          onClick: onClick
        }, /*#__PURE__*/React.cloneElement(component, _objectSpread(_objectSpread(_objectSpread({
          disabled: disabled
        }, component.props), typeof component === 'function' ? {} : {
          value: props.value,
          onChange: cascadesOnChange
        }), {}, {
          key: "field-component-".concat(namePath.join(','))
        })));
      }
      return /*#__PURE__*/React.createElement("div", {
        onClick: onClick
      }, component);
    }));
  }))), hasAllow && /*#__PURE__*/React.createElement(Space, null, rowConfig.copyable && copyElement, rowConfig.removable && removeElement)));
};