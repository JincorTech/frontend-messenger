declare module 'shallowequal' {
  function shallowEqual(objA: any, objB: any, compare?: (objA: any, objB: any, indexOrKey?: number | string) => boolean, compareContext?: any): boolean;
  namespace shallowEqual{}
  export = shallowEqual;
}