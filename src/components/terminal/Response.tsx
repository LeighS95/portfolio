import React from 'react';
import { Prefix } from './Prefix';

export const Response: React.FC<{ input: string, message?: string }> = ({ input, message }) => (
    <div>
        <Prefix />

        <div style={{ fontSize: 14, color: '#fff', fontFamily: 'var(--secondary-text)', }}>
            {input}
        </div>
        
        <div style={{ lineHeight: '8px', fontSize: 14, whiteSpace: 'pre-line', color: '#fff', fontFamily: 'var(--secondary-text)', }}>
            {message}
        </div>
    </div>
);