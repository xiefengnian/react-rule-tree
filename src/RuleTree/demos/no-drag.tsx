import { Input, Select } from 'antd';
import RuleTree from 'react-rule-tree';

export default () => {
  return (
    <div style={{ padding: '20px 50px', backgroundColor: 'white' }}>
      <RuleTree
        noDrag
        defaultValue={{
          relation: 'and',
          children: [
            {
              name: '不炫酷了',
            },
            {
              name: '没灵魂了',
            },
          ],
        }}
        onChange={(value) => {
          console.log(value);
        }}
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
        ]}
        relation={
          <Select>
            <Select.Option value="and">and</Select.Option>
            <Select.Option value="or">or</Select.Option>
          </Select>
        }
      />
    </div>
  );
};
