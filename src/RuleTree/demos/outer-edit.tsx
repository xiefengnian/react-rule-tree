import ProField from '@ant-design/pro-field';
import { Button, Form, Input, Modal, Select, Tooltip } from 'antd';
import type { CSSProperties } from 'react';
import React, { useRef, useState } from 'react';
import type { ActionType, RenderContext } from 'react-rule-tree';
import RuleTree from 'react-rule-tree';

const { useForm } = Form;

const FieldToolTip: React.FC<{
  value?: any;
  onChange?: any;
  ctx: RenderContext;
  errorStyle: CSSProperties;
}> = ({ value, onChange, ctx, errorStyle }) => {
  return (
    <Tooltip
      color="red"
      title={ctx.getFieldError()[0]}
      visible={!!ctx.getFieldError().length}
    >
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
  const [key, setKey] = useState<number | null>(null);
  const [data, setData] = useState<any>();

  const [anotherForm] = useForm();
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div style={{ padding: '20px 50px', backgroundColor: 'white' }}>
        <Form
          form={form}
          onValuesChange={(changeValues, values) => {
            console.log('onValuesChange', values);
          }}
        >
          <Form.Item
            label="规则树"
            name="rule"
            initialValue={{ relation: 'and' }}
            required
          >
            <RuleTree
              actionRef={ruleTreeRef}
              onFieldFocus={(fieldKey, name, val, fieldData) => {
                setKey(fieldKey);
                setData(fieldData);
                setVisible(true);
              }}
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
                    const errorStyle: CSSProperties | false =
                      ctx.getFieldError().length && {
                        borderColor: 'red',
                        outline: 'none',
                      };
                    return <FieldToolTip errorStyle={errorStyle} ctx={ctx} />;
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
        <Modal
          visible={visible}
          onOk={() => {
            anotherForm.validateFields().then((values) => {
              ruleTreeRef.current.setData(key, values);
              setVisible(false);
            });
          }}
          onCancel={() => {
            setVisible(false);
          }}
          title="复杂的编辑流程"
        >
          关注的节点：
          <ProField
            mode="read"
            valueType="jsonCode"
            value={JSON.stringify(data)}
          />
          key为：{key}
          <Form form={anotherForm}>
            <Form.Item name="name" label="外部编辑name">
              <Input />
            </Form.Item>
            <Form.Item name="sex" label="外部编辑label">
              <Select>
                <Select.Option value="0">男</Select.Option>
                <Select.Option value="1">女</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};
