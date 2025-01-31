module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Assurez-vous que les chemins correspondent à votre structure de projet
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light', 'dark'],
  },
};