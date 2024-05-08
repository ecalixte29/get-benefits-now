/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        colors: {
            ...colors,
            ...{
                primary: '#F5C396',
                secondary: '#813405',
                light: '#d0d0d0',
                dark: '#141414',
                bronze: '#CD7F32',
                gold: '#FFD700',
                silver: '#C0C0C0',
                error: '#FF0000',
            },
        },
        extend: {
            keyframes: {
                fadein: {
                    '0%': { top: '-1rem', opacity: 0 },
                    '100%': { top: '-0.5rem', opacity: 1 },
                },
                fadeinLeft: {
                    '0%': { top: '-1rem', opacity: 0 },
                    '100%': { top: '-0.5rem', opacity: 1 },
                },
            },
            animation: {
                fadein: 'fadein 300ms ease-in-out',
                fadeinLeft: 'fadeinLeft 300ms ease-in-out',
            },
            boxShadow: {
                global: '0 1px 2px rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15)',
            },
        },
        fontFamily: {
            poppins: ['Poppins', 'sans-serif'],
        },
    },
    plugins: [require('@tailwindcss/forms')],
}
