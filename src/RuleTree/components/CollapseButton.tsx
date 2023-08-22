import { MinusCircleFilled, PlusCircleFilled } from '@ant-design/icons';
import cx from 'classnames';
import React from 'react';
import type { Node } from '../type';

type CollapseButtonProps = {
  toggleCollapse: (thisKey: number) => void;
  child: Node<any>;
  relationWidth: number;
  collapse: boolean;
  hide: boolean;
};

export const CollapseButton: React.FC<CollapseButtonProps> = ({
  toggleCollapse,
  child,
  relationWidth,
  collapse,
  hide,
}) => {
  return (
    <div
      onClick={() => {
        toggleCollapse(child.key);
      }}
      style={{
        position: 'absolute',
        left: child.position!.x + relationWidth + 4,
        top: child.position!.y + 20 - 11,
        zIndex: 10,
        display: hide ? 'none' : undefined,
      }}
      className={cx(
        'techui-rule-tree-collapse',
        `techui-rule-tree-collapse-${child.namePath.join('-')}`,
      )}
    >
      {collapse ? (
        <PlusCircleFilled style={{ color: '#8c8c8c' }} rev={undefined} />
      ) : (
        <MinusCircleFilled style={{ color: '#8c8c8c' }} rev={undefined} />
      )}
    </div>
  );
};
