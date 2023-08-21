import _ from 'lodash';
import React from 'react';
import { useDrag } from 'react-dnd';
import { Space } from '../components/compatible/Space';
import { TYPE } from '../contants';
import type { RowConfig } from '../type';
import cx from 'classnames';

export interface DragItemProps {
  thisKey: number;
  onMove: (fromKey: number, toKey: number, order: number, originOrder: number) => void;
  namePath: string[];
  disabled?: boolean;
  rowConfig: RowConfig;
  currentIndex: number;
}

export const DragItem: React.FC<DragItemProps & { dragger: React.ReactNode }> = ({
  children,
  disabled,
  thisKey,
  namePath,
  onMove,
  dragger,
  currentIndex,
  rowConfig,
}) => {
  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: TYPE,
      item: { thisKey, namePath, from: 'internal', currentIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const result = monitor.getDropResult();
        if (result && item.from === 'internal') {
          const { parentKey, order, originOrder } = result as any;

          onMove(thisKey, parentKey, order, originOrder);
        }
      },
      canDrag: !disabled,
    }),
    [thisKey, namePath],
  );

  return (
    <div
      ref={dragPreview}
      style={{
        opacity: isDragging ? 0.5 : 1,
        width: '100%',
      }}
      data-thiskey={thisKey}
    >
      <div className={cx(rowConfig.className)} style={{ padding: '0px 8px', borderRadius: 3 }}>
        <Space>
          {rowConfig.draggable && <div ref={drag}>{dragger}</div>}
          <>{children}</>
        </Space>
      </div>
    </div>
  );
};

type PureDragItemProps = {
  data: any;
  onDrop: (data: Record<string, any>, parentKey: number, order: number) => void;
  disabled?: boolean;
};

export const PureDragItem: React.FC<PureDragItemProps> = ({ data, onDrop, disabled, children }) => {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: TYPE,
    item: { data, from: 'external' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const result: {
        parentKey: number;
        order: number;
      } = monitor.getDropResult();
      if (result) {
        onDrop(_.cloneDeep(item.data), result.parentKey, result.order);
      }
    },
    canDrag: !disabled,
  }));
  return (
    <div ref={dragPreview} style={{ opacity: isDragging ? '0.5' : 1 }}>
      <div ref={drag}>{children}</div>
    </div>
  );
};
