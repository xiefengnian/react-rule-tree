import _ from 'lodash';

export const createStyle = (x: number, y: number): React.CSSProperties => {
  return {
    position: 'absolute',
    left: x,
    top: y,
  };
};

export const flatObject = (obj: Record<any, any>) => {
  const result: Record<string, any> = {};
  const fn = (item: Record<any, any>, parentKey: string) => {
    if (item.relation !== undefined) {
      result[(parentKey ? `${parentKey}.` : '') + 'relation'] = item.relation;
      item.children?.forEach((arrayItem: any, index: number) => {
        fn(
          arrayItem,
          (parentKey ? `${parentKey}.` : '') + 'children' + '.' + index,
        );
      });
    } else {
      for (const key in item) {
        if (item.hasOwnProperty(key)) {
          const val = item[key];
          result[(parentKey ? `${parentKey}.` : '') + key] =
            typeof val === 'object' ? _.cloneDeep(val) : val;
        }
      }
    }
  };
  fn(obj, '');
  return result;
};
