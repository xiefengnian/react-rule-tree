import React from 'react';
import type { Node, RuleTreeProps } from '../type';
type CollapseButtonProps = {
    toggleCollapse: (thisKey: number) => void;
    child: Node<any>;
    relationWidth: RuleTreeProps['relationWidth'];
    collapse: boolean;
    hide: boolean;
};
export declare const CollapseButton: React.FC<CollapseButtonProps>;
export {};
