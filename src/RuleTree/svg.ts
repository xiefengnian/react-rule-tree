import React from 'react';

// @ts-ignore
export const SVGLine: React.FC<{
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  radius?: number;
  stroke?: string;
}> = ({ fromX, fromY, toX, toY, radius, stroke = '#c7d0d9' }) => {
  const midX = fromX + (toX - fromX) / 2;

  if (fromY === toY) {
    return React.createElement('path', {
      d: `M${fromX},${fromY} L${toX},${toY}`,
      stroke,
      fill: 'none',
      style: { strokeWidth: 1 },
    });
  }

  const d = [];
  if (radius) {
    const r = toY > fromY ? radius : -radius;
    const absRadius = Math.abs(radius);
    d.push(`M${fromX},${fromY} L${midX - absRadius},${fromY}`);
    d.push(`C${midX - absRadius},${fromY} ${midX},${fromY} ${midX},${fromY + r}`);
    d.push(`L${midX},${toY - r}`);
    d.push(`C${midX},${toY - r} ${midX},${toY} ${midX + absRadius},${toY}`);
    d.push(`L${toX},${toY}`);
  } else {
    d.push(`M${fromX},${fromY} L${midX},${fromY}`);
    d.push(`M${midX},${fromY} L${midX},${toY}`);
    d.push(`M${midX},${toY} L${toX},${toY}`);
  }
  return React.createElement('path', {
    d: d.join(' '),
    stroke,
    fill: 'none',
    style: { strokeWidth: 1 },
  });
};

export const ListLine: React.FC<{
  x: number;
  fromY: number;
  toY: number;
  whiteGap?: number;
}> = ({ x, fromY, toY, whiteGap = 20 }) => {
  const midX = x - whiteGap;
  const d: string[] = [];
  d.push(`M${x},${fromY} L${midX},${fromY}`);
  d.push(`M${midX},${fromY} L${midX},${toY}`);
  d.push(`M${midX},${toY} L${x},${toY}`);
  return React.createElement('path', {
    d: d.join(' '),
    stroke: '#c7d0d9',
    fill: 'none',
    style: { strokeWidth: 1 },
  });
};
