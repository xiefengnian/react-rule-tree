import type { Rule } from 'rc-field-form/lib/interface';
import type React from 'react';
import type { MutableRefObject } from 'react';

export interface ItemType {
  name: string;
}

export type BoxType = {
  key: number;
  name: string;
};

export type EndDrop = {
  order: number;
  targetOrder: number;
};

export type Relation = 'RELATION';
export type Field = 'FIELD';
export type Button = 'BUTTON';

export type NodeType = Relation | Field | Button;

export type Node<D> = {
  data: D;
  children: Node<D>[];
  parent: Node<D>;
  key: number;
  depth: number;
  position?: {
    x: number;
    y: number;
  };
  height: number;
  namePath: string[];
  type: NodeType;
  collapse: boolean;
  preserveData: Record<any, any>;
  [key: string]: any;
};
export type DFSCallBack<T> = (node: T) => void;

export type TreeData = {
  relation: 'and' | 'or';
  key: number;
  children: TreeData | Field;
};

export type RenderOptions<D = any> = {
  order: 'dfs' | 'bfs';
  renderFunction: DFSCallBack<Node<D>>;
};

export type RenderContext = {
  getFieldValue: (name: string) => any;
  getFieldError: () => string[];
  setFieldValue: (name: string, value: any) => void;
};

type FieldCurrent = {
  index: number;
  length: number;
};

export type Fields = {
  name: string;
  rules?: Rule[];
  initialValue?: any;
  /** render 请勿使用 ()=> (value,onChange)=> React.ReactNode; 的语法, 复杂组件请使用 ()=>\<YourComponent /\>; 进行封装。 */
  render: (
    ctx: RenderContext,
    node: Node<any>,
    current: FieldCurrent,
  ) => React.ReactNode;
}[];

export type CreateDragItem<D = any> = (props: {
  data: D;
  onDragEnd?: (data: D) => void;
  render: (data: D) => React.ReactElement;
}) => React.ReactElement;

export type CanAndRuleProps = {
  depth: number;
  parent: Record<string, any>;
  brothers: Record<string, any>[];
};

export type ActionType = {
  validate: () => Promise<any>;
  setData: (key: number, data: Record<string, any>) => void;
  reRender: () => void;
};

export type FocusContext = {
  getData: () => Record<string, any>;
  getKey: () => number;
};

export type RelationRenderProps = CanAndRuleProps & {
  data: Record<string, any>;
};

export type RowConfig = {
  draggable?: boolean;
  copyable?: boolean;
  removable?: boolean;
  className?: string;
};

export type CurrentRow = {
  index: number;
  length: number;
  data: Record<any, any>;
};

export type CurrentNode = {
  type: Relation | Field;
  namePath: string[];
  data: Record<any, any>;
  isRoot: boolean;
};

export type RuleTreeProps = {
  fields: Fields;
  style?: React.CSSProperties;
  disabled?: boolean;
  relation:
    | React.ReactElement
    | ((relationRenderProps: RelationRenderProps) => React.ReactElement);
  relationWidth?: number;
  defaultRelationValue?: any;
  text?: {
    addRule?: string;
    addRelation?: string;
  };
  cascades?: string[];
  actionRef?: MutableRefObject<ActionType | undefined>;
  copyable?: boolean;
  onCascade?: (ctx: RenderContext, changedField?: string) => void;
  extraDragItemRender?: (createDragItem: CreateDragItem) => React.ReactElement;
  canAddRule?: (props: CanAndRuleProps) => boolean | 'hide';
  canAddRuleGroup?: (node: CanAndRuleProps) => boolean | 'hide';
  onNodeFocus?: (ctx: FocusContext) => void;
  description?: React.ReactNode;
  defaultValue?: Record<string, any>;
  noDrag?: boolean;
  hideButton?: boolean;
  collapsible?: boolean;
  /**
   * @deprecate 这个设置可以使用更通用的 modifyTreeNode 代替
   */
  relationRemovable?: boolean;
  onFieldFocus?: (
    key: number,
    name: string,
    value: string,
    fieldsData: Record<any, any>,
  ) => void;
  mode?: 'tree' | 'list';
  noDndProvider?: boolean;
  /**
   * 仅在 mode = "list" 时生效
   */
  modifyRow?: (currentRow: CurrentRow) => RowConfig;
  /**
   * 仅在 mode="tree" 时生效
   */
  modifyTreeNode?: (currentNode: CurrentNode) => RowConfig;
  actionsRender?: (
    currentNode: CurrentNode & { disabled: boolean },
    actions: {
      remove: () => void;
      copy: () => void;
    },
  ) => {
    remove?: React.ReactElement;
    copy?: React.ReactElement;
  };
  onRemove?: (
    type: Relation | Field,
    namePath: string[],
    data: Record<any, any>,
  ) => boolean;
  onFieldChange?: (
    name: string,
    newValue: any,
    oldValue: any,
    node: Node<any>,
  ) => void;
  shouldRemoveRelation?: (node: Node<any>) => boolean;
};
