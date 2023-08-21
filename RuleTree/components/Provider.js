import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
export var Provider = function Provider(_ref) {
  var children = _ref.children,
    noDndProvider = _ref.noDndProvider;
  return noDndProvider ? /*#__PURE__*/React.createElement(React.Fragment, null, children) : /*#__PURE__*/React.createElement(DndProvider, {
    backend: HTML5Backend
  }, children);
};