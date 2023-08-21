import ProField from '@ant-design/pro-field';
import { Button, Form, Input, Select } from 'antd';
import React, { useState } from 'react';
import RuleTree from 'react-rule-tree';
import './common.less';

const FormList = Form.List;

const { useForm } = Form;

export default () => {
  const [form] = useForm();
  const [value, setValue] = useState<Record<string, any>>({ relation: 'and' });
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
          <FormList name={'form-list'} initialValue={[value]}>
            {(fields, { add }) => {
              console.log(fields);
              return (
                <>
                  {fields.map((field) => {
                    console.log(fields);
                    return (
                      <Form.Item {...field}>
                        <RuleTree
                          fields={[
                            {
                              name: 'test',
                              render(ctx, node, current) {
                                return <Input />;
                              },
                            },
                          ]}
                          relation={
                            <Select>
                              <Select.Option value="and">and</Select.Option>
                              <Select.Option value="or">or</Select.Option>
                            </Select>
                          }
                        />
                      </Form.Item>
                    );
                  })}
                  <div>
                    <Button onClick={() => add({ relation: 'and' })}>
                      添加一项
                    </Button>
                  </div>
                </>
              );
            }}
          </FormList>
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
