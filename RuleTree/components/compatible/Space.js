import React from 'react';
export var Space = function Space(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      height: '100%',
      rowGap: 8,
      columnGap: 8
    }
  }, children.filter(function (child) {
    return !!child;
  }).map(function (child, index) {
    var _child$props, _child$props$children, _child$props$children2;
    // @ts-ignore
    // eslint-disable-next-line
    var shouldNotRender = !!(child !== null && child !== void 0 && (_child$props = child.props) !== null && _child$props !== void 0 && (_child$props$children = _child$props.children) !== null && _child$props$children !== void 0 && (_child$props$children2 = _child$props$children.props) !== null && _child$props$children2 !== void 0 && _child$props$children2.__should_not_render__);
    return /*#__PURE__*/React.createElement("div", {
      key: index,
      style: {
        display: shouldNotRender ? 'none' : 'block'
      }
    }, child);
  })));
};