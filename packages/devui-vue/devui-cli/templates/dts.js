exports.bundleGlobalDTSStart = () => {
  return `
export{}
declare module '@vue/runtime-core' {`;
};
exports.bundleComponentItem = (componentName, key='') => {
  return `D${componentName}: typeof import('./types/vue-devui')['${key || componentName}']`;
};
exports.bundleDirectiveItem = (directive, key='') => {
  return `v${directive}?: typeof import('./types/vue-devui')['${key || directive}']`;
};
exports.bundleServiceItem = (service,key='') => {
  return `$${service}?: typeof import('./types/vue-devui')['${key || service}']`;
};
exports.bundleGlobalDTSEnd = () => {
  return `
}`;
};
exports.bundleComponents = (componentString) => {
  return `
  export interface GlobalComponents{
    ${componentString}
  }
`;
};
exports.bundleDirective = (directiveString) => {
  return `
  export interface ComponentCustomProps {
    ${directiveString}
  }
`;
};
exports.bundleService = (serviceSting) => {
  return `
  export interface ComponentCustomProperties{
    ${serviceSting}
  }
`;
};
