import { flatObject } from '../utils';
import flat from 'flat';

describe('👻 flat object should work fine.', () => {
  const normalObject = {
    relation: 'and',
    children: [
      {
        relation: 'or',
        children: [
          {
            name: 1,
            sex: 2,
          },
        ],
      },
      {
        name: 1,
        sex: 2,
      },
    ],
  };

  const arrayObject = {
    relation: 'and',
    children: [
      {
        relation: 'or',
        children: [
          {
            name: [1, 2, 3],
            sex: [1, 2, 3],
          },
        ],
      },
      {
        name: [1, 2, 3],
        sex: [1, 2, 3],
      },
    ],
  };

  const objectObject = {
    relation: 'and',
    children: [
      {
        relation: 'or',
        children: [
          {
            name: {
              name: '1',
              sex: '2',
            },
            sex: [1, 2, 3],
          },
        ],
      },
      {
        name: {
          name: '1',
          sex: '2',
        },
        sex: [1, 2, 3],
      },
    ],
  };

  const nullObject = {
    relation: 'and',
    children: [
      {
        relation: null,
        children: [
          {
            name: {
              name: '1',
              sex: '2',
            },
            sex: [1, 2, 3],
          },
        ],
      },
      {
        name: {
          name: '1',
          sex: '2',
        },
        sex: [1, 2, 3],
      },
    ],
  };

  it('🥳 normally, should work like flat', () => {
    expect(flatObject(normalObject)).toEqual(flat(normalObject));
  });

  it('🥳 leaf array should not be flatted', () => {
    expect(flatObject(arrayObject)).toEqual({
      relation: 'and',
      'children.0.relation': 'or',
      'children.0.children.0.name': [1, 2, 3],
      'children.0.children.0.sex': [1, 2, 3],
      'children.1.name': [1, 2, 3],
      'children.1.sex': [1, 2, 3],
    });
  });

  it('🥳 leaf object should not be flatted', () => {
    expect(flatObject(objectObject)).toEqual({
      relation: 'and',
      'children.0.relation': 'or',
      'children.0.children.0.name': {
        name: '1',
        sex: '2',
      },
      'children.0.children.0.sex': [1, 2, 3],
      'children.1.name': {
        name: '1',
        sex: '2',
      },
      'children.1.sex': [1, 2, 3],
    });
  });

  it('🥳 null should be supported', () => {
    expect(flatObject(nullObject)).toEqual({
      relation: 'and',
      'children.0.relation': null,
      'children.0.children.0.name': {
        name: '1',
        sex: '2',
      },
      'children.0.children.0.sex': [1, 2, 3],
      'children.1.name': {
        name: '1',
        sex: '2',
      },
      'children.1.sex': [1, 2, 3],
    });
  });
});
