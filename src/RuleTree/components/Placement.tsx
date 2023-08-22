import React from 'react';
import { PLACEMENT_HEIGHT, PLACEMENT_WIDTH } from '../contants';
import { createStyle } from '../utils';

export const Placement: React.FC<{
  x: number;
  y: number;
  hide?: boolean;
  children: any;
}> = ({ x, y, children, hide = false }) => {
  return (
    <div
      style={{
        ...createStyle(x, y),
        ...{ width: PLACEMENT_WIDTH, height: PLACEMENT_HEIGHT },
        ...{ display: hide ? 'none' : undefined },
      }}
    >
      {children}
    </div>
  );
};
