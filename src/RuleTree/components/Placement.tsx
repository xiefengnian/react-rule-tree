import React from 'react';
import { createStyle } from '../utils';
import { PLACEMENT_WIDTH, PLACEMENT_HEIGHT } from '../contants';

export const Placement: React.FC<{ x: number; y: number; hide?: boolean }> = ({
  x,
  y,
  children,
  hide = false,
}) => {
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
