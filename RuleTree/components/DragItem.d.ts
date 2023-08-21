import React from 'react';
import type { RowConfig } from '../type';
export interface DragItemProps {
    thisKey: number;
    onMove: (fromKey: number, toKey: number, order: number, originOrder: number) => void;
    namePath: string[];
    disabled?: boolean;
    rowConfig: RowConfig;
    currentIndex: number;
}
export declare const DragItem: React.FC<DragItemProps & {
    dragger: React.ReactNode;
}>;
type PureDragItemProps = {
    data: any;
    onDrop: (data: Record<string, any>, parentKey: number, order: number) => void;
    disabled?: boolean;
};
export declare const PureDragItem: React.FC<PureDragItemProps>;
export {};
