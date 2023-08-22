import React from 'react';
import { useDrop } from 'react-dnd';
import { TYPE } from '../contants';

interface Props {
  relatedKeys: number[];
  parentKey: number;
  order: number;
  namePath: string[];
  children?: any;
}

export const DropPlacement: React.FC<Props> = ({
  relatedKeys,
  children,
  parentKey,
  order,
  namePath,
}) => {
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: TYPE,
      collect: (monitor) => {
        return {
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        };
      },
      canDrop: (item: {
        thisKey: number;
        parentKey: number;
        order: number;
        namePath: string[];
        from: 'external' | 'internal';
        currentIndex: number;
      }) => {
        const { from } = item;
        if (from === 'internal') {
          if (
            namePath &&
            item.namePath &&
            namePath.join('.').startsWith(item.namePath.join('.'))
          ) {
            return false;
          }
          if (relatedKeys.includes(item.thisKey)) {
            return false;
          }
          return true;
        }
        if (from === 'external') {
          return true;
        }
        throw new Error(
          `Unexpect DragItem property from: ${from}. "from" should be "external" or "internal".`,
        );
      },
      drop: (item) => {
        return {
          ...item,
          parentKey,
          originOrder: order, // 保留原始的 order，跨层级拖拽时需要用到
          order: item.currentIndex < order ? order - 1 : order, // 向下拉的时候 order 需要-1
        };
      },
    }),
    [relatedKeys, parentKey, order, namePath],
  );

  let bgColor = '';
  if (isOver) {
    bgColor = canDrop ? 'rgb(24,144,255)' : 'red';
  } else {
    bgColor = 'rgb(145,213,255)';
  }

  return (
    <div
      ref={drop}
      style={{
        backgroundColor: bgColor,
        opacity: canDrop ? 1 : 0,
        borderRadius: '3px',
        border: 'dashed 1px rgb(24,144,255)',
        width: '100%',
        height: '100%',
      }}
      data-p={parentKey}
      data-r={relatedKeys.join(',')}
      data-namepath={namePath.join(',')}
    >
      {children}
    </div>
  );
};
