/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
    ],
    theme: {
        extend: {
            colors: {
                green: {
                    50: "#effaeb",
                    100: "#daf4d3",
                    200: "#baeaac",
                    300: "#8edb7b",
                    400: "#67ca51",
                    500: "#47ae33",
                    600: "#348b25",
                    700: "#2b6a21",
                    800: "#25551f",
                    900: "#22491e",
                    950: "#0e270c",
                },
                blue: {
                    50: "#f1f8fe",
                    100: "#e3eefb",
                    200: "#c0def7",
                    300: "#88c4f1",
                    400: "#48a6e8",
                    500: "#208ad7",
                    600: "#1476c6",
                    700: "#105794",
                    800: "#124b7a",
                    900: "#143f66",
                    950: "#0d2844",
                },
                red: {
                    50: "#fff0f2",
                    100: "#ffe2e6",
                    200: "#ffcad4",
                    300: "#ff9fb0",
                    400: "#ff6986",
                    500: "#ff3461",
                    600: "#ed114c",
                    700: "#c90740",
                    800: "#a8093d",
                    900: "#8f0c3a",
                    950: "#50011b",
                },
                yellow: {
                    50: "#fffbeb",
                    100: "#fef4c7",
                    200: "#fde88a",
                    300: "#fcd64d",
                    400: "#fbbf16",
                    500: "#f5a20b",
                    600: "#d97b06",
                    700: "#b45609",
                    800: "#92420e",
                    900: "#78370f",
                    950: "#451b03",
                },
            },
            keyframes: {
              overlayShow: {
                from: { opacity: 0 },
                to: { opacity: 1 },
              },
              contentShow: {
                from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
                to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
              },
            },
            animation: {
              overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
              contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
            },
        },
    },
    plugins: [],
};

