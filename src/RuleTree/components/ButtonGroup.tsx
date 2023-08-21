import React from 'react';
import Tooltip from 'rc-tooltip';
import { BUTTON, BUTTON_HEIGHT, BUTTON_WIDTH, WIDTH } from '../contants';
import type { RuleTreeProps } from '../type';
import { createStyle } from '../utils';
import { PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import cx from 'classnames';
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

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  parentKey,
  position,
  prefixCls,
  text,
  canAddRuleDisabled,
  canAddRuleGroupDisabled,
  handleAdd,
  hideAddButton,
  hideAddGroupButton,
  hide = false,
}) => {
  return (
    <div
      style={{
        ...createStyle(position.x, position.y),
        ...{
          width: BUTTON_WIDTH,
          height: BUTTON_HEIGHT,
          lineHeight: `${BUTTON_HEIGHT}px`,
        },
        ...{ display: hide ? 'none' : undefined },
      }}
      className={`${prefixCls}-node-button-group`}
    >
      <div className={`${prefixCls}-button-fix-size`}>
        {!hideAddButton && (
          <Tooltip overlay={text?.addRule || '添加规则'} placement="top">
            <div
              style={{
                cursor: canAddRuleDisabled ? 'not-allowed' : 'pointer',
              }}
              className={`${prefixCls}-button-left`}
              onClick={() => !canAddRuleDisabled && handleAdd(parentKey, 'FIELD')}
            >
              <PlusOutlined
                style={{
                  width: WIDTH[BUTTON] / 2,
                  color: '#c7d0d9',
                  display: 'flex',
                  justifyContent: 'center',
                }}
                rev={undefined}
              />
            </div>
          </Tooltip>
        )}
        {!hideAddGroupButton && (
          <Tooltip overlay={text?.addRelation || '添加规则组'} placement="top">
            <div
              style={{
                cursor: canAddRuleGroupDisabled ? 'not-allowed' : 'pointer',
              }}
              className={cx(`${prefixCls}-button-right`, {
                [`no-border`]: hideAddButton,
              })}
              onClick={() => !canAddRuleGroupDisabled && handleAdd(parentKey, 'RELATION')}
            >
              <PlusCircleOutlined
                style={{
                  width: WIDTH[BUTTON] / 2,
                  color: '#c7d0d9',
                  display: 'flex',
                  justifyContent: 'center',
                }}
                rev={undefined}
              />
            </div>
          </Tooltip>
        )}
      </div>
    </div>
  );
};
