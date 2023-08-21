import { Form, Input, Select } from 'antd';
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
                name: 'name1',
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
                  if (name === 'love') {
                    return <div>is just a lie.</div>;
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
            cascades={['name', 'name1']}
            onCascade={(ctx, changedField) => {
              console.log(changedField);
              ctx.setFieldValue('sex', '1');
            }}
            relation={
              <Select>
                <Select.Option value="and">and</Select.Option>
                <Select.Option value="or">or</Select.Option>
              </Select>
            }
          />
        </Form.Item>
      </Form>
    </div>
  );
};
