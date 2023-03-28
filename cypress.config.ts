import { defineConfig } from 'cypress';
import { initPlugins } from './index';

const plugin1 = (on: Cypress.PluginEvents) => {
  on('before:run', (_) => console.log('[Plugin #1] Running before:run'));
  on('after:run', (_) => console.log('[Plugin #1] Running after:run'));
};

const plugin2 = (on: Cypress.PluginEvents) => {
  on('before:run', (_) => console.log('[Plugin #2] Running before:run'));
  on('after:run', (_) => console.log('[Plugin #2] Running after:run'));
};

export default defineConfig({
  e2e: {
    supportFile: false,
    video: false,
    setupNodeEvents(on, config) {
      // @ts-ignore
      initPlugins(on, [plugin1, plugin2]);
    },
  },
});
