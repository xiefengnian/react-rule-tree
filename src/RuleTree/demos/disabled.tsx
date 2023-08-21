import { Form, Input, Select, Switch } from 'antd';
import React, { useState } from 'react';
import RuleTree from 'react-rule-tree';

const { useForm } = Form;

export default () => {
  const [form] = useForm();
  const [disabled, setDisabled] = useState(true);
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
            hideButton={disabled}
            canAddRule={() => 'hide'}
            canAddRuleGroup={() => false}
            disabled={disabled}
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
                    <Select disabled>
                      <Select.Option value="0">男</Select.Option>
                      <Select.Option value="1">女</Select.Option>
                    </Select>
                  );
                },
              },
            ]}
            relation={() => {
              return (
                <Select disabled>
                  <Select.Option value="and">and</Select.Option>
                  <Select.Option value="or">or</Select.Option>
                </Select>
              );
            }}
          />
        </Form.Item>
        disabled 开关：
        <Switch
          defaultChecked
          onChange={() => {
            setDisabled(!disabled);
          }}
        />
      </Form>
    </div>
  );
};
