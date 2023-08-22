import { Form, Input, Select } from 'antd';
import React, { useRef, useState } from 'react';
import type { ActionType } from 'react-rule-tree';
import RuleTree from 'react-rule-tree';

const { useForm } = Form;

export default () => {
  const [form] = useForm();
  const [value, setValue] = useState<Record<string, any>>({
    relation: 'or',
    children: [
      {
        name: '123',
        sex: '1',
      },
    ],
  });

  const ruleTreeRef = useRef<ActionType>();

  return (
    <>
      <div style={{ padding: '20px 50px', backgroundColor: 'white' }}>
        <Form
          form={form}
          onFinish={() => {
            ruleTreeRef.current?.validate();
          }}
          onValuesChange={(changeValues, values) => {
            console.log(values);
            setValue(values);
          }}
        >
          <Form.Item label="规则树" name="rule" initialValue={value} required>
            <RuleTree
              actionRef={ruleTreeRef}
              description={
                <div style={{ lineHeight: '32px' }}>
                  这是一个额外的 32px 高的区域
                </div>
              }
              fields={[
                {
                  name: 'name',
                  rules: [
                    {
                      required: true,
                    },
                  ],
                  initialValue: '',
                  render: (ctx) => {
                    const errorStyle = ctx.getFieldError().length && {
                      borderColor: 'red',
                    };
                    return <Input style={{ height: 32, ...errorStyle }} />;
                  },
                },
                {
                  name: 'sex',
                  initialValue: '0',
                  render: () => (
                    <Select>
                      <Select.Option value="0">男</Select.Option>
                      <Select.Option value="1">女</Select.Option>
                    </Select>
                  ),
                },
              ]}
              relation={
                <Select style={{ width: 80 }}>
                  <Select.Option value="and">and</Select.Option>
                  <Select.Option value="or">or</Select.Option>
                </Select>
              }
              relationWidth={120}
            />
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
