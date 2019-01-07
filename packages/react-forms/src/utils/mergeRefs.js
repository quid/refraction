// @flow
export default (...refs: Array<any>) => (ref: any) => {
  refs.forEach(resolvableRef => {
    if (typeof resolvableRef === 'function') {
      resolvableRef(ref);
    } else if (resolvableRef != null) {
      (resolvableRef: any).current = ref;
    }
  });
};
