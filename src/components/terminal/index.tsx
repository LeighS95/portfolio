import React, { useState, useEffect } from 'react';
import { Response } from './Response';

const helpText = `
    Here are some useful commands:\n\n
    home \n\n
    show <name>\n
        --about\n
        --blog\n
        --contact\n\n
    use mouse (Change to miuse controls)\n\n
    clear (clear cli)\n
`;

const suggestions = [
    'Tell me about yourself',
    'What skills do you have?',
    'How many years experience do you have?',
    // 'show --about',
    // 'show --blog',
    // 'show --contact',
    // 'use mouse',
    // '--help',
];

const answers = [
    'I am a software engineer with 5+ years experience, I have worked with startups and global enterprises working on a wide range of solutions both in desgin and development.',
    'I have a number of skills from UI/UX and drawing, to being a polyglot of programming languages, specialising mainly in javascript/typescript but also know python, flutter and more and how to architect and implement solutions effectively.',
    'I have over 5 year experience in software, and over 3 year experience in design.',
];

const findSuggestion = (input: string) => {
    const match = suggestions.find(x => x.startsWith(input));
    return match || '';
}

const selectResponse = (input: string) => {
    if (suggestions.includes(input)) {
        const index = suggestions.findIndex(x => x == input);

        return {
            input,
            message: answers[index],
        }
    }

    const command = input.split(' ')[0];
    const args = input.split(' ')[1];

    switch (command) {
        case '--help':
            return {
                input,
                message: helpText,
            };
        case 'home':
            return window.location.href = '/';
        case 'show':
            return window.location.href = args.replace('--', '');
        case 'use':
            localStorage.setItem('mode', 'mouse');
            return window.location.reload();
        default:
            return {
                input: '',
                message: `Sorry I have no response to "${input}"`,
            }
    }
}

export const Terminal: React.FC = () => {
    const [input, setInput] = useState<string>('');
    const [suggestion, setSuggestion] = useState<string>('');
    const [history, setHistory] = useState<{ input: string, message?: string }[]>([
        { input: 'What do you want to know?', message: '' },
    ]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        setInput(value);
        setSuggestion(findSuggestion(value));
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const { key } = e;

        if (key === 'Tab' && suggestion) {
            e.preventDefault();
            setInput(suggestion);
            return setSuggestion('');
        }

        if (key === 'Enter' && input.length > 1) {
            if (input.trim() == 'clear') {
                setHistory([]);
            } else {
                const response = selectResponse(input);
                setHistory(() => ([...history, response]));
            }

            setInput('');
        }
    }

    useEffect(() => {
        const cli = document.getElementById('cli');

        cli.scrollTop = cli.scrollHeight;
    }, [history]);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: 240,
                width: '80%',
                minWidth: 240,
                maxWidth: 880,
                borderRadius: 16,
                padding: 16,
                backgroundColor: 'rgba(29, 29, 29, 0.4)',
                backdropFilter: 'blur(12px)',
                fontFamily: 'var(--secondary-text)',
            }}
        >

            <div
                id="cli"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 2,
                    overflowY: 'auto',
                    paddingBottom: 8,
                    fontFamily: 'var(--secondary-text)',
                }}
            >
                {history.map(({ input, message }, i) => (
                    <div key={i}>
                        <Response input={input} message={message} />
                    </div>
                ))}
            </div>

            <div style={{ position: 'relative', display: 'flex' }}>
                <div
                    id='suggestion-text'
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 24,
                        color: 'var(--color-white-dimmed)',
                        fontFamily: 'var(--secondary-text)',
                    }}
                >
                    { suggestion && input.length >= 1 ? suggestion : null }
                </div>

                <span style={{ height: 24, width: 24, fontSize: 20, color: '#fff' }}>
                    &#10095;
                </span>

                <input
                    name='input'
                    value={input}
                    placeholder='Type message, or enter --help for more options'
                    style={{
                        width: '100%',
                        outline: 'none',
                        border: 'none',
                        padding: '8px 0',
                        backgroundColor: 'transparent',
                        color: 'var(--color-white)',
                        fontFamily: 'var(--secondary-text)',
                    }}
                    autoComplete='off'
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}