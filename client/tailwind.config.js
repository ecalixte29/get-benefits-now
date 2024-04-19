/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        colors: {
            ...colors,
            ...{
                'primary': '#01aed1',
                'secondary': '#f04b4c',
                'light': '#d0d0d0',
                'dark': '#2c2c2c',
                'bronze': '#CD7F32',
                'gold': '#FFD700',
                'silver': '#C0C0C0',
                'error': 'rgb(255, 0, 0)',
                'red': '#EF233C'
            }
        },
        extend: {
            keyframes: {
                fadein: {
                    '0%': { top: '-1rem', opacity: 0 },
                    '100%': { top: '-0.5rem', opacity: 1},
                },
                fadeinLeft: {
                    '0%': { top: '-1rem', opacity: 0 },
                    '100%': { top: '-0.5rem', opacity: 1},
                }
            },
            animation: {
                fadein: 'fadein 300ms ease-in-out',
                fadeinLeft: 'fadeinLeft 300ms ease-in-out',
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
};
