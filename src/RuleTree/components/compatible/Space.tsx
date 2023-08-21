import React from 'react';

type SpaceProps = {
  children: React.ReactNode[];
};

export const Space: React.FC<SpaceProps> = ({ children }) => {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          height: '100%',
          rowGap: 8,
          columnGap: 8,
        }}
      >
        {children
          .filter((child) => !!child)
          .map((child, index) => {
            // @ts-ignore
            // eslint-disable-next-line
            const shouldNotRender = !!child?.props?.children?.props?.__should_not_render__;
            return (
              <div key={index} style={{ display: shouldNotRender ? 'none' : 'block' }}>
                {child}
              </div>
            );
          })}
      </div>
    </div>
  );
};
