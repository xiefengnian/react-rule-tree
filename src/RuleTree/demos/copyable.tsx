import ProCard from '@ant-design/pro-card';
import ProField from '@ant-design/pro-field';
import { Checkbox, Form, Input, Select } from 'antd';
import React, { useState } from 'react';
import RuleTree from 'react-rule-tree';

const { useForm } = Form;

const FiledCheckbox: React.FC<{ value?: any; onChange?: any }> = ({
  value,
  onChange,
}) => {
  return (
    <Checkbox
      checked={value}
      onChange={(e) => {
        onChange(e.target.checked);
      }}
    >
      {value ? '开启' : '关闭'}
    </Checkbox>
  );
};

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
              copyable
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
                  name: 'check',
                  render: () => {
                    return <FiledCheckbox />;
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
      <ProCard>
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
      </ProCard>
    </>
  );
};
