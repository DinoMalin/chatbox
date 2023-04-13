import React from 'react';
import clsx from 'clsx';

const CustomScrollBar = ({ className, ...rest }) => (
    <div
        className={clsx(
            'scrollbar-thin',
            'scrollbar-thumb-rounded-full',
            'scrollbar-track-rounded-full',
            'scrollbar-thumb-gray-500',
            'scrollbar-track-gray-100',
            className
        )}
        {...rest}
    />
);

export default CustomScrollBar;
