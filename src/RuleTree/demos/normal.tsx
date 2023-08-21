import ProCard from '@ant-design/pro-card';
import ProField from '@ant-design/pro-field';
import { Button, Checkbox, Form, Select, Space } from 'antd';
import { useRef, useState } from 'react';
import type { ActionType } from 'react-rule-tree';
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
        name: '1',
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
            ruleTreeRef.current.validate();
          }}
          onValuesChange={(changeValues, values) => {
            console.log(values);
            setValue(values);
          }}
        >
          <Form.Item label="规则树" name="rule" initialValue={value} required>
            <RuleTree
              actionRef={ruleTreeRef}
              onFieldChange={(...args) => {
                console.log({ args });
              }}
              fields={[
                {
                  name: 'name',
                  rules: [
                    {
                      required: true,
                    },
                  ],
                  initialValue: '1',
                  render: () => {
                    return (
                      <Select>
                        <Select.Option value="1">1111111</Select.Option>
                        <Select.Option value="2">2222222</Select.Option>
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
              text={{
                addRule: 'Add Rule',
                addRelation: 'Add Relation',
              }}
              cascades={['name']}
              onCascade={(ctx) => {
                console.log('onCascade');
                ctx.setFieldValue('sex', '1');
              }}
              shouldRemoveRelation={(removedNode) => {
                console.log(removedNode);
                return removedNode.data.name === '2';
              }}
            />
          </Form.Item>
          <Space>
            <Button htmlType="submit">提交</Button>
          </Space>
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
