import _, { cloneDeep } from 'lodash';
import Form, { useForm } from 'rc-field-form';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import React, { useEffect, useRef, useState } from 'react';
import { ButtonGroup } from './components/ButtonGroup';
import { CollapseButton } from './components/CollapseButton';
import { PureDragItem } from './components/DragItem';
import { DropPlacement } from './components/DropPlacement';
import { Placement } from './components/Placement';
import { Provider } from './components/Provider';
import { TreeField } from './components/TreeField';
import { TreeRelation } from './components/TreeRelation';
import { TreeRoot } from './components/TreeRoot';
import {
  BETWEEN_X,
  BETWEEN_Y,
  BUTTON,
  FIELD,
  FIELD_BOX_HEIGHT,
  FIELD_HEIGHT,
  HEIGHT,
  PLACEMENT_HEIGHT,
  RELATION,
} from './contants';
import './index.less';
import { ListLine, SVGLine } from './svg';
import './tree';
import { Tree } from './tree';
import type {
  ActionType,
  CanAndRuleProps,
  Field,
  NodeType,
  Relation,
  RowConfig,
  RuleTreeProps,
} from './type';
import { createStyle, flatObject } from './utils';

export const prefixCls = 'techui-rule-tree';

const RuleTree: React.FC<
  RuleTreeProps & { onChange?: (value: any) => void; value?: any; id?: string }
> = ({
  value: propsValue,
  onChange: propsOnChange,
  fields,
  relation,
  disabled,
  style,
  text,
  cascades,
  relationWidth: userRelationWidth = 120,
  defaultRelationValue = 'and',
  actionRef,
  onCascade,
  extraDragItemRender,
  canAddRule,
  canAddRuleGroup,
  onNodeFocus,
  copyable,
  description,
  defaultValue,
  hideButton,
  noDrag,
  collapsible = false,
  relationRemovable,
  onFieldFocus,
  mode = 'tree',
  noDndProvider = false,
  modifyRow,
  modifyTreeNode,
  actionsRender,
  onRemove,
  onFieldChange,
  shouldRemoveRelation,
}) => {
  const relationWidth =
    userRelationWidth +
    (relationRemovable && !disabled ? 20 : 0) -
    (disabled ? 20 : 0);

  const [value, onChange] = useMergedState(defaultValue, {
    value: propsValue,
    onChange: propsOnChange,
  });

  const fieldKeys: string[] = fields.map((item) => item.name);

  const tree = useRef<Tree>(Tree.initWithData(value, collapsible, fieldKeys));

  const [, _setKey] = useState(0);

  const update = () => _setKey((_key) => _key + 1);

  const setTree = (treeInstance: Tree) => {
    tree.current = treeInstance;
    update();
  };

  const [form] = useForm();

  const getPureData = () => tree.current?.getPureData();

  const createInitialValue = () =>
    fields.reduce((memo, field) => {
      const { initialValue, name } = field;
      return _.merge(memo, { [name]: initialValue });
    }, {});

  const handleAdd = (key: number, type: NodeType) => {
    const fieldInitialValue = createInitialValue();
    const node = tree.current?.createNode(
      type === 'RELATION'
        ? { relation: defaultRelationValue }
        : fieldInitialValue,
      type,
    );
    tree.current?.appendByKey(key, node);
    if (type === RELATION) {
      const autoField = tree.current?.createNode(fieldInitialValue, 'FIELD');
      tree.current?.appendByKey(node.key, autoField);
    }
    onChange?.(getPureData());
  };

  const handleExternalDrop = (data: any, parentKey: number, order: number) => {
    const parent = tree.current?.find('key', parentKey);
    if (parent) {
      const fieldInitialValue = data || createInitialValue();
      const node = tree.current?.createNode(fieldInitialValue, 'FIELD');
      tree.current?.appendByKey(parentKey, node, order);
      onChange?.(getPureData());
    }
  };

  const resetFields = (newValue: any) => {
    const flattenValue = flatObject(newValue);
    Object.keys(flattenValue).forEach((flattenKey) => {
      const name = flattenKey.split('.').filter((k) => k !== 'children');
      if (!name.join('')) {
        return;
      }
      let namePath = name;
      if (name.length > 2) {
        namePath = [name.slice(0, -1).join('.')].concat(_.last(name)!);
      }
      form.setFields([
        {
          name: namePath,
          value: flattenValue[flattenKey],
        },
      ]);
    });
  };

  const internalActionRef = useRef<ActionType>({
    validate: () => form.validateFields(),
    setData: (key, data) => {
      const node = tree.current?.find('key', key);
      if (!node) return;
      node.data = data;
      onChange?.(tree.current?.getPureData());
    },
    reRender: () => {
      _setKey((k) => k + 1);
    },
  });

  if (actionRef) {
    _.set(actionRef, 'current', internalActionRef.current);
  }

  useEffect(() => {
    if (value) {
      setTree(Tree.initWithData(value, collapsible, fieldKeys));
      new Promise(() => {
        // 在下一个任务重置 field，否则数据可以会迟于表单渲染
        // 宏任务时机太迟，使用微任务
        resetFields(value);
      });
    }
  }, [value]);

  useEffect(() => {
    form.validateFields();
  }, []);

  const handleRemove = (key: number) => {
    const node = tree.current?.find('key', key);

    if (onRemove) {
      const shouldRemove = onRemove(
        node.type as Relation | Field,
        node.namePath,
        node.data,
      );
      if (!shouldRemove) return;
    }

    // 这个判断只有进来的时候执行一次
    if (node.type === 'FIELD' && shouldRemoveRelation?.(node)) {
      handleRemove(node.parent.key);
      return;
    }

    const { parent } = node;
    tree.current?.removeByKey(key);
    if (
      !tree.current?.isRoot(parent) &&
      parent.children.length === 1 &&
      parent.children[0].type === BUTTON
    ) {
      handleRemove(parent.key);
    }
    onChange?.(getPureData());
  };

  const handleCopy = (key: number) => {
    const node = tree.current?.find('key', key);
    if (node) {
      const { data, parent } = node;
      const newNode = tree.current?.createNode(_.clone(data), 'FIELD');
      tree.current?.appendByKey(parent.key, newNode);
      onChange?.(getPureData());
    }
  };

  const onMove = (
    fromKey: number,
    toKey: number,
    order: number,
    originOrder: number,
  ) => {
    const fromNode = tree.current?.find('key', fromKey);
    const parentNode = fromNode.parent;
    const toNode = tree.current?.find('key', toKey);

    if (toNode.namePath.length !== fromNode.namePath.length - 1) {
      tree.current?.move(fromKey, toKey, originOrder);
    } else {
      // 如果是同层级移动
      tree.current?.move(fromKey, toKey, order);
    }

    if (
      parentNode.type === RELATION &&
      parentNode.children.length === 1 &&
      parentNode.children[0].type === BUTTON
    ) {
      handleRemove(parentNode.key);
    }
    onChange?.(getPureData());
  };

  const toggleCollapse = (key: number) => {
    tree.current.toggleCollapse(key);
    onChange(getPureData());
  };

  const render = () => {
    const result: React.ReactElement[] = [];
    const paths: React.ReactElement[] = [];
    let height: number = 0;
    /** render方法接受一系列的渲染函数，树结构将会连续调用这些渲染函数，形成流水线式的处理方法 */
    tree.current?.render(
      {
        order: 'bfs',
        renderFunction: (node) => {
          /**
           * 为原始数据增加添加按钮节点，并且在数据更新后调整按钮的位置
           */
          const lagencyButton = node.children?.filter(
            (n) => n.type === BUTTON,
          )[0];
          if (lagencyButton) {
            /** 在拖拽后，先把旧的按钮删除，创造新的按钮 */
            tree.current?.removeByKey(lagencyButton.key);
          }
          if (hideButton) {
            return;
          }
          if (node.type === RELATION) {
            const button = tree.current?.createNode({}, 'BUTTON');
            tree.current?.appendByKey(node.key, button);
          }
        },
      },
      {
        // create height
        order: 'dfs',
        renderFunction: (node) => {
          /**
           * 进行深度优先遍历，从最后节点开始计算反向计算其父容器的高度
           */
          if (
            node.children &&
            !node.collapse // 折叠节点直接不计算位置
          ) {
            const childrenHeight = node.children.reduce(
              (prev, current) => prev + current.height,
              0,
            );
            Object.assign(node, { height: childrenHeight });
          } else {
            Object.assign(node, { height: FIELD_BOX_HEIGHT });
          }
          if (tree.current?.isRoot(node)) {
            /** 最终，根节点高度即为组件整体高度 */
            height = node.height;
          }
        },
      },
      // 构建 namePath
      {
        order: 'bfs',
        renderFunction: (node) => {
          if (node.parent) {
            Object.assign(node, {
              namePath: node.parent.namePath
                .slice()
                .concat(_.indexOf(node.parent.children, node).toString()),
            });
          } else {
            Object.assign(node, { namePath: [] });
          }
        },
      },
      {
        // create position
        order: 'bfs',
        renderFunction: (node) => {
          /**
           * 从根节点开始，计算其子节点的位置。
           */
          if (tree.current?.isRoot(node)) {
            Object.assign(node, {
              position: {
                x: mode === 'tree' ? 0 : 0 - relationWidth,
                y: (height - FIELD_HEIGHT) / 2 + 20,
              },
            });
          }
          if (node.type === RELATION) {
            const { children } = node;
            if (!children) {
              return;
            }
            const allHeight = children.reduce(
              (prev, current) => prev + current.height,
              0,
            );
            children.forEach((child, index) => {
              let y;
              /** 不要尝试搞懂这两个数值计算，我写完就忘了是什么意思，也许这就是灵光乍现吧 */
              if (index > 0) {
                const prevChild = children[index - 1];
                y =
                  /** 上一个兄弟节点的y位置 */ prevChild.position!.y +
                  /** 上一个兄弟节点高度 / 2 */ prevChild.height / 2 +
                  /** 自身高度 / 2 */ child.height / 2;
              } else {
                y =
                  /** 相对父节点位置的偏移  */ node.position!.y -
                  (allHeight - FIELD_BOX_HEIGHT) / 2 +
                  /** 自身高度带来的位置偏移 */ (child.height -
                    FIELD_BOX_HEIGHT) /
                    2;
              }
              Object.assign(child, {
                position: {
                  x: node.position!.x + relationWidth + BETWEEN_X,
                  y,
                },
              });
            });
          }
        },
      },
      {
        // optimize root
        order: 'bfs',
        renderFunction: (node) => {
          /**
           * 计算完子节点位置后，最后优化一下根节点位置，使其在子节点中居中
           */
          if (tree.current?.isRoot(node)) {
            const { children } = node;
            if (children?.length > 1) {
              const firstChild = _.first(children)!;
              const lastChild = _.last(children)!;
              Object.assign(node, {
                position: {
                  x: 0,
                  y: (firstChild.position!.y + lastChild.position!.y) / 2,
                },
              });
            }
          }
        },
      },
      {
        order: 'bfs',
        renderFunction: (node) => {
          /**
           * 开始渲染 JSXElement
           *
           * 渲染思路：针对每一个具有children的节点渲染其子节点，本身由父节点渲染
           */

          const rowConfig: RowConfig = {
            copyable: copyable,
            draggable: !(noDrag || disabled),
            removable: !disabled,
            className: '',
          };

          const { children, key } = node;
          if (tree.current?.isRoot(node)) {
            let currentRowConfig = cloneDeep(rowConfig);
            if (mode === 'tree' && modifyTreeNode) {
              currentRowConfig = {
                ...currentRowConfig,
                ...modifyTreeNode({
                  // @ts-ignore
                  type: node.type,
                  namePath: node.namePath,
                  data: node.data,
                  isRoot: true,
                }),
              };
            }
            result.push(
              <TreeRoot
                rowConfig={currentRowConfig}
                hide={mode === 'list'}
                key={node.key}
                node={node}
                prefixCls={prefixCls}
                relationWidth={relationWidth}
                relation={relation}
                disabled={Boolean(disabled)}
                getChildrenData={() => tree.current.getPureData()}
                className={`${prefixCls}-${node.type.toLowerCase()}`}
              />,
            );
          }

          const selfCollapse = tree.current.shouldCollapse(key);

          if (children) {
            children.forEach((child, index) => {
              const { type, collapse } = child;
              const { x, y } = child.position!;
              if (type === BUTTON) {
                /** 渲染按钮组 button render */
                const canAndRuleProps: CanAndRuleProps = {
                  depth: child.depth,
                  parent: child.parent.data,
                  brothers: child.parent.children
                    .filter((_child) => _child.type !== BUTTON)
                    .map((_child) => ({ ..._child.data })),
                };

                const canAddRuleGroupResult = canAddRuleGroup
                  ? canAddRuleGroup(_.cloneDeep(canAndRuleProps))
                  : true;
                const canAddRuleResult = canAddRule
                  ? canAddRule(_.cloneDeep(canAndRuleProps))
                  : true;

                const canAddRuleGroupDisabled =
                  disabled || !canAddRuleGroupResult;
                const canAddRuleDisabled = disabled || !canAddRuleResult;
                result.push(
                  <ButtonGroup
                    hide={selfCollapse}
                    hideAddButton={canAddRuleResult === 'hide'}
                    hideAddGroupButton={
                      canAddRuleGroupResult === 'hide' || mode === 'list'
                    }
                    canAddRuleDisabled={canAddRuleDisabled}
                    canAddRuleGroupDisabled={canAddRuleGroupDisabled}
                    position={child.position!}
                    text={text}
                    key={child.key}
                    parentKey={node.key}
                    prefixCls={prefixCls}
                    handleAdd={handleAdd}
                  />,
                );
              } else {
                /** 渲染拖拽的放置位置以及节点 placement render */
                result.push(
                  <Placement
                    hide={selfCollapse}
                    key={`p${child.key}`}
                    x={x}
                    y={
                      index
                        ? children[index - 1].position!.y +
                          (y - children[index - 1].position!.y) / 2 +
                          PLACEMENT_HEIGHT / 2
                        : y - PLACEMENT_HEIGHT
                    }
                  >
                    <DropPlacement
                      order={index}
                      parentKey={node.key}
                      namePath={child.namePath}
                      relatedKeys={
                        index > 0
                          ? [
                              child.key,
                              node.parent?.key,
                              children[index - 1].key,
                            ]
                          : [child.key, node.parent?.key]
                      }
                    />
                  </Placement>,
                );

                let currentRowConfig: RowConfig = {
                  ...cloneDeep(rowConfig),
                  ...{
                    removable: type === 'FIELD' ? true : relationRemovable,
                  },
                };
                if (mode === 'list' && modifyRow && child.type === 'FIELD') {
                  currentRowConfig = {
                    ...currentRowConfig,
                    ...modifyRow({
                      index: index,
                      length: children.filter((c) => c.type !== 'BUTTON')
                        .length,
                      data: child.data,
                    }),
                  };
                }

                if (mode === 'tree' && modifyTreeNode) {
                  currentRowConfig = {
                    ...currentRowConfig,
                    ...modifyTreeNode({
                      // @ts-ignore
                      type: child.type,
                      namePath: child.namePath,
                      data: child.data,
                      isRoot: false,
                    }),
                  };
                }

                if (type === RELATION && collapsible) {
                  result.push(
                    <CollapseButton
                      collapse={collapse}
                      child={child}
                      toggleCollapse={toggleCollapse}
                      relationWidth={relationWidth}
                      hide={selfCollapse}
                      key={child.key + '-collapse'}
                    />,
                  );
                }

                result.push(
                  <span
                    data-height={child.height}
                    key={child.key.toString()}
                    style={{
                      ...createStyle(child.position!.x, child.position!.y),
                      ...{
                        width: type === FIELD ? 'auto' : relationWidth,
                        height: HEIGHT[type],
                        lineHeight: `${HEIGHT[type]}px`,
                      },
                      display: selfCollapse ? 'none' : undefined,
                    }}
                    className={`${prefixCls}-node-drag-container`}
                    tabIndex={child.key}
                  >
                    <div
                      className={`${prefixCls}-node-container ${prefixCls}-${type.toLowerCase()}`}
                    >
                      {type === RELATION ? (
                        <TreeRelation
                          key={`r-${child.namePath.join(',')}`}
                          child={child}
                          relation={relation}
                          disabled={Boolean(disabled)}
                          onMove={onMove}
                          thisKey={child.key}
                          namePath={child.namePath}
                          rowConfig={currentRowConfig}
                          onRemoveRelation={handleRemove}
                          relationRemovable={Boolean(relationRemovable)}
                          getChildrenData={(startNode) =>
                            tree.current.getChildrenData(startNode)
                          }
                          currentIndex={index}
                          actionsRender={actionsRender}
                        />
                      ) : (
                        <TreeField
                          key={`f-${child.namePath.join(',')}`}
                          fields={fields}
                          onCascade={onCascade}
                          cascades={cascades}
                          copyable={copyable}
                          child={child}
                          form={form}
                          disabled={Boolean(disabled)}
                          handleCopy={handleCopy}
                          handleRemove={handleRemove}
                          onMove={onMove}
                          thisKey={child.key}
                          namePath={child.namePath}
                          rowConfig={currentRowConfig}
                          onNodeFocus={onNodeFocus}
                          onFieldFocus={onFieldFocus}
                          currentIndex={index}
                          length={
                            children.filter((item) => item.type !== 'BUTTON')
                              .length
                          }
                          actionsRender={actionsRender}
                          onFieldChange={onFieldChange}
                        />
                      )}
                    </div>
                  </span>,
                );
                if (index === children.length - 2) {
                  /** 最后，给每个最后节点增加一个放置位置 */
                  result.push(
                    <Placement
                      key={`ep${child.key}`}
                      x={x}
                      y={
                        y + FIELD_HEIGHT + BETWEEN_Y / 2 - PLACEMENT_HEIGHT / 2
                      }
                      hide={selfCollapse}
                    >
                      <DropPlacement
                        order={index + 1}
                        parentKey={node.key}
                        relatedKeys={[child.key, node.parent?.key]}
                        namePath={child.namePath}
                      />
                    </Placement>,
                  );
                }
              }
            });
          }
        },
      },
      {
        order: 'bfs',
        renderFunction: (node) => {
          /**
           * 渲染线
           */
          if (mode === 'tree') {
            if (node.type === RELATION) {
              // 如果 hideButton 且 children 为空时会导致错误
              const { children, key } = node;
              const { x: fromX, y: fromY } = node.position!;
              if (children?.length && !tree.current.shouldCollapse(key)) {
                children.forEach((child) => {
                  const { type } = child;

                  const { x, y } = child.position!;
                  /** 连接到每个子节点的线 */
                  paths.push(
                    <SVGLine
                      key={`svg-${node.key}-${child.key}`}
                      fromX={fromX + relationWidth}
                      fromY={fromY + HEIGHT[RELATION] / 2}
                      toX={x}
                      toY={y + HEIGHT[type] / 2}
                    />,
                  );
                });
              }
            }
          } else {
            if (node.type === RELATION) {
              // 如果 hideButton 且 children 为空时会导致错误
              const { children } = node;
              if (children?.length) {
                children.forEach((child, index) => {
                  if (index === children.length - 1) return;
                  const { type } = child;

                  const { x, y } = child.position!;

                  const { y: toY } = children[index + 1].position!;

                  /** 连接到每个子节点的线 */
                  paths.push(
                    <ListLine
                      key={`svg-${node.key}-${child.key}`}
                      x={x}
                      fromY={y + HEIGHT[RELATION] / 2}
                      toY={toY + HEIGHT[type] / 2}
                    />,
                  );
                });
              }
            }
          }
          // 渲染线结束
        },
      },
    );
    result.push(
      <svg
        key="svg"
        style={{ pointerEvents: 'none', position: 'absolute', left: 0, top: 0 }}
        width={tree.current.getMaxLeft() + 20}
        height={height}
      >
        {paths}
      </svg>,
    );
    return (
      <div
        style={{
          height,
          width: '100%',
          paddingTop: 20,
          boxSizing: 'content-box',
          position: 'relative',
        }}
      >
        {result}
      </div>
    );
  };

  return (
    <div style={style} className={`${prefixCls}-container`}>
      <Provider key="rule-tree-provider" noDndProvider={noDndProvider}>
        <Form
          component="div"
          form={form}
          onValuesChange={_.debounce((changeValues) => {
            /** 因为 antd5 的 bug，该表单无法获得 values，改为 changeValues 赋值 */

            const currentData = cloneDeep(getPureData());

            Object.keys(changeValues).forEach((fieldPath) => {
              const val = changeValues[fieldPath];

              // fieldPath 处理:
              // example: 1.0 => 1.children.0 relation => relation
              const finalFiledPath =
                fieldPath === 'relation'
                  ? fieldPath
                  : fieldPath
                      .split('.')
                      .reduce((memo: string[], current) => {
                        return [...memo, 'children', current];
                      }, [])
                      .join('.');

              const finalVal =
                fieldPath === 'relation'
                  ? val
                  : {
                      ..._.get(currentData, finalFiledPath),
                      ...val,
                    };

              _.set(currentData, finalFiledPath, finalVal);
            });

            onChange?.(currentData);
          }, 100)}
        >
          <div
            style={{
              display: 'flex',
              flexGrow: 0,
              flexShrink: 0,
              position: 'relative',
              flexDirection: 'column',
            }}
          >
            {description && (
              <div className={`${prefixCls}-desc`}>{description}</div>
            )}
            {render()}
          </div>
          {extraDragItemRender &&
            extraDragItemRender(
              ({ data, onDragEnd, render: renderFunction }) => (
                <PureDragItem
                  data={data}
                  disabled={disabled}
                  key={JSON.stringify(data)}
                  onDrop={(_data, parentKey, order) => {
                    if (onDragEnd) {
                      onDragEnd(_data);
                    }
                    handleExternalDrop(_data, parentKey, order);
                  }}
                >
                  {renderFunction(data)}
                </PureDragItem>
              ),
            )}
        </Form>
      </Provider>
    </div>
  );
};

export default RuleTree;
