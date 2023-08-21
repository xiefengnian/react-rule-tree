import ProField from '@ant-design/pro-field';
import { Button, Form, Input, Popover, Select } from 'antd';
import React, { useRef, useState } from 'react';
import type { ActionType } from 'react-rule-tree';
import RuleTree from 'react-rule-tree';
import './common.less';

const FormList = Form.List;

const { useForm } = Form;

const Com: React.FC<{
  value?: any;
  onChange?: any;
  disabled?: boolean;
  errorMsg: string[];
}> = (props) => {
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
  const actionRef = useRef<ActionType>();
  const [value, setValue] = useState<Record<string, any>>({
    relation: 'and',
    collapse: false,
    children: [
      {
        name: '1',
      },
      {
        name: '2',
      },
      {
        relation: 'and',
        collapse: true,
        children: [
          {
            name: 'foo',
          },
          {
            name: 'bar',
          },
          {
            relation: 'and',
            collapse: false,
            children: [
              {
                name: '1',
              },
            ],
          },
          {
            relation: 'and',
            collapse: false,
            children: [
              {
                name: '1',
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
          }}
        >
          <FormList
            name={'item'}
            initialValue={[{ relation: 'and', children: [] }]}
          >
            {(fields, { add }) => {
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
                      add
                    </Button>
                  </div>
                </>
              );
            }}
          </FormList>
        </Form>
      </div>
      <button onClick={() => actionRef.current.reRender()}>re render</button>
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
