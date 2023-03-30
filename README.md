# cypress-plugin-init

This library was designed to overcome the limitations of the Cypress plugin system to have multiple listeners. So, it allows you to initialize all needed plugins in one place. Futhermore, this allows you to use the Cypress plugin system to its full potential.

## Motivation

The Cypress plugin system is a great way to extend the Cypress functionality. However, it has some limitations. One of them is that you can only have one listener for a specific event. This means that if you want to use multiple plugins that listen to the same event, you can't do it. This library was designed to overcome this limitation. 

For instance, if you have two plugins that are listening to the `before:run` event, you can initialize both of them with this library.

```ts
import { defineConfig } from 'cypress';
import { initPlugins } from 'cypress-plugin-init';

const plugin1 = (on: Cypress.PluginEvents) => {
  on('before:run', (_) => console.log('[Plugin #1] Running before:run'));
};

const plugin2 = (on: Cypress.PluginEvents) => {
  on('before:run', (_) => console.log('[Plugin #2] Running before:run'));
};

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      initPlugins(on, [plugin1, plugin2]);
    },
  },
});
```

The output of the code above will be:

```bash
(Run Starting)
...
[Plugin #1] Running before:run
[Plugin #2] Running before:run
...
(Run Finished)
```

If you run the same code without this library, the output will be:

```bash
(Run Starting)
...
[Plugin #2] Running before:run
...
(Run Finished)
```

Hence, you can see that the only the last one will be executed.

## Installation

```bash
npm install cypress-plugin-init
```

## Usage

It's pretty simple to use. Just import the `initPlugins` function and call the `initPlugins` function with the plugins you want to initialize in your `cypress.config.ts` file.

```ts
import { initPlugins } from 'cypress-plugin-init';

export default defineConfig({
  e2e: {
    // ...

    setupNodeEvents(on, config) {
      // Initialize all plugins you want to use in your project
      initPlugins(on, [plugin1, plugin2]);
    },

    // ...
  },
});

```

If any of the plugins you want to initialize is expecting `config` as a parameter, you can pass it as a third parameter to the `initPlugins` function.

```ts
import { initPlugins } from 'cypress-plugin-init';

export default defineConfig({
  e2e: {
    // ...

    setupNodeEvents(on, config) {
      // Initialize all plugins you want to use in your project
      initPlugins(on, [plugin1, plugin2], config);
    },

    // ...
  },
});
```

## License

[MIT](LICENSE)

## Author

Yevhen Laichenkov <elaichenkov@gmail.com>
