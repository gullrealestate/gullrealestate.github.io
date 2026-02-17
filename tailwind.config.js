/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                gruvbox: {
                    bg0: '#282828',
                    bg1: '#3c3836',
                    bg2: '#504945',
                    fg: '#ebdbb2',
                    gray: '#928374',
                    red: '#cc241d',
                    green: '#98971a',
                    yellow: '#d79921',
                    blue: '#458588',
                    purple: '#b16286',
                    aqua: '#689d6a',
                    orange: '#d65d0e'
                }
            }
        },
    },
    plugins: [],
}
