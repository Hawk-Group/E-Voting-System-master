// tailwind.config.js
module.exports = {
    content: ['./src//*.{js,jsx,ts,tsx}'],
    theme: {
      extend: {
        keyframes: {
          fall: {
            '0%': { transform: 'translateY(-20px) rotate(0deg)', opacity: '1' },
            '100%': { transform: 'translateY(100vh) rotate(360deg)', opacity: '0' },
          },
        },
        animation: {
          fall: 'fall 3s linear forwards',
        },
      },
    },
    plugins: [],
  }
  