import React from 'react';

// @ts-ignore
export var SVGLine = function SVGLine(_ref) {
  var fromX = _ref.fromX,
    fromY = _ref.fromY,
    toX = _ref.toX,
    toY = _ref.toY,
    radius = _ref.radius,
    _ref$stroke = _ref.stroke,
    stroke = _ref$stroke === void 0 ? '#c7d0d9' : _ref$stroke;
  var midX = fromX + (toX - fromX) / 2;
  if (fromY === toY) {
    return /*#__PURE__*/React.createElement('path', {
      d: "M".concat(fromX, ",").concat(fromY, " L").concat(toX, ",").concat(toY),
      stroke: stroke,
      fill: 'none',
      style: {
        strokeWidth: 1
      }
    });
  }
  var d = [];
  if (radius) {
    var r = toY > fromY ? radius : -radius;
    var absRadius = Math.abs(radius);
    d.push("M".concat(fromX, ",").concat(fromY, " L").concat(midX - absRadius, ",").concat(fromY));
    d.push("C".concat(midX - absRadius, ",").concat(fromY, " ").concat(midX, ",").concat(fromY, " ").concat(midX, ",").concat(fromY + r));
    d.push("L".concat(midX, ",").concat(toY - r));
    d.push("C".concat(midX, ",").concat(toY - r, " ").concat(midX, ",").concat(toY, " ").concat(midX + absRadius, ",").concat(toY));
    d.push("L".concat(toX, ",").concat(toY));
  } else {
    d.push("M".concat(fromX, ",").concat(fromY, " L").concat(midX, ",").concat(fromY));
    d.push("M".concat(midX, ",").concat(fromY, " L").concat(midX, ",").concat(toY));
    d.push("M".concat(midX, ",").concat(toY, " L").concat(toX, ",").concat(toY));
  }
  return /*#__PURE__*/React.createElement('path', {
    d: d.join(' '),
    stroke: stroke,
    fill: 'none',
    style: {
      strokeWidth: 1
    }
  });
};
export var ListLine = function ListLine(_ref2) {
  var x = _ref2.x,
    fromY = _ref2.fromY,
    toY = _ref2.toY,
    _ref2$whiteGap = _ref2.whiteGap,
    whiteGap = _ref2$whiteGap === void 0 ? 20 : _ref2$whiteGap;
  var midX = x - whiteGap;
  var d = [];
  d.push("M".concat(x, ",").concat(fromY, " L").concat(midX, ",").concat(fromY));
  d.push("M".concat(midX, ",").concat(fromY, " L").concat(midX, ",").concat(toY));
  d.push("M".concat(midX, ",").concat(toY, " L").concat(x, ",").concat(toY));
  return /*#__PURE__*/React.createElement('path', {
    d: d.join(' '),
    stroke: '#c7d0d9',
    fill: 'none',
    style: {
      strokeWidth: 1
    }
  });
};