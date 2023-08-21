var _WIDTH, _HEIGHT;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
export var RELATION = 'RELATION';
export var FIELD = 'FIELD';
export var BUTTON = 'BUTTON';
export var PLACEMENT = 'PLACEMENT';
export var FIELD_WIDTH = 200;
export var FIELD_HEIGHT = 40;
export var RELATION_WIDTH = 100;
export var RELATION_HEIGHT = 40;
export var BUTTON_WIDTH = 80;
export var BUTTON_HEIGHT = 40;
export var BETWEEN_X = 50;
export var BETWEEN_Y = 22;
export var PLACEMENT_WIDTH = 100;
export var PLACEMENT_HEIGHT = 20;
export var WIDTH = (_WIDTH = {}, _defineProperty(_WIDTH, BUTTON, BUTTON_WIDTH), _defineProperty(_WIDTH, FIELD, FIELD_WIDTH), _defineProperty(_WIDTH, RELATION, RELATION_WIDTH), _WIDTH);
export var HEIGHT = (_HEIGHT = {}, _defineProperty(_HEIGHT, BUTTON, BUTTON_HEIGHT), _defineProperty(_HEIGHT, FIELD, FIELD_HEIGHT), _defineProperty(_HEIGHT, RELATION, RELATION_HEIGHT), _HEIGHT);
export var FIELD_BOX_HEIGHT = FIELD_HEIGHT + BETWEEN_Y;
export var TYPE = 'TREE_NODE';