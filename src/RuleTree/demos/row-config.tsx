import ProField from '@ant-design/pro-field';
import { Form, Input, Popover, Select } from 'antd';
import React, { useState } from 'react';
import RuleTree from 'react-rule-tree';
import './common.less';

const { useForm } = Form;

const Com: React.FC<{ value?: any; onChange?: any; disabled?: boolean }> = (
  props,
) => {
  return (
    <Popover
      title={
        <Input
          value={props.value}
          onChange={(e) => {
            props.onChange(e.target.value);
          }}
        />
      }
    >
      {props.value}
    </Popover>
  );
};

export default () => {
  const [form] = useForm();
  const [value, setValue] = useState<Record<string, any>>({
    relation: 'and',
    children: [
      {
        name: '1',
      },
      {
        relation: 'and',
        children: [{ name: '2' }],
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
            setValue(values.rule);
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
                  initialValue: '1',
                  render: (ctx, node, current) => {
                    return <Com key={`test-${current.index}`} />;
                  },
                },
              ]}
              modifyTreeNode={({ type }) => {
                return {
                  className: type === 'FIELD' ? 'black' : '',
                  removable: type === 'RELATION',
                };
              }}
              relationWidth={132}
              relation={() => (
                <Select style={{ width: 72 }}>
                  <Select.Option value="and">AND</Select.Option>
                  <Select.Option value="or">OR</Select.Option>
                </Select>
              )}
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
