function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import _, { cloneDeep } from 'lodash';
import Form, { useForm } from 'rc-field-form';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import React, { useEffect, useRef, useState } from 'react';
import { ButtonGroup } from "./components/ButtonGroup";
import { CollapseButton } from "./components/CollapseButton";
import { PureDragItem } from "./components/DragItem";
import { DropPlacement } from "./components/DropPlacement";
import { Placement } from "./components/Placement";
import { Provider } from "./components/Provider";
import { TreeField } from "./components/TreeField";
import { TreeRelation } from "./components/TreeRelation";
import { TreeRoot } from "./components/TreeRoot";
import { BETWEEN_X, BETWEEN_Y, BUTTON, FIELD, FIELD_BOX_HEIGHT, FIELD_HEIGHT, HEIGHT, PLACEMENT_HEIGHT, RELATION } from "./contants";
import "./index.less";
import { ListLine, SVGLine } from "./svg";
import "./tree";
import { Tree } from "./tree";
import { createStyle, flatObject } from "./utils";
export var prefixCls = 'techui-rule-tree';
var RuleTree = function RuleTree(_ref) {
  var propsValue = _ref.value,
    propsOnChange = _ref.onChange,
    fields = _ref.fields,
    relation = _ref.relation,
    disabled = _ref.disabled,
    style = _ref.style,
    text = _ref.text,
    cascades = _ref.cascades,
    _ref$relationWidth = _ref.relationWidth,
    userRelationWidth = _ref$relationWidth === void 0 ? 120 : _ref$relationWidth,
    _ref$defaultRelationV = _ref.defaultRelationValue,
    defaultRelationValue = _ref$defaultRelationV === void 0 ? 'and' : _ref$defaultRelationV,
    actionRef = _ref.actionRef,
    onCascade = _ref.onCascade,
    extraDragItemRender = _ref.extraDragItemRender,
    canAddRule = _ref.canAddRule,
    canAddRuleGroup = _ref.canAddRuleGroup,
    onNodeFocus = _ref.onNodeFocus,
    copyable = _ref.copyable,
    description = _ref.description,
    defaultValue = _ref.defaultValue,
    hideButton = _ref.hideButton,
    noDrag = _ref.noDrag,
    _ref$collapsible = _ref.collapsible,
    collapsible = _ref$collapsible === void 0 ? false : _ref$collapsible,
    relationRemovable = _ref.relationRemovable,
    onFieldFocus = _ref.onFieldFocus,
    _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? 'tree' : _ref$mode,
    _ref$noDndProvider = _ref.noDndProvider,
    noDndProvider = _ref$noDndProvider === void 0 ? false : _ref$noDndProvider,
    modifyRow = _ref.modifyRow,
    modifyTreeNode = _ref.modifyTreeNode,
    actionsRender = _ref.actionsRender,
    onRemove = _ref.onRemove,
    onFieldChange = _ref.onFieldChange,
    shouldRemoveRelation = _ref.shouldRemoveRelation;
  var relationWidth = userRelationWidth + (relationRemovable && !disabled ? 20 : 0) - (disabled ? 20 : 0);
  var _useMergedState = useMergedState(defaultValue, {
      value: propsValue,
      onChange: propsOnChange
    }),
    _useMergedState2 = _slicedToArray(_useMergedState, 2),
    value = _useMergedState2[0],
    onChange = _useMergedState2[1];
  var fieldKeys = fields.map(function (item) {
    return item.name;
  });
  var tree = useRef(Tree.initWithData(value, collapsible, fieldKeys));
  var _useState = useState(0),
    _useState2 = _slicedToArray(_useState, 2),
    _setKey = _useState2[1];
  var update = function update() {
    return _setKey(function (_key) {
      return _key + 1;
    });
  };
  var setTree = function setTree(treeInstance) {
    tree.current = treeInstance;
    update();
  };
  var _useForm = useForm(),
    _useForm2 = _slicedToArray(_useForm, 1),
    form = _useForm2[0];
  var getPureData = function getPureData() {
    var _tree$current;
    return (_tree$current = tree.current) === null || _tree$current === void 0 ? void 0 : _tree$current.getPureData();
  };
  var createInitialValue = function createInitialValue() {
    return fields.reduce(function (memo, field) {
      var initialValue = field.initialValue,
        name = field.name;
      return _.merge(memo, _defineProperty({}, name, initialValue));
    }, {});
  };
  var handleAdd = function handleAdd(key, type) {
    var _tree$current2, _tree$current3;
    var fieldInitialValue = createInitialValue();
    var node = (_tree$current2 = tree.current) === null || _tree$current2 === void 0 ? void 0 : _tree$current2.createNode(type === 'RELATION' ? {
      relation: defaultRelationValue
    } : fieldInitialValue, type);
    (_tree$current3 = tree.current) === null || _tree$current3 === void 0 ? void 0 : _tree$current3.appendByKey(key, node);
    if (type === RELATION) {
      var _tree$current4, _tree$current5;
      var autoField = (_tree$current4 = tree.current) === null || _tree$current4 === void 0 ? void 0 : _tree$current4.createNode(fieldInitialValue, 'FIELD');
      (_tree$current5 = tree.current) === null || _tree$current5 === void 0 ? void 0 : _tree$current5.appendByKey(node.key, autoField);
    }
    onChange === null || onChange === void 0 ? void 0 : onChange(getPureData());
  };
  var handleExternalDrop = function handleExternalDrop(data, parentKey, order) {
    var _tree$current6;
    var parent = (_tree$current6 = tree.current) === null || _tree$current6 === void 0 ? void 0 : _tree$current6.find('key', parentKey);
    if (parent) {
      var _tree$current7, _tree$current8;
      var fieldInitialValue = data || createInitialValue();
      var node = (_tree$current7 = tree.current) === null || _tree$current7 === void 0 ? void 0 : _tree$current7.createNode(fieldInitialValue, 'FIELD');
      (_tree$current8 = tree.current) === null || _tree$current8 === void 0 ? void 0 : _tree$current8.appendByKey(parentKey, node, order);
      onChange === null || onChange === void 0 ? void 0 : onChange(getPureData());
    }
  };
  var resetFields = function resetFields(newValue) {
    var flattenValue = flatObject(newValue);
    Object.keys(flattenValue).forEach(function (flattenKey) {
      var name = flattenKey.split('.').filter(function (k) {
        return k !== 'children';
      });
      if (!name.join('')) {
        return;
      }
      var namePath = name;
      if (name.length > 2) {
        namePath = [name.slice(0, -1).join('.')].concat(_.last(name));
      }
      form.setFields([{
        name: namePath,
        value: flattenValue[flattenKey]
      }]);
    });
  };
  var internalActionRef = useRef({
    validate: function validate() {
      return form.validateFields();
    },
    setData: function setData(key, data) {
      var _tree$current9, _tree$current10;
      var node = (_tree$current9 = tree.current) === null || _tree$current9 === void 0 ? void 0 : _tree$current9.find('key', key);
      if (!node) return;
      node.data = data;
      onChange === null || onChange === void 0 ? void 0 : onChange((_tree$current10 = tree.current) === null || _tree$current10 === void 0 ? void 0 : _tree$current10.getPureData());
    },
    reRender: function reRender() {
      _setKey(function (k) {
        return k + 1;
      });
    }
  });
  if (actionRef) {
    _.set(actionRef, 'current', internalActionRef.current);
  }
  useEffect(function () {
    if (value) {
      setTree(Tree.initWithData(value, collapsible, fieldKeys));
      new Promise(function () {
        // 在下一个任务重置 field，否则数据可以会迟于表单渲染
        // 宏任务时机太迟，使用微任务
        resetFields(value);
      });
    }
  }, [value]);
  useEffect(function () {
    form.validateFields();
  }, []);
  var handleRemove = function handleRemove(key) {
    var _tree$current11, _tree$current12, _tree$current13;
    var node = (_tree$current11 = tree.current) === null || _tree$current11 === void 0 ? void 0 : _tree$current11.find('key', key);
    if (onRemove) {
      var shouldRemove = onRemove(node.type, node.namePath, node.data);
      if (!shouldRemove) return;
    }

    // 这个判断只有进来的时候执行一次
    if (node.type === 'FIELD' && shouldRemoveRelation !== null && shouldRemoveRelation !== void 0 && shouldRemoveRelation(node)) {
      handleRemove(node.parent.key);
      return;
    }
    var parent = node.parent;
    (_tree$current12 = tree.current) === null || _tree$current12 === void 0 ? void 0 : _tree$current12.removeByKey(key);
    if (!((_tree$current13 = tree.current) !== null && _tree$current13 !== void 0 && _tree$current13.isRoot(parent)) && parent.children.length === 1 && parent.children[0].type === BUTTON) {
      handleRemove(parent.key);
    }
    onChange === null || onChange === void 0 ? void 0 : onChange(getPureData());
  };
  var handleCopy = function handleCopy(key) {
    var _tree$current14;
    var node = (_tree$current14 = tree.current) === null || _tree$current14 === void 0 ? void 0 : _tree$current14.find('key', key);
    if (node) {
      var _tree$current15, _tree$current16;
      var data = node.data,
        parent = node.parent;
      var newNode = (_tree$current15 = tree.current) === null || _tree$current15 === void 0 ? void 0 : _tree$current15.createNode(_.clone(data), 'FIELD');
      (_tree$current16 = tree.current) === null || _tree$current16 === void 0 ? void 0 : _tree$current16.appendByKey(parent.key, newNode);
      onChange === null || onChange === void 0 ? void 0 : onChange(getPureData());
    }
  };
  var onMove = function onMove(fromKey, toKey, order, originOrder) {
    var _tree$current17, _tree$current18;
    var fromNode = (_tree$current17 = tree.current) === null || _tree$current17 === void 0 ? void 0 : _tree$current17.find('key', fromKey);
    var parentNode = fromNode.parent;
    var toNode = (_tree$current18 = tree.current) === null || _tree$current18 === void 0 ? void 0 : _tree$current18.find('key', toKey);
    if (toNode.namePath.length !== fromNode.namePath.length - 1) {
      var _tree$current19;
      (_tree$current19 = tree.current) === null || _tree$current19 === void 0 ? void 0 : _tree$current19.move(fromKey, toKey, originOrder);
    } else {
      var _tree$current20;
      // 如果是同层级移动
      (_tree$current20 = tree.current) === null || _tree$current20 === void 0 ? void 0 : _tree$current20.move(fromKey, toKey, order);
    }
    if (parentNode.type === RELATION && parentNode.children.length === 1 && parentNode.children[0].type === BUTTON) {
      handleRemove(parentNode.key);
    }
    onChange === null || onChange === void 0 ? void 0 : onChange(getPureData());
  };
  var toggleCollapse = function toggleCollapse(key) {
    tree.current.toggleCollapse(key);
    onChange(getPureData());
  };
  var render = function render() {
    var _tree$current21;
    var result = [];
    var paths = [];
    var height;
    /** render方法接受一系列的渲染函数，树结构将会连续调用这些渲染函数，形成流水线式的处理方法 */
    (_tree$current21 = tree.current) === null || _tree$current21 === void 0 ? void 0 : _tree$current21.render({
      order: 'bfs',
      renderFunction: function renderFunction(node) {
        var _node$children;
        /**
         * 为原始数据增加添加按钮节点，并且在数据更新后调整按钮的位置
         */
        var lagencyButton = (_node$children = node.children) === null || _node$children === void 0 ? void 0 : _node$children.filter(function (n) {
          return n.type === BUTTON;
        })[0];
        if (lagencyButton) {
          var _tree$current22;
          /** 在拖拽后，先把旧的按钮删除，创造新的按钮 */
          (_tree$current22 = tree.current) === null || _tree$current22 === void 0 ? void 0 : _tree$current22.removeByKey(lagencyButton.key);
        }
        if (hideButton) {
          return;
        }
        if (node.type === RELATION) {
          var _tree$current23, _tree$current24;
          var button = (_tree$current23 = tree.current) === null || _tree$current23 === void 0 ? void 0 : _tree$current23.createNode({}, 'BUTTON');
          (_tree$current24 = tree.current) === null || _tree$current24 === void 0 ? void 0 : _tree$current24.appendByKey(node.key, button);
        }
      }
    }, {
      // create height
      order: 'dfs',
      renderFunction: function renderFunction(node) {
        var _tree$current25;
        /**
         * 进行深度优先遍历，从最后节点开始计算反向计算其父容器的高度
         */
        if (node.children && !node.collapse // 折叠节点直接不计算位置
        ) {
          var childrenHeight = node.children.reduce(function (prev, current) {
            return prev + current.height;
          }, 0);
          Object.assign(node, {
            height: childrenHeight
          });
        } else {
          Object.assign(node, {
            height: FIELD_BOX_HEIGHT
          });
        }
        if ((_tree$current25 = tree.current) !== null && _tree$current25 !== void 0 && _tree$current25.isRoot(node)) {
          /** 最终，根节点高度即为组件整体高度 */
          height = node.height;
        }
      }
    },
    // 构建 namePath
    {
      order: 'bfs',
      renderFunction: function renderFunction(node) {
        if (node.parent) {
          Object.assign(node, {
            namePath: node.parent.namePath.slice().concat(_.indexOf(node.parent.children, node).toString())
          });
        } else {
          Object.assign(node, {
            namePath: []
          });
        }
      }
    }, {
      // create position
      order: 'bfs',
      renderFunction: function renderFunction(node) {
        var _tree$current26;
        /**
         * 从根节点开始，计算其子节点的位置。
         */
        if ((_tree$current26 = tree.current) !== null && _tree$current26 !== void 0 && _tree$current26.isRoot(node)) {
          Object.assign(node, {
            position: {
              x: mode === 'tree' ? 0 : 0 - relationWidth,
              y: (height - FIELD_HEIGHT) / 2 + 20
            }
          });
        }
        if (node.type === RELATION) {
          var children = node.children;
          if (!children) {
            return;
          }
          var allHeight = children.reduce(function (prev, current) {
            return prev + current.height;
          }, 0);
          children.forEach(function (child, index) {
            var y;
            /** 不要尝试搞懂这两个数值计算，我写完就忘了是什么意思，也许这就是灵光乍现吧 */
            if (index > 0) {
              var prevChild = children[index - 1];
              y = /** 上一个兄弟节点的y位置 */prevChild.position.y + /** 上一个兄弟节点高度 / 2 */prevChild.height / 2 + /** 自身高度 / 2 */child.height / 2;
            } else {
              y = /** 相对父节点位置的偏移  */node.position.y - (allHeight - FIELD_BOX_HEIGHT) / 2 + /** 自身高度带来的位置偏移 */(child.height - FIELD_BOX_HEIGHT) / 2;
            }
            Object.assign(child, {
              position: {
                x: node.position.x + relationWidth + BETWEEN_X,
                y: y
              }
            });
          });
        }
      }
    }, {
      // optimize root
      order: 'bfs',
      renderFunction: function renderFunction(node) {
        var _tree$current27;
        /**
         * 计算完子节点位置后，最后优化一下根节点位置，使其在子节点中居中
         */
        if ((_tree$current27 = tree.current) !== null && _tree$current27 !== void 0 && _tree$current27.isRoot(node)) {
          var children = node.children;
          if ((children === null || children === void 0 ? void 0 : children.length) > 1) {
            var firstChild = _.first(children);
            var lastChild = _.last(children);
            Object.assign(node, {
              position: {
                x: 0,
                y: (firstChild.position.y + lastChild.position.y) / 2
              }
            });
          }
        }
      }
    }, {
      order: 'bfs',
      renderFunction: function renderFunction(node) {
        var _tree$current28;
        /**
         * 开始渲染 JSXElement
         *
         * 渲染思路：针对每一个具有children的节点渲染其子节点，本身由父节点渲染
         */

        var rowConfig = {
          copyable: copyable,
          draggable: !(noDrag || disabled),
          removable: !disabled,
          className: ''
        };
        var children = node.children,
          key = node.key;
        if ((_tree$current28 = tree.current) !== null && _tree$current28 !== void 0 && _tree$current28.isRoot(node)) {
          var currentRowConfig = cloneDeep(rowConfig);
          if (mode === 'tree' && modifyTreeNode) {
            currentRowConfig = _objectSpread(_objectSpread({}, currentRowConfig), modifyTreeNode({
              // @ts-ignore
              type: node.type,
              namePath: node.namePath,
              data: node.data,
              isRoot: true
            }));
          }
          result.push( /*#__PURE__*/React.createElement(TreeRoot, {
            rowConfig: currentRowConfig,
            hide: mode === 'list',
            key: node.key,
            node: node,
            prefixCls: prefixCls,
            relationWidth: relationWidth,
            relation: relation,
            disabled: disabled,
            getChildrenData: function getChildrenData() {
              return tree.current.getPureData();
            },
            className: "".concat(prefixCls, "-").concat(node.type.toLowerCase())
          }));
        }
        var selfCollapse = tree.current.shouldCollapse(key);
        if (children) {
          children.forEach(function (child, index) {
            var position = child.position,
              type = child.type,
              collapse = child.collapse;
            var x = position.x,
              y = position.y;
            if (type === BUTTON) {
              /** 渲染按钮组 button render */
              var canAndRuleProps = {
                depth: child.depth,
                parent: child.parent.data,
                brothers: child.parent.children.filter(function (_child) {
                  return _child.type !== BUTTON;
                }).map(function (_child) {
                  return _objectSpread({}, _child.data);
                })
              };
              var canAddRuleGroupResult = canAddRuleGroup ? canAddRuleGroup(_.cloneDeep(canAndRuleProps)) : true;
              var canAddRuleResult = canAddRule ? canAddRule(_.cloneDeep(canAndRuleProps)) : true;
              var canAddRuleGroupDisabled = disabled || !canAddRuleGroupResult;
              var canAddRuleDisabled = disabled || !canAddRuleResult;
              result.push( /*#__PURE__*/React.createElement(ButtonGroup, {
                hide: selfCollapse,
                hideAddButton: canAddRuleResult === 'hide',
                hideAddGroupButton: canAddRuleGroupResult === 'hide' || mode === 'list',
                canAddRuleDisabled: canAddRuleDisabled,
                canAddRuleGroupDisabled: canAddRuleGroupDisabled,
                position: child.position,
                text: text,
                key: child.key,
                parentKey: node.key,
                prefixCls: prefixCls,
                handleAdd: handleAdd
              }));
            } else {
              var _node$parent, _node$parent2;
              /** 渲染拖拽的放置位置以及节点 placement render */
              result.push( /*#__PURE__*/React.createElement(Placement, {
                hide: selfCollapse,
                key: "p".concat(child.key),
                x: x,
                y: index ? children[index - 1].position.y + (y - children[index - 1].position.y) / 2 + PLACEMENT_HEIGHT / 2 : y - PLACEMENT_HEIGHT
              }, /*#__PURE__*/React.createElement(DropPlacement, {
                order: index,
                parentKey: node.key,
                namePath: child.namePath,
                relatedKeys: index > 0 ? [child.key, (_node$parent = node.parent) === null || _node$parent === void 0 ? void 0 : _node$parent.key, children[index - 1].key] : [child.key, (_node$parent2 = node.parent) === null || _node$parent2 === void 0 ? void 0 : _node$parent2.key]
              })));
              var _currentRowConfig = _objectSpread(_objectSpread({}, cloneDeep(rowConfig)), {
                removable: type === 'FIELD' ? true : relationRemovable
              });
              if (mode === 'list' && modifyRow && child.type === 'FIELD') {
                _currentRowConfig = _objectSpread(_objectSpread({}, _currentRowConfig), modifyRow({
                  index: index,
                  length: children.filter(function (c) {
                    return c.type !== 'BUTTON';
                  }).length,
                  data: child.data
                }));
              }
              if (mode === 'tree' && modifyTreeNode) {
                _currentRowConfig = _objectSpread(_objectSpread({}, _currentRowConfig), modifyTreeNode({
                  // @ts-ignore
                  type: child.type,
                  namePath: child.namePath,
                  data: child.data,
                  isRoot: false
                }));
              }
              if (type === RELATION && collapsible) {
                result.push( /*#__PURE__*/React.createElement(CollapseButton, {
                  collapse: collapse,
                  child: child,
                  toggleCollapse: toggleCollapse,
                  relationWidth: relationWidth,
                  hide: selfCollapse,
                  key: child.key + '-collapse'
                }));
              }
              result.push( /*#__PURE__*/React.createElement("span", {
                "data-height": child.height,
                key: child.key.toString(),
                style: _objectSpread(_objectSpread(_objectSpread({}, createStyle(child.position.x, child.position.y)), {
                  width: type === FIELD ? 'auto' : relationWidth,
                  height: HEIGHT[type],
                  lineHeight: "".concat(HEIGHT[type], "px")
                }), {}, {
                  display: selfCollapse ? 'none' : undefined
                }),
                className: "".concat(prefixCls, "-node-drag-container"),
                tabIndex: child.key
              }, /*#__PURE__*/React.createElement("div", {
                className: "".concat(prefixCls, "-node-container ").concat(prefixCls, "-").concat(type.toLowerCase())
              }, type === RELATION ? /*#__PURE__*/React.createElement(TreeRelation, {
                key: "r-".concat(child.namePath.join(',')),
                child: child,
                relation: relation,
                disabled: disabled,
                onMove: onMove,
                thisKey: child.key,
                namePath: child.namePath,
                rowConfig: _currentRowConfig,
                onRemoveRelation: handleRemove,
                relationRemovable: relationRemovable,
                getChildrenData: function getChildrenData(startNode) {
                  return tree.current.getChildrenData(startNode);
                },
                currentIndex: index,
                actionsRender: actionsRender
              }) : /*#__PURE__*/React.createElement(TreeField, {
                key: "f-".concat(child.namePath.join(',')),
                fields: fields,
                onCascade: onCascade,
                cascades: cascades,
                copyable: copyable,
                child: child,
                form: form,
                disabled: disabled,
                handleCopy: handleCopy,
                handleRemove: handleRemove,
                onMove: onMove,
                thisKey: child.key,
                namePath: child.namePath,
                rowConfig: _currentRowConfig,
                onNodeFocus: onNodeFocus,
                onFieldFocus: onFieldFocus,
                currentIndex: index,
                length: children.filter(function (item) {
                  return item.type !== 'BUTTON';
                }).length,
                actionsRender: actionsRender,
                onFieldChange: onFieldChange
              }))));
              if (index === children.length - 2) {
                var _node$parent3;
                /** 最后，给每个最后节点增加一个放置位置 */
                result.push( /*#__PURE__*/React.createElement(Placement, {
                  key: "ep".concat(child.key),
                  x: x,
                  y: y + FIELD_HEIGHT + BETWEEN_Y / 2 - PLACEMENT_HEIGHT / 2,
                  hide: selfCollapse
                }, /*#__PURE__*/React.createElement(DropPlacement, {
                  order: index + 1,
                  parentKey: node.key,
                  relatedKeys: [child.key, (_node$parent3 = node.parent) === null || _node$parent3 === void 0 ? void 0 : _node$parent3.key],
                  namePath: child.namePath
                })));
              }
            }
          });
        }
      }
    }, {
      order: 'bfs',
      renderFunction: function renderFunction(node) {
        /**
         * 渲染线
         */
        if (mode === 'tree') {
          if (node.type === RELATION) {
            // 如果 hideButton 且 children 为空时会导致错误
            var children = node.children,
              key = node.key;
            var _node$position = node.position,
              fromX = _node$position.x,
              fromY = _node$position.y;
            if (children !== null && children !== void 0 && children.length && !tree.current.shouldCollapse(key)) {
              children.forEach(function (child) {
                var _child$position = child.position,
                  x = _child$position.x,
                  y = _child$position.y,
                  type = child.type;
                /** 连接到每个子节点的线 */
                paths.push( /*#__PURE__*/React.createElement(SVGLine, {
                  key: "svg-".concat(node.key, "-").concat(child.key),
                  fromX: fromX + relationWidth,
                  fromY: fromY + HEIGHT[RELATION] / 2,
                  toX: x,
                  toY: y + HEIGHT[type] / 2
                }));
              });
            }
          }
        } else {
          if (node.type === RELATION) {
            // 如果 hideButton 且 children 为空时会导致错误
            var _children = node.children;
            if (_children !== null && _children !== void 0 && _children.length) {
              _children.forEach(function (child, index) {
                if (index === _children.length - 1) return;
                var _child$position2 = child.position,
                  x = _child$position2.x,
                  y = _child$position2.y,
                  type = child.type;
                var toY = _children[index + 1].position.y;

                /** 连接到每个子节点的线 */
                paths.push( /*#__PURE__*/React.createElement(ListLine, {
                  key: "svg-".concat(node.key, "-").concat(child.key),
                  x: x,
                  fromY: y + HEIGHT[RELATION] / 2,
                  toY: toY + HEIGHT[type] / 2
                }));
              });
            }
          }
        }
        // 渲染线结束
      }
    });

    result.push( /*#__PURE__*/React.createElement("svg", {
      key: "svg",
      style: {
        pointerEvents: 'none',
        position: 'absolute',
        left: 0,
        top: 0
      },
      width: tree.current.getMaxLeft() + 20,
      height: height
    }, paths));
    return /*#__PURE__*/React.createElement("div", {
      style: {
        height: height,
        width: '100%',
        paddingTop: 20,
        boxSizing: 'content-box',
        position: 'relative'
      }
    }, result);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: style,
    className: "".concat(prefixCls, "-container")
  }, /*#__PURE__*/React.createElement(Provider, {
    key: "rule-tree-provider",
    noDndProvider: noDndProvider
  }, /*#__PURE__*/React.createElement(Form, {
    component: "div",
    form: form,
    onValuesChange: _.debounce(function (changeValues, values) {
      /** 因为 antd5 的 bug，该表单无法获得 values，改为 changeValues 赋值 */

      var currentData = cloneDeep(getPureData());
      Object.keys(changeValues).forEach(function (fieldPath) {
        var val = changeValues[fieldPath];

        // fieldPath 处理:
        // example: 1.0 => 1.children.0 relation => relation
        var finalFiledPath = fieldPath === 'relation' ? fieldPath : fieldPath.split('.').reduce(function (memo, current) {
          return [].concat(_toConsumableArray(memo), ['children', current]);
        }, []).join('.');
        var finalVal = fieldPath === 'relation' ? val : _objectSpread(_objectSpread({}, _.get(currentData, finalFiledPath)), val);
        _.set(currentData, finalFiledPath, finalVal);
      });
      onChange === null || onChange === void 0 ? void 0 : onChange(currentData);
    }, 100)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexGrow: 0,
      flexShrink: 0,
      position: 'relative',
      flexDirection: 'column'
    }
  }, description && /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-desc")
  }, description), render()), extraDragItemRender && extraDragItemRender(function (_ref2) {
    var data = _ref2.data,
      onDragEnd = _ref2.onDragEnd,
      renderFunction = _ref2.render;
    return /*#__PURE__*/React.createElement(PureDragItem, {
      data: data,
      disabled: disabled,
      key: JSON.stringify(data),
      onDrop: function onDrop(_data, parentKey, order) {
        if (onDragEnd) {
          onDragEnd(_data);
        }
        handleExternalDrop(_data, parentKey, order);
      }
    }, renderFunction(data));
  }))));
};
export default RuleTree;