import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Drawer, Form, Input, Popconfirm, Space } from 'antd';
import _ from 'lodash';
import React, { useRef, useState } from 'react';
import type { ActionType } from 'react-rule-tree';
import RuleTree from 'react-rule-tree';

const NODE_FIELDS = [
  { value: 'name', label: '名称' },
  { value: 'section', label: '科' },
  { value: 'family', label: '属' },
];

// 初始化数据
export const initRuleData = [
  {
    name: '豹',
    section: '豹亚科',
    family: '大型猫科',
    children: [
      {
        name: '雪豹',
        section: '豹科',
        family: '豹属',
      },
    ],
  },
  {
    name: '猫',
    section: '猫亚科',
    family: '小型猫科',
  },
];

interface ItemProps {
  name?: string;
  section?: string;
  family?: string;
  relation?: ItemProps;
  node?: ItemProps;
  children?: ItemProps[];
}

// 获取配置初始化数据,适配EditableTree
const getInitConfigTreeData = (initData) => {
  return initData?.map((v) => {
    const { name, section, family, children } = v;
    const item: ItemProps = {};
    if (children && children.length) {
      item.children = getInitConfigTreeData([...children]);
      item.relation = { name, section, family };
    }
    return { node: { name, section, family }, ...item };
  });
};

const Node = (props) => {
  const { value, onChange } = props;
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const { name = '名称', section = '科', family = '属' } = value || {};
  const onConfirm = () => {
    form.validateFields().then((values) => {
      onChange(values);
      form.resetFields();
      setVisible(false);
    });
  };

  const extraAction = (
    <Space>
      <Button
        onClick={() => {
          form.resetFields();
          setVisible(false);
        }}
      >
        取消
      </Button>
      <Button type="primary" onClick={onConfirm}>
        确定
      </Button>
    </Space>
  );

  return (
    <>
      <Space align="baseline" style={{ whiteSpace: 'nowrap' }}>
        {name}、{section}、{family}
        <EditOutlined
          onClick={() => {
            form.setFieldsValue(value);
            setVisible(true);
          }}
        />
      </Space>
      {visible ? (
        <Drawer
          open={visible}
          destroyOnClose
          width="600px"
          onClose={() => {
            form.resetFields();
            setVisible(false);
          }}
          extra={extraAction}
          title="编辑"
        >
          <Form form={form} labelCol={{ span: 4 }}>
            {NODE_FIELDS.map((v) => (
              <Form.Item
                key={v.value}
                name={v.value}
                label={v.label}
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            ))}
          </Form>
        </Drawer>
      ) : null}
    </>
  );
};

const RelationNode = (props) => {
  const { value, onChange } = props;
  return (
    <div className="relation-node" style={{ whiteSpace: 'nowrap' }}>
      {!value?.isRoot ? (
        <Node value={value} onChange={onChange} editNodeFields={NODE_FIELDS} />
      ) : (
        <span>{value?.name}</span>
      )}
    </div>
  );
};

export default function OuterRelationNodeEdit() {
  const ruleTreeRef = useRef<ActionType>();
  const initData = {
    relation: { name: '猫科物种', isRoot: true },
    children: getInitConfigTreeData(initRuleData),
  };
  const [ruleValue, setRuleValue] = useState(initData);

  // 从数组指定位置递归删除某一项元素
  const deleteDataByPath = (childrenOrigin, path) => {
    const originData = _.cloneDeep(childrenOrigin);
    if (path && path.length === 1) {
      return _.remove(originData, (data, index) => {
        return Number(path[0]) !== index;
      });
    } else {
      const parentIndex = path.shift();
      const currentData = originData[parentIndex].children;
      originData[parentIndex].children = deleteDataByPath(currentData, path);
      return originData;
    }
  };

  // 删除节点数据确认
  const removeDataConfirm = async (currentNode) => {
    const { children: childrenOrigin = [] } = ruleValue || {};
    const { namePath } = currentNode;
    const newChildren = deleteDataByPath(childrenOrigin, namePath);
    setRuleValue({ ...initData, children: newChildren });
  };

  const actionsRender = (currentNode) => ({
    remove: (
      <Space size={6}>
        <Popconfirm
          title="确定删除该条数据以及子数据"
          onConfirm={() => {
            removeDataConfirm(currentNode);
          }}
        >
          <DeleteOutlined />
        </Popconfirm>
      </Space>
    ),
  });

  return (
    <RuleTree
      actionRef={ruleTreeRef}
      value={ruleValue}
      style={{ marginLeft: '-160px', overflowY: 'auto' }}
      fields={[
        {
          name: 'node',
          render: () => <Node editNodeFields={NODE_FIELDS} />,
        },
      ]}
      onChange={(value) => setRuleValue(value)}
      relation={() => <RelationNode />}
      actionsRender={actionsRender}
      id="rule"
      relationWidth={260}
      modifyTreeNode={() => {
        return {
          removable: true,
        };
      }}
      text={{ addRule: '添加一列数据', addRelation: '添加一组数据' }}
    />
  );
}
