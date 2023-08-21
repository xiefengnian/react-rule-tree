function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import _ from 'lodash';
export var Tree = /*#__PURE__*/function () {
  function Tree(data, type) {
    var collapsible = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var rootPreserveData = arguments.length > 3 ? arguments[3] : undefined;
    _classCallCheck(this, Tree);
    _defineProperty(this, "root", void 0);
    _defineProperty(this, "nodes", []);
    _defineProperty(this, "key", 0);
    _defineProperty(this, "collapsible", false);
    this.root = this.createNode(data, type, false, rootPreserveData);
    this.nodes.push(this.root);
    this.collapsible = collapsible;
  }

  /**
   * 判断是否根节点，可以优化代码语义
   * @param node 节点
   * @returns 是否根节点
   */
  _createClass(Tree, [{
    key: "isRoot",
    value: function isRoot(node) {
      return node === this.root;
    }
  }, {
    key: "getRoot",
    value: function getRoot() {
      return this.root;
    }

    /**
     * 切换关系节点的折叠状态
     * @param key 节点 key
     */
  }, {
    key: "toggleCollapse",
    value: function toggleCollapse(key) {
      var node = this.findByKey(key);
      node.collapse = !node.collapse;
    }

    /**
     * 遍历所有父节点判断其是否需要折叠
     * @param key 节点 key
     */
  }, {
    key: "shouldCollapse",
    value: function shouldCollapse(key) {
      var node = this.findByKey(key);
      var result = node.collapse;
      var tmp = node;
      while (tmp.parent) {
        // 一旦其某个父节点处于折叠状态，其自身必须折叠
        if (tmp.parent.collapse) {
          result = true;
          break;
        }
        tmp = tmp.parent;
      }
      return result;
    }

    /**
     * 创建节点，节点和数据分离，数据将携带在节点的data字段中
     * @param data 数据内容
     * @returns 一个新的节点
     */
  }, {
    key: "createNode",
    value: function createNode(data, type) {
      var collapse = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var preserveData = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      this.key += 1;
      return {
        data: data,
        parent: undefined,
        children: undefined,
        key: this.key - 1,
        depth: this.root ? NaN : 0,
        height: NaN,
        type: type,
        namePath: [],
        collapse: collapse,
        preserveData: preserveData
      };
    }

    /**
     * 深度优先遍历
     * @param node 遍历的开始节点
     * @param cb 观察函数
     */
  }, {
    key: "dfs",
    value: function dfs(node, cb) {
      var _this = this;
      if (node.children) {
        node.children.forEach(function (n) {
          _this.dfs(n, cb);
          cb(n);
        });
      }
      cb(node);
    }

    /**
     * 广度优先遍历
     * @param node 遍历开始的节点
     * @param cb 观察函数
     */
  }, {
    key: "bfs",
    value: function bfs(node, cb) {
      var _this2 = this;
      cb(node);
      if (node.children) {
        node.children.forEach(function (n) {
          _this2.bfs(n, cb);
        });
      }
    }

    /**
     * 寻找节点
     * @param key 查找的字段（这个 key 的含义不是节点的 key 属性）
     * @param value 查找的值
     * @returns 返回找到的节点，没有找到时为 undefined
     */
  }, {
    key: "find",
    value: function find(key, value) {
      var result;
      this.bfs(this.root, function (node) {
        if (node[key] === value) {
          result = node;
        }
      });
      return result;
    }
  }, {
    key: "findByKey",
    value: function findByKey(key) {
      return this.nodes.find(function (node) {
        return node.key === key;
      });
    }

    /**
     * 添加节点到根节点
     * @param child 节点
     */
  }, {
    key: "appendToRoot",
    value: function appendToRoot(child) {
      var parentKey = this.root.key;
      this.appendByKey(parentKey, child);
    }

    /**
     * 添加节点
     * @param parentKey 添加到对应 key 的节点
     * @param child 节点
     * @param order 添加到节点时的顺序
     * @returns 添加成功返回根节点，否则返回false
     */
  }, {
    key: "appendByKey",
    value: function appendByKey(parentKey, child, order) {
      var _this3 = this;
      var parent = this.find('key', parentKey);
      if (!parent) return false;
      if (!parent.children) {
        parent.children = [];
      }
      Object.assign(child, {
        parent: parent
      });
      Object.assign(child, {
        depth: parent.depth + 1
      });
      if (child.children) {
        this.bfs(child, function (node) {
          if (node !== child) {
            _this3.nodes.push(node);
            Object.assign(node, {
              depth: node.parent.depth + 1
            });
          }
        });
      }
      if (order !== null && order !== void 0 && order.toString()) {
        parent.children.splice(order, 0, child);
      } else {
        parent.children.push(child);
      }
      this.nodes.push(child);
      return this.root;
    }

    /**
     * 在树中删除节点
     * @param childKey 删除的节点的 key
     * @returns 返回删除的节点
     */
  }, {
    key: "removeByKey",
    value: function removeByKey(childKey) {
      var removedRoot;
      var childNode = this.find('key', childKey);
      if (!childNode) {
        return removedRoot;
      }
      var parent = childNode.parent;
      parent.children.forEach(function (child, index) {
        if (child.key === childKey) {
          removedRoot = parent.children.splice(index, 1);
        }
      });
      var removedKey = [];
      this.bfs(removedRoot[0], function (node) {
        removedKey.push(node.key);
      });
      this.nodes = this.nodes.filter(function (n) {
        return !removedKey.includes(n.key);
      });
      return removedRoot;
    }

    /**
     * 移动节点
     * @param fromKey 移动的节点 key
     * @param toKey 移动到的节点 key
     * @param order 移动的新的节点的顺序
     * @returns 移动结果
     */
  }, {
    key: "move",
    value: function move(fromKey, toKey, order) {
      var fromNode = this.removeByKey(fromKey);
      if (!fromNode) return false;
      var result = this.appendByKey(toKey, fromNode[0], order);
      return !!result;
    }

    /**
     * 渲染方法
     * @param renderOptions 渲染设置
     */
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;
      for (var _len = arguments.length, renderOptions = new Array(_len), _key = 0; _key < _len; _key++) {
        renderOptions[_key] = arguments[_key];
      }
      renderOptions.forEach(function (option) {
        var order = option.order,
          renderFunction = option.renderFunction;
        if (order === 'dfs') {
          _this4.dfs(_this4.root, renderFunction);
        } else {
          _this4.bfs(_this4.root, renderFunction);
        }
      });
    }

    /**
     * 获取纯数据（不包含渲染所需的数据）
     * @param startNode 从某个节点开始获取
     * @returns 纯数据
     */
  }, {
    key: "getChildrenData",
    value: function getChildrenData(startNode) {
      var _this5 = this;
      var fn = function fn(node) {
        var obj = {};
        var data = node.data,
          children = node.children,
          collapse = node.collapse,
          type = node.type,
          preserveData = node.preserveData;
        Object.assign(obj, data);
        Object.assign(obj, preserveData);
        if (type === 'RELATION' && _this5.collapsible) {
          Object.assign(obj, {
            collapse: collapse
          });
        }
        if (children) {
          var c = [];
          children.forEach(function (child) {
            if (child.type === 'BUTTON') return;
            c.push(fn(child));
          });
          Object.assign(obj, {
            children: c
          });
        }
        return obj;
      };
      return fn(startNode);
    }

    /**
     * 获取全部纯数据（不包含渲染所需的数据）
     * @returns 纯数据
     */
  }, {
    key: "getPureData",
    value: function getPureData() {
      return this.getChildrenData(this.root);
    }

    /**
     * 从数据初始化树
     * @param data 初始化的数据
     * @param format 整理数据的方法
     * @returns 用于渲染的树实例
     */
  }, {
    key: "getMaxLeft",
    value:
    /**
     * 获得节点的最后节点距离左侧的距离
     * @returns {number} maxLeft
     */
    function getMaxLeft() {
      var nodes = this.nodes;
      var maxLeft = 0;
      for (var i = 0; i < nodes.length; i++) {
        var _node$position;
        var node = nodes[i];
        if (!maxLeft || ((_node$position = node.position) === null || _node$position === void 0 ? void 0 : _node$position.x) > maxLeft) {
          var _node$position2;
          maxLeft = (_node$position2 = node.position) === null || _node$position2 === void 0 ? void 0 : _node$position2.x;
        }
      }
      return maxLeft;
    }
  }], [{
    key: "initWithData",
    value: function initWithData(data, collapsible, fieldKeys) {
      var renderData = data;
      if (!renderData.hasOwnProperty('relation')) {
        throw new Error('"relation" no exist in initial data.');
      }
      var rootPreserveData = _.omit(renderData, ['relation', 'children']);
      var tree = new Tree({
        relation: renderData.relation
      }, 'RELATION', collapsible, rootPreserveData);
      var init = function init(parentKey, initData) {
        var children = initData.children;
        children === null || children === void 0 ? void 0 : children.forEach(function (childData) {
          var isRelation = childData.hasOwnProperty('relation');
          var childNode = null;
          if (isRelation) {
            var preserveData = _.omit(childData, ['relation', 'children']);
            var fieldData = _.pick(childData, ['relation']);
            childNode = tree.createNode(_objectSpread({}, fieldData), 'RELATION', childData.collapse, preserveData);
          } else {
            var _preserveData = _.omit(childData, fieldKeys);
            var _fieldData = _.pick(childData, fieldKeys);
            childNode = tree.createNode(_objectSpread({}, _fieldData), 'FIELD', childData.collapse, _preserveData);
          }
          tree.appendByKey(parentKey, childNode);
          if (childData.children) {
            init(childNode.key, childData);
          }
        });
      };
      init(tree.getRoot().key, renderData);
      return _.cloneDeep(tree);
    }
  }]);
  return Tree;
}();