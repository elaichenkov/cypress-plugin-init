type EventCallback = (...args: any[]) => void | Promise<void>;

type PluginFn = (
  callback: (eventName: string, callback: EventCallback) => void,
  config?: Cypress.ConfigOptions,
) => void;

export function initPlugins(on: Cypress.PluginEvents, plugins: PluginFn[], config?: Cypress.ConfigOptions) {
  const eventCallbacks: { [eventName: string]: { [pluginName: string]: EventCallback[] } } = {};

  plugins.forEach((plugin, index) => {
    const pluginName = `plugin-${index}`;

    plugin((eventName: string, callback: EventCallback) => {
      if (eventName === 'task') {
        // @ts-ignore
        return on('task', callback)
      };

      if (!eventCallbacks[eventName]) {
        eventCallbacks[eventName] = {};
      }
      if (!eventCallbacks[eventName]![pluginName]) {
        eventCallbacks[eventName]![pluginName] = [];
      }

      eventCallbacks[eventName]![pluginName]?.push(callback);

      // @ts-ignore
      on(eventName, async (...args) => {
        const pluginCallbacks = Object.values(eventCallbacks[eventName] || {}).flat();
        for (const pluginCallback of pluginCallbacks) {
          if (plugin.length > 1) {
            await pluginCallback(...args, config);
          } else {
            await pluginCallback(...args);
          }
        }
      });
    }, config);
  });
}
