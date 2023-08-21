function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import _ from 'lodash';
import React from 'react';
import { useDrag } from 'react-dnd';
import { Space } from "../components/compatible/Space";
import { TYPE } from "../contants";
import cx from 'classnames';
export var DragItem = function DragItem(_ref) {
  var children = _ref.children,
    disabled = _ref.disabled,
    thisKey = _ref.thisKey,
    namePath = _ref.namePath,
    onMove = _ref.onMove,
    dragger = _ref.dragger,
    currentIndex = _ref.currentIndex,
    rowConfig = _ref.rowConfig;
  var _useDrag = useDrag(function () {
      return {
        type: TYPE,
        item: {
          thisKey: thisKey,
          namePath: namePath,
          from: 'internal',
          currentIndex: currentIndex
        },
        collect: function collect(monitor) {
          return {
            isDragging: monitor.isDragging()
          };
        },
        end: function end(item, monitor) {
          var result = monitor.getDropResult();
          if (result && item.from === 'internal') {
            var _ref2 = result,
              _parentKey = _ref2.parentKey,
              _order = _ref2.order,
              _originOrder = _ref2.originOrder;
            onMove(thisKey, _parentKey, _order, _originOrder);
          }
        },
        canDrag: !disabled
      };
    }, [thisKey, namePath]),
    _useDrag2 = _slicedToArray(_useDrag, 3),
    isDragging = _useDrag2[0].isDragging,
    drag = _useDrag2[1],
    dragPreview = _useDrag2[2];
  return /*#__PURE__*/React.createElement("div", {
    ref: dragPreview,
    style: {
      opacity: isDragging ? 0.5 : 1,
      width: '100%'
    },
    "data-thiskey": thisKey
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(rowConfig.className),
    style: {
      padding: '0px 8px',
      borderRadius: 3
    }
  }, /*#__PURE__*/React.createElement(Space, null, rowConfig.draggable && /*#__PURE__*/React.createElement("div", {
    ref: drag
  }, dragger), /*#__PURE__*/React.createElement(React.Fragment, null, children))));
};
export var PureDragItem = function PureDragItem(_ref3) {
  var data = _ref3.data,
    onDrop = _ref3.onDrop,
    disabled = _ref3.disabled,
    children = _ref3.children;
  var _useDrag3 = useDrag(function () {
      return {
        type: TYPE,
        item: {
          data: data,
          from: 'external'
        },
        collect: function collect(monitor) {
          return {
            isDragging: monitor.isDragging()
          };
        },
        end: function end(item, monitor) {
          var result = monitor.getDropResult();
          if (result) {
            onDrop(_.cloneDeep(item.data), result.parentKey, result.order);
          }
        },
        canDrag: !disabled
      };
    }),
    _useDrag4 = _slicedToArray(_useDrag3, 3),
    isDragging = _useDrag4[0].isDragging,
    drag = _useDrag4[1],
    dragPreview = _useDrag4[2];
  return /*#__PURE__*/React.createElement("div", {
    ref: dragPreview,
    style: {
      opacity: isDragging ? '0.5' : 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: drag
  }, children));
};