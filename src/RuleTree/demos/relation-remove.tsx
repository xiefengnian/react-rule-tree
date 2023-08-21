import ProField from '@ant-design/pro-field';
import { Form, Input, Select } from 'antd';
import React, { useState } from 'react';
import RuleTree from 'react-rule-tree';

const { useForm } = Form;

export default () => {
  const [form] = useForm();
  const [value, setValue] = useState<Record<string, any>>({
    relation: 'or',
    children: [
      {
        relation: 'and',
      },
      {
        relation: 'and',
      },
      {
        relation: 'and',
      },
    ],
  });
  return (
    <>
      <div style={{ padding: '20px 50px', backgroundColor: 'white' }}>
        <Form
          form={form}
          onValuesChange={(changeValues, values) => {
            console.log(values);
            setValue(values);
          }}
        >
          <Form.Item label="规则树" name="rule" initialValue={value} required>
            <RuleTree
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
              ]}
              modifyTreeNode={() => {
                return {
                  removable: true,
                };
              }}
              relationWidth={144}
              relation={
                <Select style={{ width: 84 }}>
                  <Select.Option value="and">and</Select.Option>
                  <Select.Option value="or">or</Select.Option>
                </Select>
              }
            />
          </Form.Item>
        </Form>
      </div>
      <ProField
        fieldProps={{
          style: {
            width: '100%',
          },
        }}
        mode="read"
        text={JSON.stringify(value)}
        valueType="jsonCode"
      />
    </>
  );
};
