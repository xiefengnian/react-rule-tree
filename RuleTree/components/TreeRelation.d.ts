import React from 'react';
import type { Node, RowConfig, RuleTreeProps } from '../type';
import type { DragItemProps } from './DragItem';
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
export declare const TreeRelation: React.FC<TreeRelationProps & DragItemProps>;
