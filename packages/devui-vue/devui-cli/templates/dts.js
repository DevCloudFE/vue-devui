exports.buildGlobalDTSStart = () => {
  return `
export{}
declare module '@vue/runtime-core' {`;
};
exports.buildComponentItem = (componentName, key='') => {
  return `D${componentName}: typeof import('./types/vue-devui')['${key || componentName}']`;
};
exports.buildDirectiveItem = (directive, key='') => {
  return `v${directive}?: typeof import('./types/vue-devui')['${key || directive}']`;
};
exports.buildServiceItem = (service,key='') => {
  return `$${service}?: typeof import('./types/vue-devui')['${key || service}']`;
};
exports.buildGlobalDTSEnd = () => {
  return `
}`;
};
exports.buildComponents = (componentString) => {
  return `
  export interface GlobalComponents{
    ${componentString}
  }
`;
};
exports.buildDirective = (directiveString) => {
  return `
  export interface ComponentCustomProps {
    ${directiveString}
  }
`;
};
exports.buildService = (serviceSting) => {
  return `
  export interface ComponentCustomProperties{
    ${serviceSting}
  }
`;
};
