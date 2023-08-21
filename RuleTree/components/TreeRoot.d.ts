import React from 'react';
import type { Node, RowConfig, RuleTreeProps } from '../type';
import type { TreeRelationProps } from './TreeRelation';
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
export declare const TreeRoot: React.FC<TreeRootProps>;
export {};
