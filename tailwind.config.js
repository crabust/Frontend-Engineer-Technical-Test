/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                'basic-dark': '#202020',
                'basic-light': '#E9E9E9',
                'special-red': '#E60023',
            },
        },
    },
    plugins: [],
};
