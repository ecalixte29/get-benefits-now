/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        colors: {
            ...colors,
            ...{
                primary: {
                    '100': '#a2d5e1',
                    '200': '#7dc7d9',
                    '300': '#58bac2',
                    '400': '#43a3ae',
                    '500': '#32a8c4',
                    '600': '#2d95ad',
                    '700': '#267d91',
                    '800': '#1e6675',
                    '900': '#19545e',
                },
                secondary: '#3f4d68',
                error: '#FF0000',
            },
        },
        extend: {
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
