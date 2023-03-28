type EventName =
  | 'after:run'
  | 'after:screenshot'
  | 'after:spec'
  | 'before:spec'
  | 'before:run'
  | 'before:browser:launch'
  | 'file:preprocessor'
  | 'dev-server:start'
  | 'task';

type CallbackFn = (
  results: CypressCommandLine.CypressRunResult | CypressCommandLine.CypressFailedRunResult | Cypress.BeforeRunDetails,
) => void | Promise<void>;

type PluginFunction = (registerCallback: (eventName: EventName, callback: CallbackFn) => void) => void;

type EventCallbacks = {
  [K in EventName]?: CallbackFn[];
};

export function initPlugins(on: Cypress.PluginEvents, plugins: PluginFunction[]) {
  const eventCallbacks: EventCallbacks = {};

  plugins.forEach((plugin) => {
    plugin((eventName, callback) => {
      if (!eventCallbacks[eventName]) {
        eventCallbacks[eventName] = [];
        // @ts-ignore https://github.com/cypress-io/cypress/issues/9571
        on(eventName, async (results) => {
          for (const callbackFn of eventCallbacks[eventName]!) {
            await callbackFn(results);
          }
        });
      }
      eventCallbacks[eventName]?.push(async (results) => {
        await callback(results);
      });
    });
  });
}
