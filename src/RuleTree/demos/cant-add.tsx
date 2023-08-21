import { Form, Input, Select } from 'antd';
import React from 'react';
import RuleTree from 'react-rule-tree';

const { useForm } = Form;

export default () => {
  const [form] = useForm();
  return (
    <div style={{ padding: '20px 50px', backgroundColor: 'white' }}>
      <Form
        form={form}
        onValuesChange={(changeValues, values) => {
          console.log(values);
        }}
      >
        <Form.Item
          label="规则树"
          name="rule"
          initialValue={{
            relation: 'or',
            children: [
              {
                name: '123',
                sex: '0',
              },
              {
                relation: 'and',
                children: [
                  {
                    name: 'lululu',
                    sex: '1',
                  },
                ],
              },
            ],
          }}
          required
        >
          <RuleTree
            fields={[
              {
                name: 'name',
                rules: [
                  {
                    required: true,
                  },
                ],
                render: () => {
                  return <Input style={{ height: 32 }} />;
                },
              },
              {
                name: 'sex',
                initialValue: '0',
                render: () => {
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
              <Select>
                <Select.Option value="and">and</Select.Option>
                <Select.Option value="or">or</Select.Option>
              </Select>
            }
            canAddRule={(props) => {
              if (props.depth === 2) {
                return false;
              }
              return true;
            }}
          />
        </Form.Item>
      </Form>
    </div>
  );
};
