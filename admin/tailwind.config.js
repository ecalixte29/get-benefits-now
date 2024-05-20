/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        colors: {
            ...colors,
            ...{
                primary: {
                    50: '#effafc',
                    100: '#d6f2f7',
                    200: '#b2e4ef',
                    300: '#7dd1e3',
                    400: '#32a8c4',
                    500: '#2698b4',
                    600: '#227a98',
                    700: '#22647c',
                    800: '#245266',
                    900: '#224657',
                    950: '#112d3b',
                    1000: "#0d1520",
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
