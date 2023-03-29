/// <reference types="cypress" />
export declare function initPlugins(
  on: Cypress.PluginEvents,
  plugins: Array<(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => void>,
  config?: Cypress.ConfigOptions,
): void;
export {};
