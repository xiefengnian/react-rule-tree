import { DeleteOutlined, MenuOutlined } from '@ant-design/icons';
import { Field } from 'rc-field-form';
import React from 'react';
import { BUTTON } from '../contants';
import type { Node, RowConfig, RuleTreeProps } from '../type';
import type { DragItemProps } from './DragItem';
import { DragItem } from './DragItem';
import { Space } from './compatible/Space';

export type TreeRelationProps = {
  child: Node<any>;
  relation: RuleTreeProps['relation'];
  disabled: boolean;
  relationRemovable: boolean;
  onRemoveRelation: (key: number) => void;
  getChildrenData: (node: Node<any>) => any;
  rowConfig: RowConfig;
  actionsRender: RuleTreeProps['actionsRender'];
};

export const TreeRelation: React.FC<TreeRelationProps & DragItemProps> = ({
  child,
  relation,
  disabled,
  onRemoveRelation,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  relationRemovable,
  getChildrenData,
  rowConfig,
  actionsRender,
  ...dragItemProps
}) => {
  const { removable } = rowConfig;

  let removeElement = (
    <DeleteOutlined
      style={{ cursor: 'pointer' }}
      onClick={() => {
        onRemoveRelation(child.key);
      }}
      rev={undefined}
    />
  );

  if (actionsRender) {
    const { remove: customRemoveElement } = actionsRender(
      {
        // @ts-ignore
        type: child.type,
        namePath: child.namePath,
        isRoot: !child.parent,
        data: child.data,
        disabled,
      },
      {
        remove: () => {
          onRemoveRelation(child.key);
        },
      },
    );
    if (customRemoveElement) {
      removeElement = customRemoveElement;
    }
  }

  return (
    <DragItem
      {...dragItemProps}
      rowConfig={rowConfig}
      dragger={<MenuOutlined style={{ color: '#595959' }} rev={undefined} />}
    >
      <Space>
        <Field
          name={[child.namePath.join('.')].concat(['relation'])}
          initialValue={child.data.relation}
        >
          {(props) => {
            const relationElement =
              typeof relation === 'function'
                ? relation({
                    depth: child.depth,
                    parent: child.parent.data,
                    brothers: child.parent.children
                      .filter(
                        (_child) =>
                          _child.type !== BUTTON && _child.key !== child.key,
                      )
                      .map((_child) => ({ ..._child.data })),
                    data: getChildrenData(child),
                  })
                : relation;
            return React.cloneElement(relationElement, {
              disabled,
              ...relationElement.props,
              ...props,
            });
          }}
        </Field>
        {removable && removeElement}
      </Space>
    </DragItem>
  );
};
