import React from 'react';

export const Prefix = () => (
    <div
        style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'flex-end',
            fontSize: '12px',
            fontFamily: 'var(--secondary-text)',
        }}
    >
        <span style={{ color: 'lightblue' }}>
            ~{window.location.pathname ?? ''}
        </span>
        <span style={{ color: 'yellow' }}>
            main
        </span>
        <span style={{ color: 'var(--color-white-dimmed)', fontSize: 10, fontFamily: 'var(--secondary-text)',}}>
            {new Date(Date.now()).toLocaleTimeString()}
        </span>
    </div>
);