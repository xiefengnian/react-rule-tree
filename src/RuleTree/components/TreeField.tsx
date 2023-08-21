import { CopyOutlined, DeleteOutlined, MenuOutlined } from '@ant-design/icons';
import _ from 'lodash';
import type { FormInstance } from 'rc-field-form';
import { Field } from 'rc-field-form';
import React from 'react';
import { prefixCls } from '..';
import type { FocusContext, Node, RenderContext, RowConfig, RuleTreeProps } from '../type';
import { Space } from './compatible/Space';
import type { DragItemProps } from './DragItem';
import { DragItem } from './DragItem';

type TreeFieldProps = Pick<
  RuleTreeProps,
  | 'fields'
  | 'onCascade'
  | 'cascades'
  | 'copyable'
  | 'onNodeFocus'
  | 'onFieldFocus'
  | 'onFieldChange'
> & {
  child: Node<any>;
  form: FormInstance;
  disabled: boolean;
  handleCopy: Function;
  handleRemove: Function;
  length: number;
  rowConfig: RowConfig;
  actionsRender: RuleTreeProps['actionsRender'];
};

export const TreeField: React.FC<TreeFieldProps & DragItemProps> = ({
  fields,
  onCascade,
  cascades,
  copyable,
  child,
  form,
  disabled,
  handleCopy,
  handleRemove,
  onNodeFocus,
  onFieldFocus,
  length,
  actionsRender,
  onFieldChange,
  ...dragItemProps
}) => {
  const { currentIndex, rowConfig } = dragItemProps;

  const hasAllow = Object.keys(rowConfig).filter((key) => rowConfig[key]).length > 0;

  const onCopy = () => {
    if (!disabled) {
      handleCopy(child.key);
    }
  };

  const onRemove = () => {
    if (!disabled) {
      handleRemove(child.key);
    }
  };

  let copyElement = (
    <CopyOutlined
      className={`${prefixCls}-action-copy`}
      onClick={onCopy}
      style={{ cursor: disabled ? 'not-allowed' : 'pointer', color: '#595959' }}
      rev={undefined}
    />
  );

  let removeElement = (
    <DeleteOutlined
      className={`${prefixCls}-action-remove`}
      onClick={onRemove}
      style={{ cursor: disabled ? 'not-allowed' : 'pointer', color: '#595959' }}
      rev={undefined}
    />
  );

  if (actionsRender) {
    const { remove: customRemoveElement, copy: customCopyElement } = actionsRender(
      {
        // @ts-ignore
        type: child.type,
        namePath: child.namePath,
        isRoot: !child.parent,
        data: child.data,
        disabled,
      },
      {
        remove: onRemove,
        copy: onCopy,
      },
    );
    if (customRemoveElement) {
      removeElement = customRemoveElement;
    }
    if (customCopyElement) {
      copyElement = customCopyElement;
    }
  }

  return (
    <DragItem
      {...dragItemProps}
      key={`d-${child.namePath.join(',')}`}
      rowConfig={rowConfig}
      dragger={
        <MenuOutlined
          className={`${prefixCls}-action-drag`}
          style={{ color: '#595959' }}
          rev={undefined}
        />
      }
    >
      <Space>
        <div
          onClick={() => {
            const context: FocusContext = {
              getData: () => child.data,
              getKey: () => child.key,
            };
            if (onNodeFocus) {
              onNodeFocus(context);
            }
          }}
        >
          <Space>
            {fields &&
              fields.map(({ render: renderComponent, name, rules }) => {
                const namePath = [child.namePath.join('.')].concat(name);
                const context: RenderContext = {
                  getFieldValue: (ctxName: string) => {
                    return form.getFieldValue([child.namePath.join('.')].concat(ctxName));
                  },
                  getFieldError: () => {
                    return form.getFieldError(namePath);
                  },
                  setFieldValue: (_name, _value) => {
                    form.setFields([
                      {
                        name: [child.namePath.join('.')].concat(_name),
                        value: _value,
                      },
                    ]);
                  },
                };
                let component = renderComponent(context, child, {
                  index: currentIndex,
                  length,
                });

                const isEmptyString = typeof component === 'string' && !component;
                if (isEmptyString) {
                  console.error(
                    '请不要再使用空字符串表达该项不渲染，使用 false 代替. 该语法将在下一个 major 版本彻底移除支持！',
                  );
                }
                const shouldNotRender = isEmptyString || component === false;
                return (
                  <div key={namePath.join('.')} data-namepath={namePath} style={{ minHeight: 32 }}>
                    <Field
                      name={namePath}
                      // 不渲染的field则不需要校验
                      rules={shouldNotRender ? undefined : rules}
                      initialValue={child.data[name]}
                      shouldUpdate={(prevValues, curValues) => {
                        return !_.isEqual(
                          _.get(prevValues, child.namePath),
                          _.get(curValues, child.namePath),
                        );
                      }}
                      // @ts-ignore
                      __should_not_render__={shouldNotRender}
                    >
                      {(props) => {
                        const cascadesOnChange = (_props) => {
                          const _propsValue =
                            // 有可能吐回 event 或者 value
                            typeof _props === 'object' && _props.target
                              ? _props.target.value
                              : _props;

                          onFieldChange?.(name, _propsValue, child.data[name], child);

                          props.onChange?.(_props); // onChange 必须在前，否则 onCascade 的值会延迟一次 onChange
                          if (onCascade && cascades?.includes(name)) {
                            onCascade(
                              {
                                getFieldError: context.getFieldError,
                                getFieldValue: context.getFieldValue,
                                setFieldValue: (_name, _value) => {
                                  child.data[_name] = _value;
                                },
                              },
                              name,
                            );
                            props.onChange?.(_props); // 如果在 onCascade 设置了 field，需要重新 onChange 一下 filed
                          }
                        };

                        const onClick = () => {
                          onFieldFocus?.(child.key, name, props.value, child.data);
                        };

                        if (typeof component === 'function') {
                          component = component(props.value, cascadesOnChange);
                          console.error(
                            '使用 render: ()=>(value,onChange)=>React.ReactElement 会导致渲染问题，复杂组件请使用：render : ()=> <YourComponent />',
                          );
                          return <div onClick={onClick}>{component}</div>;
                        }
                        if (React.isValidElement(component)) {
                          return (
                            <div onClick={onClick}>
                              {React.cloneElement(component as React.ReactElement, {
                                disabled,
                                ...(component as React.ReactElement).props,
                                ...(typeof component === 'function'
                                  ? {}
                                  : {
                                      value: props.value,
                                      onChange: cascadesOnChange,
                                    }),
                                key: `field-component-${namePath.join(',')}`,
                              })}
                            </div>
                          );
                        }
                        return <div onClick={onClick}>{component}</div>;
                      }}
                    </Field>
                  </div>
                );
              })}
          </Space>
        </div>
        {hasAllow && (
          <Space>
            {rowConfig.copyable && copyElement}
            {rowConfig.removable && removeElement}
          </Space>
        )}
      </Space>
    </DragItem>
  );
};
