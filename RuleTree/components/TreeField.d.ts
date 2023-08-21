import type { FormInstance } from 'rc-field-form';
import React from 'react';
import type { Node, RowConfig, RuleTreeProps } from '../type';
import type { DragItemProps } from './DragItem';
type TreeFieldProps = Pick<RuleTreeProps, 'fields' | 'onCascade' | 'cascades' | 'copyable' | 'onNodeFocus' | 'onFieldFocus' | 'onFieldChange'> & {
    child: Node<any>;
    form: FormInstance;
    disabled: boolean;
    handleCopy: Function;
    handleRemove: Function;
    length: number;
    rowConfig: RowConfig;
    actionsRender: RuleTreeProps['actionsRender'];
};
export declare const TreeField: React.FC<TreeFieldProps & DragItemProps>;
export {};
