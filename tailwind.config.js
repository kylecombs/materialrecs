module.exports = {
  presets: [require('./node_modules/brutui/tailwind.config.js')],
  purge: {
    enabled: true,
    content: ['./src/**/*.{ts,tsx}', './node_modules/brutui/dist/*.{js,jsx}'],
  },
};
