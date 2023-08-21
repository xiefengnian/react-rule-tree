import React from 'react';
import cx from 'classnames';
import { MinusCircleFilled, PlusCircleFilled } from '@ant-design/icons';
export var CollapseButton = function CollapseButton(_ref) {
  var toggleCollapse = _ref.toggleCollapse,
    child = _ref.child,
    relationWidth = _ref.relationWidth,
    collapse = _ref.collapse,
    hide = _ref.hide;
  return /*#__PURE__*/React.createElement("div", {
    onClick: function onClick() {
      toggleCollapse(child.key);
    },
    style: {
      position: 'absolute',
      left: child.position.x + relationWidth + 4,
      top: child.position.y + 20 - 11,
      zIndex: 10,
      display: hide ? 'none' : undefined
    },
    className: cx('techui-rule-tree-collapse', "techui-rule-tree-collapse-".concat(child.namePath.join('-')))
  }, collapse ? /*#__PURE__*/React.createElement(PlusCircleFilled, {
    style: {
      color: '#8c8c8c'
    },
    rev: undefined
  }) : /*#__PURE__*/React.createElement(MinusCircleFilled, {
    style: {
      color: '#8c8c8c'
    },
    rev: undefined
  }));
};