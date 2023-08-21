import { Button, Form, Input, Select, Space } from 'antd';
import React from 'react';
import RuleTree from 'react-rule-tree';

const { useForm } = Form;

export default () => {
  const [form] = useForm();
  const externalData = [
    {
      name: 'fooooo',
      sex: '0',
    },
    {
      name: 'bar',
      sex: '1',
    },
  ];
  return (
    <div style={{ padding: '20px 50px', backgroundColor: 'white' }}>
      <Form
        form={form}
        onFinish={() => {}}
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
                sex: '1',
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
              <Select>
                <Select.Option value="and">and</Select.Option>
                <Select.Option value="or">or</Select.Option>
              </Select>
            }
            text={{
              addRule: 'Add Rule',
              addRelation: 'Add Relation',
            }}
            cascades={['name']}
            onCascade={(ctx) => {
              console.log('onCascade');
              ctx.setFieldValue('sex', '1');
            }}
            extraDragItemRender={(createDragItem) => {
              return (
                <div>
                  <Space direction="vertical">
                    {externalData.map((data) => (
                      <Space key={JSON.stringify(data)}>
                        外部数据:
                        {createDragItem({
                          data,
                          onDragEnd: () => {
                            console.log('end');
                          },
                          render: (_data) => (
                            <Button>{JSON.stringify(_data)}</Button>
                          ),
                        })}
                      </Space>
                    ))}
                  </Space>
                </div>
              );
            }}
          />
        </Form.Item>
        <Button htmlType="submit">提交</Button>
      </Form>
    </div>
  );
};
