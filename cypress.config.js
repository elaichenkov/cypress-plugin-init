const { defineConfig } = require('cypress');
const { initPlugins } = require('./index');

const plugin1 = (on) => {
  on('before:run', (_) => console.log('[Plugin #1] Running before:run'));
  on('after:run', (_) => console.log('[Plugin #1] Running after:run'));
};

const plugin2 = (on) => {
  on('before:run', (_) => console.log('[Plugin #2] Running before:run'));
  on('after:run', (_) => console.log('[Plugin #2] Running after:run'));
};

module.exports = defineConfig({
  e2e: {
    supportFile: false,
    video: false,
    setupNodeEvents(on, _config) {
      initPlugins(on, [plugin1, plugin2]);
    },
  },
});
