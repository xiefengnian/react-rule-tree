import { Field } from 'rc-field-form';
import React from 'react';
import { RELATION_HEIGHT } from '../contants';
import type { Node, RowConfig, RuleTreeProps } from '../type';
import { createStyle } from '../utils';
import type { TreeRelationProps } from './TreeRelation';
import cx from 'classnames';

type TreeRootProps = {
  prefixCls: string;
  relationWidth: number;
  relation: RuleTreeProps['relation'];
  disabled: boolean;
  node: Node<any>;
  getChildrenData: TreeRelationProps['getChildrenData'];
  hide?: boolean;
  className?: string;
  rowConfig: RowConfig;
};

export const TreeRoot: React.FC<TreeRootProps> = ({
  prefixCls,
  relationWidth,
  relation,
  disabled,
  node,
  getChildrenData,
  hide,
  className,
  rowConfig,
}) => {
  return (
    <div
      className={cx(`${prefixCls}-node-root`, rowConfig.className, {
        [className]: className,
      })}
      style={{
        ...createStyle(node.position.x, node.position.y),
        ...{
          width: relationWidth,
          height: RELATION_HEIGHT,
          lineHeight: `${RELATION_HEIGHT}px`,
        },
        ...(hide
          ? {
              display: 'none',
            }
          : {}),
      }}
    >
      <Field
        name={['relation']}
        initialValue={node.data.relation}
        shouldUpdate={(prevValues, curValues) => {
          const namePath = 'relation';
          return prevValues[namePath] !== curValues[namePath];
        }}
      >
        {(props) => {
          const relationElement =
            typeof relation === 'function'
              ? relation({
                  depth: node.depth,
                  parent: null,
                  brothers: null,
                  selfData: node.data,
                  data: getChildrenData(node),
                })
              : relation;

          return React.cloneElement(relationElement, {
            disabled,
            ...relationElement.props,
            ...props,
          });
        }}
      </Field>
    </div>
  );
};
