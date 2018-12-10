// @flow
export default function isWidthDifferentFn(
  element: ?HTMLElement,
  width: number
) {
  return !!element && width !== element.clientWidth;
}
