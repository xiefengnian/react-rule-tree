---
demo:
  tocDepth: 4
title: Document
---

<code src="./demos/test.tsx"  background="#f5f5f5" title="基本使用" debug></code>

## 规则树组件

规则树组件用于创建规则，可以轻松嵌入到 Antd Form 表单体系使用。

数据格式示例如下：

```js
{
  relation : 'and',
  children : [
    {
      relation : 'or',
      children : [...]
    },
    {
      name : 'muyi',
      sex : '0',
    }
  ]
}

```

### 基本使用

<code src="./demos/normal.tsx"  background="#f5f5f5">基本使用</code>

在表单中使用时，值应当由表单管理：

```js

const [form] = useForm();

<Form form={form}>
  <Form.Item name="rule">
    <RuleTree />
  </Form.Item>
  <Button onClick={()=>form.setFieldsValue({rule : ...})}>修改规则树的值</Button>
</Form>
```

### Field 的复杂组件场景

如果规则编辑业务逻辑较为复杂，可以自行封装一个高阶组件，render 函数会这个组件传入 value 和 onChange 参数：

**语法：**`render: ((ctx: RenderContext, node:Node) => React.ReactElement)`

**示例：**

```js
<RuleTree fields={[
  {
    name : "foo",
    render : ()=> <YourComponent />;
  }
]} />

// 会给你的组件直接注入 value 和 onChange
const YourComponent = ({value,onChange})=>{
  return <Input value={value} onChange={onChange} />
}

```

### 自定义的 Select 组件

因为存在使用在 `next` 的场景，对 antd 支持效果不好，所以本项目尽可能减少对 antd 的使用。

同时部分国际化场景需要自定义文本等等，所以将 Select 暴露出来。

但是除了 antd 的 `<Select />` 我也懒得自己写一个，所以组件的 relation 需要自定义。你可以使用任意组件，只要支持 `value` 和 `onChange`。现在也支持使用 relation 渲染函数，让你的自定义更上一层楼。

<code src="./demos/html-select.tsx"  background="#f5f5f5">自定义 Select</code>

### 表单验证

在规则树中使用表单时，每次输入都会验证全部的表单项规则。但是如果你希望在某些时机手动触发表单规则验证，可以使用 `actionRef`。

```js
const ruleTreeRef = useRef<ActionType>();

<Form
  form={form}
  onFinish={() => {
    ruleTreeRef.current.validate();
  }}
>
  <Form.Item label="规则树" name="rule" initialValue={value} required>
    <RuleTree
      actionRef={ruleTreeRef}
      fields={[...]}
    />
  </Form.Item>
</Form>
```

同时，由于规则树不和 antd 强制绑定使用，需要自定义错误时的展示效果。`fieldError`将会由`fields.render` 的 `ctx` 参数下发。

如果环境支持 antd，建议使用 `Tooltip` 组件。

<code src="./demos/form-validate.tsx" background="#f5f5f5">表单验证</code>

### 条件渲染

通过 `fields.render`，可以按照所需条件渲染 `field`。

<code src="./demos/condition-render.tsx" background="#f5f5f5">条件渲染</code>

如果在某些场景下不需要某个 field，可以 return 一个空字符串，在渲染时将会做 filter 处理。

### 值关联

通过 `cascade` 和 `onCascade` 结合，可以在某个输入项改变时修改其他输入项。

<code src="./demos/value-cascade.tsx" background="#f5f5f5" >值关联</code>

### disabled

可以通过 `disabled` 禁止操作规则树。

<code src="./demos/disabled.tsx" background="#f5f5f5">禁止操作</code>

同时，你也可以按照自己的需要，在 `fields.render` 对单个输入项配置 `disabled`，详情请看你使用的组件库的文档。

### 可添加的条件判断

可以通过 `canAddRule` 和 `canAddRuleGroup` 来控制是否能继续添加规则。

<code src="./demos/cant-add.tsx" background="#f5f5f5">可添加的条件判断</code>

### 外部拖拽组件

<code src="./demos/external-drag.tsx" background="#f5f5f5">外部拖拽节点</code>

### 外部编辑

可以在外部对某个节点进行编辑，适用于复杂的编辑场景和编辑流程。

<code src="./demos/outer-edit.tsx" background="#f5f5f5">外部编辑</code>

### 关系节点可外部编辑

可以在外部对关系节点和节点进行一样编辑，适用于复杂的编辑场景和编辑流程。完全可以当作可编辑树组件使用

<code src="./demos/outer-relation-node-edit.tsx" background="#f5f5f5">关系节点外部编辑</code>

### 可复制

可以在设置 RuleTree.copyable 来允许复制 field。

<code src="./demos/copyable.tsx" background="#f5f5f5" >可复制</code>

### 额外的描述区域

可以用来展示规则的解析结果。

<code  src="./demos/description.tsx" background="#f5f5f5" >额外的描述区域</code>

### 不在 Form 表单中使用

总之有的人有这样的需求。这时候要用 `defaultValue` 提供一个初始值。

<code  src="./demos/without-form.tsx" background="#f5f5f5">不在 Form 表单中使用</code>

### 关闭拖拽

没有了拖拽，这个组件的灵魂就没有了，不炫酷了。但是有的人需要，我就勉为其难提供一下吧！

<code src="./demos/no-drag.tsx" background="#f5f5f5" >关闭拖拽</code>

### 可折叠

从来没想过这个组件会处理很大的数据，不过还是提供了这个功能。

因为组件是受控的，因此开启折叠会在关系节点引入一个脏数据：collapse。如果不需要可以手动清除。

<code src="./demos/collapse.tsx" background="#f5f5f5">可折叠</code>

### 关系节点可删除

用于后端初始化的数据只有关系节点但是无法删除的场景。

<code src="./demos/relation-remove.tsx" background="#f5f5f5" >关系节点可删除</code>

### action 自定义渲染

在 action 发生前也许你会需要进行一些二次确认之类的，所以 action 的自定义渲染也支持了。

尽情地发挥你的创造力，去创造出让设计师咂舌的作品吧！

<code src="./demos/action-render.tsx" background="#f5f5f5" >关系节点可删除</code>

### 更细致的节点设置

由于你们的自定义要求越来越来多，整理后统一使用 modifyTreeNode 进行收口。这个函数会告知你当前进行的节点，请返回你要对当前节点要进行的设置。

单个节点设置总是比全局设置的优先级高。

```ts
// 目前支持的配置
export type RowConfig = {
  draggable?: boolean; // 可拖拽
  copyable?: boolean; // 可复制
  removable?: boolean; // 可删除
  className?: string; // 类名
};
```

请在下面示例欣赏非洲 style ～ （同时你可以看到，节点不可删除，关系可删除，可以说是非常叛逆了）

<code src="./demos/row-config.tsx" background="#f5f5f5" >更细致的节点设置</code>

### 在 Form.List 中使用

<code src="./demos/within-form-list.tsx" background="#f5f5f5">在 FormList 中使用</code>

## API

### RuleTree

组件参数。

| 参数                          | 说明                                                                                     | 类型                                                                                                                                                          | 默认值                                             |
| ----------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| fields                        | 渲染到规则树节点的项，详情见 `Field`                                                     | `Field[]`                                                                                                                                                     | -                                                  |
| style                         | 容器的 css 样式                                                                          | `React.CSSProperties`                                                                                                                                         | -                                                  |
| disabled                      | 禁止操作，停止使用规则树全部功能                                                         | `boolean`                                                                                                                                                     | -                                                  |
| relation                      | 自定义渲染条件节点                                                                       | `React.ReactElement\| ((relationRenderProps: RelationRenderProps) => React.ReactElement)`                                                                     | -                                                  |
| relationWidth                 | 条件节点宽度                                                                             | `number`                                                                                                                                                      | 120                                                |
| defaultRelationValue          | 条件节点初始值                                                                           | `any`                                                                                                                                                         | `and`                                              |
| text                          | 自定义相关文本                                                                           | `{addRule?: string;addRelation?: string;}`                                                                                                                    | `{addRule: "添加规则";addRelation: "添加规则组";}` |
| cascades                      | 值关联依赖                                                                               | `string[]`                                                                                                                                                    | -                                                  |
| onCascade                     | 值关联触发的回调函数，参数见 `RenderContext`                                             | `(ctx: RenderContext, changedField:string) => void;`                                                                                                          | -                                                  |
| value                         | 值，在 form 表单中使用时，可以由 field 管理                                              | `{relation:"and" \| "or",children : Record<sting,any>[]}`                                                                                                     | -                                                  |
| onChange                      | 回调，在 form 表单中使用时，也不需要设置                                                 | `(value) => void;`                                                                                                                                            | -                                                  |
| extraDragItemRender           | 渲染外部拖拽节点，参数见 `CreateDragItem`                                                | `(createDragItem: CreateDragItem) => React.ReactElement;`                                                                                                     | -                                                  |
| canAddRule                    | 控制是否可以继续添加规则，返回 `"hide"` 的时候会隐藏该按钮                               | `(props: CanAndRuleProps) => boolean \| "hide";`                                                                                                              | -                                                  |
| canAddRuleGroup               | 控制是否可以继续添加规则组，返回 `"hide"` 的时候会隐藏该按钮                             | `(props: CanAndRuleProps) => boolean \| 'hide';`                                                                                                              | -                                                  |
| onNodeFocus                   | 当节点被关注时，可以用于外部修改 field 数据                                              | `(ctx: FocusContext) => void`                                                                                                                                 | -                                                  |
| onFieldFocus                  | 当节点的某个 field 被关注时，可以用于外部修改 field 数据                                 | `(key: number, name: string, value: string, fieldsData: Record<any, any>) => void;`                                                                           | -                                                  |
| actionRef                     | 对外暴露的操作方法                                                                       | `MutableRefObject<ActionType>`                                                                                                                                | -                                                  |
| description                   | 额外的描述区域                                                                           | `React.ReactNode`                                                                                                                                             | -                                                  |
| noDrag                        | 禁用拖拽                                                                                 | `boolean`                                                                                                                                                     | -                                                  |
| hideButton                    | 隐藏添加按钮                                                                             | `boolean`                                                                                                                                                     | -                                                  |
| defaultValue                  | 不在表单中使用时，使用 defaultValue 提供初始值                                           | `Record<string, any>`                                                                                                                                         | -                                                  |
| collapsible                   | 规则树是否可折叠                                                                         | `boolean`                                                                                                                                                     | -                                                  |
| relationRemovable`@deprecate` | 关系节点是否可以删除。计划废除，使用更通用的 modifyTreeNode 进行设置即可                 | `boolean`                                                                                                                                                     | -                                                  |
| mode                          | 兼容的 list 模式，不过数据基本格式仍然是 tree                                            | `"tree" \| "list"`                                                                                                                                            | `"tree"`                                           |
| modifyRow                     | （仅在 mode : "list" 生效）针对每行进行设置，优先级总是高于全局设置                      | `(currentRow:CurrentRow)=>RowConfig;`                                                                                                                         | -                                                  |
| modifyTreeNode                | （仅在 mode : "tree" 生效）针对每个节点进行设置（不包括 Button），优先级总是高于全局设置 | `(currentNode:CurrentNode) => RowConfig;`                                                                                                                     | -                                                  |
| noDndProvider                 | 与其他 react-dnd 产品共同使用时，可以使用一致的 Provider                                 | `boolean`                                                                                                                                                     | `false`                                            |
| actionsRender                 | 自定义操作区域，不返回则使用默认（注意 relation 没有 copy，返回了也没用）                | ` (currentNode: CurrentNode & { disabled: boolean },actions: {remove: Function;copy: Function;}) => {remove?: React.ReactElement;copy?: React.ReactElement;}` | -                                                  |
| onRemove                      | 删除事件，返回 true 则删除                                                               | `(type: Relation \| Field, namePath: string[], data: Record<any, any>) => boolean;`                                                                           | -                                                  |
| onFieldChange                 | 当某条规则的字段发生变化时                                                               | `(name: string, newValue: any, oldValue: any, node: Node<any>) => void;`                                                                                      | -                                                  |
| shouldRemoveRelation          | 在当前 field 被删除时是否应当顺便删除 relation 组                                        | `(node: Node<any>) => boolean;`                                                                                                                               | -                                                  |

### Field

渲染节点。

| 参数         | 说明                         | 类型                                                                                                        | 默认值 |
| ------------ | ---------------------------- | ----------------------------------------------------------------------------------------------------------- | ------ |
| name         | 字段名                       | `string`                                                                                                    | -      |
| rules        | 规则                         | 同 antd 的 `Rule[]`                                                                                         | -      |
| initialValue | 初始值                       | `any`                                                                                                       | -      |
| render       | 渲染函数，支持复杂的组件绑定 | `((ctx: RenderContext, node:Node,current: {length: number, index: number}) => React.ReactElement \| false)` | -      |

render 返回 `false` 则该项不渲染。

`fields` 的设置将会影响最后的数据结构。例如：

```js
// 假设进行了以下配置
<RuleTree
  fields={[
    {
      name : "foo"
      ...
    },
    {
      name : "bar"
      ...
    }
  ]}
/>

// 最终的数据结构将会是:

{
  relation : "and",
  children : [
    {
      "foo" : "value of foo",
      "bar" : "value of bar"
    }
  ]
}

```

### CreateDragItem

渲染规则树外的可拖拽节点。

| 参数      | 说明                             | 类型                                                | 默认值 |
| --------- | -------------------------------- | --------------------------------------------------- | ------ |
| data      | 数据，需要和`fields`中的结构一致 | `Record<string,any>`                                | -      |
| render    | 渲染节点                         | `(data: Record<string,any>) => React.ReactElement;` | -      |
| onDragEnd | 拖拽完成回调                     | `(data: Record<string,any>) => void;`               | -      |

### RenderContext

渲染时的上下文，提供渲染所需的属性和方法。

| 参数          | 说明                          | 类型                                  | 默认值 |
| ------------- | ----------------------------- | ------------------------------------- | ------ |
| getFieldValue | 获取字段值                    | `(name: string) => any;`              | -      |
| getFieldError | 获取由 `rules` 触发的字段错误 | `() => string[]`                      | -      |
| setFieldValue | 设置字段值                    | `(name: string, value: any) => void;` | -      |

### CanAndRuleProps

控制是否可以继续添加规则或规则组的参数。

| 参数     | 说明         | 类型                    | 默认值 |
| -------- | ------------ | ----------------------- | ------ |
| depth    | 节点深度     | `number`                | -      |
| parent   | 父节点数据   | `Record<string, any>`   | -      |
| brothers | 兄弟节点数据 | `Record<string, any>[]` | -      |

### RelationRenderProps

控制 relation 渲染的参数

| 参数                 | 说明                       | 类型                    | 默认值 |
| -------------------- | -------------------------- | ----------------------- | ------ |
| depth                | 节点深度                   | `number`                | -      |
| parent               | 父节点数据                 | `Record<string, any>`   | -      |
| brothers             | 兄弟节点数据               | `Record<string, any>[]` | -      |
| selfData`@deprecate` | 自身数据                   | `Record<string, any>`   | -      |
| data                 | 从自己开始的包含子节点数据 | `Record<string, any>`   | -      |

### ActionType

actionRef 的类型

| 参数     | 说明                                                               | 类型                  | 默认值 |
| -------- | ------------------------------------------------------------------ | --------------------- | ------ |
| validate | 主动验证规则树表单项，返回校验结果                                 | `() => Promise<any>`  | -      |
| setData  | 设置某个节点的值，以 key 为基准（key 可以在 `onNodeFocus` 中获得） | `(key, data) => void` | -      |
| reRender | 主动更新规则树                                                     | `()=>void`            | -      |

### RowConfig

| 参数      | 说明           | 类型      | 默认值           |
| --------- | -------------- | --------- | ---------------- |
| draggable | 行是否可以拖拽 | `boolean` | 默认跟随全局设置 |
| copyable  | 行是否可以复制 | `boolean` | 默认跟随全局设置 |
| removable | 行是否可以删除 | `boolean` | 默认跟随全局设置 |
| className | 类名           | `string`  | `""`             |

### CurrentRow

| 参数   | 说明         | 类型               |
| ------ | ------------ | ------------------ |
| index  | 当前列       | `number`           |
| length | 总的列数     | `number`           |
| data   | 当前节点数据 | `Record<any, any>` |

### CurrentNode

| 参数     | 说明                      | 类型               |
| -------- | ------------------------- | ------------------ |
| type     | 节点类型（不包括 Button） | `number`           |
| namePath | 当前节点的 namePath       | `string[]`         |
| data     | 当前节点数据              | `Record<any, any>` |
| isRoot   | 是否根节点                | `boolean`          |
