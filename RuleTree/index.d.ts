import React from 'react';
import './index.less';
import './tree';
import type { RuleTreeProps } from './type';
export declare const prefixCls = "techui-rule-tree";
declare const RuleTree: React.FC<RuleTreeProps & {
    onChange?: (value: any) => void;
    value?: any;
    id?: string;
}>;
export default RuleTree;
