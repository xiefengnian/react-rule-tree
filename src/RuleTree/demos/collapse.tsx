import ProField from '@ant-design/pro-field';
import { Form, Input, Select } from 'antd';
import React, { useState } from 'react';
import RuleTree from 'react-rule-tree';

const { useForm } = Form;

export default () => {
  const [form] = useForm();
  const [value, setValue] = useState<Record<string, any>>({
    relation: 'or',
    collapse: false,
    children: [
      {
        relation: 'and',
        collapse: false,
        children: [
          {
            name: '点下一个关系节点的+试试',
          },
        ],
      },
      {
        relation: 'and',
        collapse: true,
        children: [
          {
            name: '',
          },
          {
            relation: 'and',
            collapse: false,
            children: [
              {
                name: '',
              },
              {
                relation: 'and',
                collapse: true,
                children: [
                  {
                    name: '',
                  },
                  {
                    relation: 'and',
                    collapse: false,
                    children: [
                      {
                        name: '',
                      },
                    ],
                  },
                  {
                    relation: 'and',
                    collapse: false,
                    children: [
                      {
                        name: '',
                      },
                    ],
                  },
                ],
              },
              {
                relation: 'and',
                collapse: false,
                children: [
                  {
                    name: '',
                  },
                  {
                    relation: 'and',
                    collapse: false,
                    children: [
                      {
                        name: '',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
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
              collapsible
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
              relation={
                <Select style={{ width: 80 }}>
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
