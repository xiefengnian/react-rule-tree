import { Tree } from '../tree.ts';

describe('tree should work fine.', () => {
  it('preserve data', () => {
    const tree = Tree.initWithData(
      {
        relation: 'and',
        a: 1,
        b: 2,
        children: [
          {
            relation: 'or',
            c: 1,
          },
          {
            d: 2,
          },
          {
            d: 3,
            e: 1,
          },
          {
            d: 1,
            f: { foo: 'bar' },
            g: [1, '2'],
          },
        ],
      },
      false,
      ['d'],
    );
    const root = tree.getRoot();
    // root node
    expect(root.preserveData).toEqual({
      a: 1,
      b: 2,
    });
    expect(root.data).toEqual({
      relation: 'and',
    });

    // 0
    expect(root.children[0].preserveData).toEqual({
      c: 1,
    });
    expect(root.children[0].data).toEqual({
      relation: 'or',
    });

    // 1
    expect(root.children[1].preserveData).toEqual({});
    expect(root.children[1].data).toEqual({ d: 2 });

    // 2
    expect(root.children[2].preserveData).toEqual({
      e: 1,
    });
    expect(root.children[2].data).toEqual({
      d: 3,
    });

    // 3
    expect(root.children[3].preserveData).toEqual({
      f: { foo: 'bar' },
      g: [1, '2'],
    });
    expect(root.children[3].data).toEqual({
      d: 1,
    });

    // all
    expect(tree.getPureData()).toEqual({
      relation: 'and',
      a: 1,
      b: 2,
      children: [
        {
          relation: 'or',
          c: 1,
        },
        {
          d: 2,
        },
        {
          d: 3,
          e: 1,
        },
        {
          d: 1,
          f: { foo: 'bar' },
          g: [1, '2'],
        },
      ],
    });
  });
});

describe('tree get data should work fine', () => {
  const tree = Tree.initWithData(
    {
      relation: 'and',
      a: '1',
      children: [
        {
          relation: 'or',
          b: '1',
          children: [
            {
              foo: '1',
              bar: '1',
            },
          ],
        },
        {
          foo: '1',
          bar: '1',
        },
      ],
    },
    false,
    ['foo', 'bar'],
  );
  it('get all pure data', () => {
    expect(tree.getPureData()).toEqual({
      relation: 'and',
      a: '1',
      children: [
        {
          relation: 'or',
          b: '1',
          children: [
            {
              foo: '1',
              bar: '1',
            },
          ],
        },
        {
          foo: '1',
          bar: '1',
        },
      ],
    });
  });
  it('get children data from some node', () => {
    expect(tree.getChildrenData(tree.getRoot().children[0])).toEqual({
      relation: 'or',
      b: '1',
      children: [
        {
          foo: '1',
          bar: '1',
        },
      ],
    });
  });
  it('returns of getChildrenData from root should equal with returns of getPureData', () => {
    expect(tree.getChildrenData(tree.getRoot())).toEqual(tree.getPureData());
  });
});
