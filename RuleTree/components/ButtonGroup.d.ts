import React from 'react';
import type { RuleTreeProps } from '../type';
import 'rc-tooltip/assets/bootstrap.css';
type ButtonGroupProps = {
    key: any;
    parentKey: any;
    position: {
        x: number;
        y: number;
    };
    prefixCls: string;
    text: RuleTreeProps['text'];
    canAddRuleDisabled: boolean;
    canAddRuleGroupDisabled: boolean;
    handleAdd: Function;
    hideAddButton: boolean;
    hideAddGroupButton: boolean;
    className?: string;
    hide?: boolean;
};
export declare const ButtonGroup: React.FC<ButtonGroupProps>;
export {};
