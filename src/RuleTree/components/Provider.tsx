import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const Provider: React.FC<{ noDndProvider: boolean }> = ({ children, noDndProvider }) => {
  return noDndProvider ? (
    <>{children}</>
  ) : (
    <DndProvider backend={HTML5Backend}>{children}</DndProvider>
  );
};
