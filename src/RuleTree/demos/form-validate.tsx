import { Button, Form, Input, Select, Tooltip } from 'antd';
import type { CSSProperties } from 'react';
import React, { useRef } from 'react';
import type { ActionType } from 'react-rule-tree';
import RuleTree from 'react-rule-tree';

const { useForm } = Form;

type TooltipInputType = {
  title?: string;
  visible: boolean;
  value?: any;
  onChange?: any;
  errorStyle: CSSProperties;
};

const TooltipInput: React.FC<TooltipInputType> = ({
  title,
  visible,
  value,
  onChange,
  errorStyle,
}) => {
  return (
    <Tooltip color="red" title={title} visible={visible}>
      <Input
        value={value}
        onChange={onChange}
        style={{ height: 32, ...errorStyle }}
      />
    </Tooltip>
  );
};

export default () => {
  const [form] = useForm();

  const ruleTreeRef = useRef<ActionType>();

  return (
    <>
      <div style={{ padding: '20px 50px', backgroundColor: 'white' }}>
        <Form
          form={form}
          onFinish={async () => {
            try {
              await ruleTreeRef.current?.validate();
            } catch (error) {
              console.log(error);
              ruleTreeRef.current?.reRender();
            }
          }}
          onValuesChange={(changeValues, values) => {
            console.log('onValuesChange', values);
          }}
        >
          <Form.Item
            label="规则树"
            name="rule"
            initialValue={{
              relation: 'and',
              children: [{ name: '删掉我', sex: '' }],
            }}
            required
          >
            <RuleTree
              actionRef={ruleTreeRef}
              fields={[
                {
                  name: 'name',
                  rules: [
                    {
                      required: true,
                      message: '必填项！',
                    },
                  ],
                  initialValue: '',
                  render: (ctx) => {
                    const errorStyle: CSSProperties = ctx.getFieldError().length
                      ? {
                          borderColor: 'red',
                          outline: 'none',
                        }
                      : {};
                    // 受 React 更新策略的限制，非顶级 Input 需要封装为组件
                    return (
                      <TooltipInput
                        errorStyle={errorStyle}
                        title={ctx.getFieldError()[0]}
                        visible={!!ctx.getFieldError().length}
                      />
                    );
                  },
                },
                {
                  name: 'sex',
                  initialValue: '0',
                  render: (ctx) => {
                    const name = ctx.getFieldValue('name');
                    if (name === '1024') {
                      return <div>ho!!</div>;
                    }
                    return (
                      <Select>
                        <Select.Option value="0">男</Select.Option>
                        <Select.Option value="1">女</Select.Option>
                      </Select>
                    );
                  },
                },
              ]}
              relation={
                <Select style={{ width: 60 }}>
                  <Select.Option value="and">and</Select.Option>
                  <Select.Option value="or">or</Select.Option>
                </Select>
              }
            />
          </Form.Item>
          <Button htmlType="submit">提交</Button>
        </Form>
      </div>
    </>
  );
};
